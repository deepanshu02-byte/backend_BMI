import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import helmet from "helmet";
import { limiterConfig } from "./config/rateLimitConfig";
import { env } from "./config/envConfig";
import connectDB from "./config/dbConfig";
// import { throttleConfig } from "./config/throttleConfig.cjs";

const app: Application = express();

// ===== Middleware =====

//rate-limit
app.use(limiterConfig);

//api thorttle
// app.use(throttleConfig);

// Security middleware to set various HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
//Development
// app.use(cors()); // for development we can use

//Production

app.use(cors({
   origin: 'http://localhost:5173',
   methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
   credentials: true
}));

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data with extended option
app.use(express.urlencoded({ extended: true }));

// Log HTTP requests in development mode
app.use(morgan("dev"));

// ===== API Routes =====
app.use(env.BASIC_API_URL, routes);

//connect db
connectDB();

// ===== Health Check =====
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
