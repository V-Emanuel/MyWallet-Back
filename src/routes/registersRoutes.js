import {getRegisters, postRegisters} from "../controller/Registers.js"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"
import { registerSchema } from "../schema/RegistersSchema.js"
import { authValidation } from "../middleware/AuthMiddleware.js"

const registersRouter = Router();

registersRouter.use(authValidation)
registersRouter.post("/registers", validateSchema(registerSchema), postRegisters);
registersRouter.get("/registers", getRegisters);

export default registersRouter
