import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';
dotenv.config();

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());



const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;
try {
    await mongoClient.connect()
    db = mongoClient.db()
    console.log('Deu certo')
} catch (err) {
    console.log(err)
    console.log('Deu errado')
}

app.post("/sing-up", async (req, res) => {
    const user = req.body; //nome, email, senha, confirmeSenha
    const passwordHash = bcrypt.hashSync(user.senha, 10);
    const userSchema = joi.object({
        nome: joi.string().required(),
        email: joi.string().email().required(),
        senha: joi.string().required(),
        confirmeSenha: joi.ref(senha)
    })
    const validation = userSchema.validate(messages, { abortEarly: true });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }
    try {
        const userExists = await db.colection('users').findOne({ email: user.email })
        if (userExists) return res.status(400).send("Email já cadastrado")

        await db.colection('users').insertOne({ ...user, senha: passwordHash })
    } catch(err) {
        res.status(500).send(err.message)
    }
})

{/*app.post("/sign-in", async (req, res) => {
    const user = res.body; // email, senha
    await db.colection('users').insertOne(user)
    const emailExist = await db.colection('users').findOne({ email: user.email })
    if (emailExist && bcrypt.compareSync()) {

    } else {

    }
})*/}

app.listen(PORT, () => console.log('tudo certo, nada errado'));
