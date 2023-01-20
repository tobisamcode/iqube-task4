import fs from "fs";
import Review from "../models/Review";
import Apartment from "../models/Apartment";
import validateId from "../utils/validateId";
import { uploads } from "../utils/upload";

export const createReview = async(req, res) => {
    if (req.body.ratingPercent > 100 || req.body.ratingPercent < 0) {
        return res
            .status(422)
            .json({ error: "Invalid rating percentage (0 - 100)" });
    }

    const { apartmentId } = req.params;
    let imageLinks = [];

    //Validate mongodb id.
    const idDoesNotExist = await validateId(Apartment, res, apartmentId);
    if (idDoesNotExist) return;

    //Images upload for reviews
    if (req.files && req.files.length) {
        try {
            for (const file of req.files) {
                const filePath = file.path;
                console.log(filePath);
                const resp = await uploads(filePath);
                imageLinks.push(resp.url);
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error while uploading images!" });
        }
    }

    const sessionUser = req.user;
    const reviewData = {
        reviewCreator: sessionUser._id,
    };

    reviewData.landlordComment = req.body.lanndlordComment || "";
    reviewData.environmentComment = req.body.environmentComment || "";
    reviewData.amenitiesComment = req.body.amenitiesComment || "";
    reviewData.ratingPercent = req.body.ratingPercent;
    reviewData.apartment = apartmentId;

    try {
        await Review.create({...reviewData, imageLinks });
        return res.status(201).json({ message: "Review posted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error while posting review" });
    }
};

export const markAsHelpful = async(req, res) => {
    const { reviewId } = req.params;

    //Validate mongodb id.
    const idDoesNotExist = await validateId(Review, res, reviewId);
    if (idDoesNotExist) return;

    try {
        const response = await Review.findByIdAndUpdate(reviewId, {
            $inc: { helpfulCount: 1 },
        });
        return res
            .status(200)
            .json({ message: "Helpful count updated Successfully" });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Server Error while updtaing review" });
    }
};

export const getReviews = (sortBy) => async(req, res) => {
    const { apartmentId } = req.params;

    //Validate mongodb id.
    const idDoesNotExist = await validateId(Apartment, res, apartmentId);
    if (idDoesNotExist) return;

    //invalid sort parameter
    if (!["recent", "helpful"].includes(sortBy)) {
        return res.status(500).json({ error: "Internal server error!" });
    }

    const data =
        sortBy === "recent" ?
        await Review.find({ apartment: apartmentId })
        .sort({ datePosted: -1 })
        .exec() :
        await Review.find({ apartment: apartmentId })
        .sort({ helpfulCount: -1 })
        .exec();

    return res.status(200).json({ sortedBy: sortBy, data });
};