import express from "express";
import {getAllNotes,getNoteById, createNote, updateNote, deleteNote} from "../controllers/notesControllers.js";
const router = express.Router();

//req means request and res means response

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;