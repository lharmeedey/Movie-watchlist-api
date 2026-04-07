const express = require('express');
const dotenv = require('dotenv');
const { connectDB, disconnectDB } = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');




// Import Routes

const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');

dotenv.config();
connectDB();

const app = express();



// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// API Routes
// app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes)

// error checker Middleware
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
    console.log(`Server is runing on PORT ${PORT}`);
});



// Handle unhandled promise rejections (e.g database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Token generator
// console.log(require('crypto').randomBytes(32).toString('base64'));