
import db from "../config/database.js"

export async function authValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);

    try{
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.sendStatus(401)
        res.locals.sessions = session;
    }catch(err){
        res.status(500).send(err)
    }

        
}
