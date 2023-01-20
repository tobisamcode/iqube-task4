import {
    createReview,
    markAsHelpful,
    getReviews,
} from "../controllers/reviews";
import { upload, uploads } from "../utils/upload";
import { requireSignIn } from "../../server-build/controllers/auth";
import { runValidation } from "../validators";
import { postReviewValidator } from "../validators/reviews";

const reviewsRouter = (router) => {
    //authenticated users endpoint
    router.post(
        "/:apartmentId",
        requireSignIn,
        // uploads,
        postReviewValidator,
        runValidation,
        createReview
    );

    //random users endpoints
    router.put("/mark/:reviewId", markAsHelpful);
    router.get("/:apartmentId/recent", getReviews("recent"));
    router.get("/:apartmentId/mosthelpful", getReviews("helpful"));

    return router;
};

export default reviewsRouter;