import express from "express";
import cors from "cors";
import { MongoClient} from "mongodb";
import dotenv from "dotenv";
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

app.listen(PORT);