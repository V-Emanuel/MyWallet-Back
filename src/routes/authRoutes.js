import { signIn, signUp} from "../controller/Auth"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema"
import { userSchema } from "../schema/AuthSchema"

const authRouter = Router()

authRouter.post("/sign-up", validateSchema(userSchema), signUp);
authRouter.post("/sign-in", validateSchema(loginSchema), signIn);

export default authRouter
