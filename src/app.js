import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js"
import registersRouter from  "./routes/registersRoutes.js"

const PORT = 5034;
const app = express();
app.use(cors());
app.use(express.json());

app.use([authRouter, registersRouter]);

app.listen(PORT, () => console.log('Tudo certo'));
