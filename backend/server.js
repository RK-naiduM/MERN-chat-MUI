require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

// Dashboard Routes
const dashboards = ["platinum", "gold", "silver"];
dashboards.forEach((tier) => {
    app.get(`/dashboard/${tier}`, verifyToken, (req, res) => {
        if (req.user.tier.toLowerCase() !== tier) {
            return res.status(403).json({ msg: "Access denied" });
        }
        res.json({ msg: `Welcome to ${tier.charAt(0).toUpperCase() + tier.slice(1)} Dashboard`, tier: req.user.tier });
    });
});

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI Query Processing Route
app.post("/chat", async (req, res) => {
    const { userQuery } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userQuery }],
        });

        const botResponse = response.choices[0].message.content;
        res.json({ reply: botResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI response failed" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
