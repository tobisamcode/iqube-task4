import { signUp, signIn } from "../controllers/auth";
import { runValidation } from "../validators";
import { userSignupValidator, userSigninValidator } from "../validators/auth";

const authRouter = (router) => {

  router.post("/signup", userSignupValidator, runValidation, signUp);
  router.post("/signin", userSigninValidator, runValidation, signIn);

  return router;
}


export default authRouter;