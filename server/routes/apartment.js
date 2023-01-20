import { getApartments } from "../controllers/apartment";

const apartmentRouter = (router) => {
  router.get("/", getApartments)

  return router;
}

export default apartmentRouter;