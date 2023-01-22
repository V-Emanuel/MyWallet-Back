import {getRegisters, postRegisters} from "../controller/Registers"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema"
import { registerSchema } from "../schema/RegistersSchema"

const registersRouter = Router();

registersRouter.post("/registers", validateSchema(registerSchema), postRegisters);
registersRouter.get("/registers", getRegisters);

export default registersRouter
