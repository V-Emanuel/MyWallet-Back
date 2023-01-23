import { registerSchema } from "../schema/RegistersSchema.js";
import db from '../config/database.js';

export async function postRegisters(req, res) {
    const register = req.body;
    const validation = registerSchema.validate(register, { abortEarly: true });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }
    try {

        await db.collection("messages").insertOne(register)
        return res.sendStatus(201)

    } catch (err) {
        return res.sendStatus(500).send(err.message)
    }
}
export async function getRegisters(req, res){
    const registers = await db.collection('registers').find().toArray()
    try {
        if (user) {
            res.send(registers)
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}
