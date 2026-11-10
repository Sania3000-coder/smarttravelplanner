
import express from "express";
import Trip from "../models/Trip.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin permission check
const adminOnly = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access only"
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL TRIPS
router.get("/trips", authMiddleware, adminOnly, async (req, res) => {
    try {
        const trips = await Trip.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.json({ success: true, trips });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ADD NEW TRIP
router.post("/trips", authMiddleware, adminOnly, async (req, res) => {
    try {
        const { destination, days, travelers, budget } = req.body;

        if (!destination || !days || !travelers || !budget ||
            Number(days) <= 0 ||
            Number(travelers) <= 0 ||
            Number(budget) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Enter valid trip details"
            });
        }

        const trip = await Trip.create({
            userId: req.user.id,
            destination,
            days: Number(days),
            travelers: Number(travelers),
            budget: Number(budget)
        });

        res.status(201).json({
            success: true,
            message: "Trip added successfully",
            trip
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// UPDATE TRIP
router.put("/trips/:id", authMiddleware, adminOnly, async (req, res) => {
    try {
        const { destination, days, travelers, budget } = req.body;

        if (!destination || !days || !travelers || !budget ||
            Number(days) <= 0 ||
            Number(travelers) <= 0 ||
            Number(budget) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Enter valid trip details"
            });
        }

        const trip = await Trip.findByIdAndUpdate(
            req.params.id,
            {
                destination,
                days: Number(days),
                travelers: Number(travelers),
                budget: Number(budget)
            },
            { new: true, runValidators: true }
        );

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        res.json({
            success: true,
            message: "Trip updated successfully",
            trip
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// DELETE TRIP
router.delete("/trips/:id", authMiddleware, adminOnly, async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        res.json({
            success: true,
            message: "Trip deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
