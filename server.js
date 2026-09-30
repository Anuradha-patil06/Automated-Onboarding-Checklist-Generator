const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const checklistRoutes = require("./routes/checklistRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/checklist", checklistRoutes);

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("Automated Onboarding Checklist Generator API is running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
