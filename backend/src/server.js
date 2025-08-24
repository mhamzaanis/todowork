import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();
// console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (!process.env.NODE_ENV !== "production"){
  app.use(cors(
    {origin:"http://localhost:5173"}
  ));
}
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter);

// this demonstrates a simple middleware function
app.use((req, res, next)=> {
  console.log("Req method:", req.method,"Req URL:", req.url);
  next();
})

//this lines means that any request to /api/notes will be handled by notesRoutes
app.use("/api/notes", notesRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  });
}


//once db is connected successfully only then hear on the port
connectDB().then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}).catch((error) => {
  console.error("Error:", error);
});




