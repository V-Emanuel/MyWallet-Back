import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import db from '../config/database.js'
import { userSchema } from '../schema/AuthSchema.js';

export async function signUp(req, res) {
    const user = req.body;
    const passwordHash = bcrypt.hashSync(user.senha, 10);
    const validation = userSchema.validate(user, { abortEarly: true });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }
    const userExists = await db.collection('users').findOne({ email: user.email })
    if (!userExists) return res.status(400).send("Email já cadastrado")
    try {
        await db.collection('users').insertOne({
            nome: user.nome,
            email: user.email,
            senha: passwordHash
        })
        return res.sendStatus(201)
    } catch (err) {
        return res.sendStatus(500).send(err.message)
    }

}
export async function signIn(res, res) {
    const { email, senha } = res.body;
    const userExist = await db.collection('users').findOne({ email });
    if (!userExist) return res.status(400).send("Usuário ou senha inválidos")
    try {
        if (userExist && bcrypt.compareSync(senha, user.senha)) {
            const token = uuidV4();
            await db.collection('sessions').insertOne({
                userId: user._id,
                token
            })
            delete user.senha
            return res.sendStatus(201).send(user);
        } else {
            return res.status(400).send("Usuário ou senha inválidos")
        }
    } catch (err) {
        return res.sendStatus(500).send(err.message)
    }
}