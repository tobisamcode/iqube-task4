import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment",
    },

    reviewCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    landlordComment: {
        type: String,
        default: "",
    },

    environmentComment: {
        type: String,
        default: "",
    },

    amenitiesComment: {
        type: String,
        default: "",
    },

    ratingPercent: {
        type: Number,
        required: true,
    },

    helpfulCount: {
        type: Number,
        default: 0,
    },

    imageLinks: [{
        type: String,
    }, ],

    datePosted: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Review", reviewSchema);