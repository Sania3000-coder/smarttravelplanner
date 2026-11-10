
import express from "express";
import jwt from "jsonwebtoken";
import Trip from "../models/Trip.js";

const router = express.Router();

// Verify login token
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

// Save Trip API
router.post("/save", verifyToken, async (req, res) => {
    try {
        const { destination, days, travelers, budget } = req.body;

        if (!destination || !days || !travelers || !budget ||
            Number(days) <= 0 || Number(travelers) <= 0 || Number(budget) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please enter valid trip details"
            });
        }

        const trip = await Trip.create({
            userId: req.userId,
            destination,
            days: Number(days),
            travelers: Number(travelers),
            budget: Number(budget)
        });

        res.status(201).json({
            success: true,
            message: "Trip saved successfully!",
            trip
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get My Trips API
router.get("/my-trips", verifyToken, async (req, res) => {
    try {
        const trips = await Trip.find({
            userId: req.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            trips
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// Delete Trip API
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        res.json({
            success: true,
            message: "Trip deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
