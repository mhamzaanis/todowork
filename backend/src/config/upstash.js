import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis"
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

//create a ratelimiter that allows 10 requests per 10 seconds
const ratelimiter = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "15 s")
})
export default ratelimiter; 