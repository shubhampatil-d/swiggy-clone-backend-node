const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const addressRoutes = require("./routes/addressRoutes")
const restaurantRoutes= require('./routes/restaurantRoutes')

dotenv.config();
// ✅ Connect to MongoDB (Only Once)
connectDB();
const app = express();



// ✅ Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/restaurants',restaurantRoutes)

app.get("/", (req, res) => res.send("App is running"))

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "server error" });
});


// ✅ Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});



