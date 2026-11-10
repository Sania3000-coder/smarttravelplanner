
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        destination: {
            type: String,
            required: true,
            trim: true
        },
        days: {
            type: Number,
            required: true
        },
        travelers: {
            type: Number,
            required: true
        },
        budget: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
