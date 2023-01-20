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
    const user = req.body;
    const passwordHash = bcrypt.hashSync(user.senha, 10);
    const userSchema = joi.object({
        nome: joi.string().required(),
        email: joi.string().email().required(),
        senha: joi.string().min(8).required(),
        confirmeSenha: joi.ref(senha)
    })
    const validation = userSchema.validate(messages, { abortEarly: true });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }
    try {
        const userExists = await db.collection('users').findOne({ email: user.email })
        if (!userExists) return res.status(400).send("Email já cadastrado")

        await db.collection('users').insertOne({ ...user, senha: passwordHash })
    } catch (err) {
        return res.sendStatus(500).send(err.message)
    }
})

app.post("/sign-in", async (req, res) => {
    const { email, senha } = res.body; // email, senha
    await db.collection('users').insertOne(user)
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(400).send("Usuário ou senha inválidos")
    try {
        if (user && bcrypt.compareSync(senha, user.senha)) {
            return res.sendStatus(201);
        } else {
            return res.status(400).send("Usuário ou senha inválidos")
        }
    } catch (err) {
        return res.sendStatus(500).send(err.message)
    }

})

app.post("/registers", async (req, res) => {
    const register = req.body;
    const registerSchema = joi.object({
        value: joi.number().required(),
        description: joi.string.required(),
        type: joi.string.valid("input", "output").required()
    });
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
})

app.get("/registers", async (req, res) => {
    const registers = await db.collection('registers').find().toArray()
    try {
        res.send(registers)
    } catch (err) {
        res.status(500).send(err.message)
    }
})


app.listen(PORT, () => console.log('tudo certo, nada errado'));
