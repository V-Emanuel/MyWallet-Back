import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes"
import registersRouter from  "./routes/registersRoutes"

const PORT = 5034;
const app = express();
app.use(cors());
app.use(express.json());

app.use([authRouter, registersRouter]);

app.listen(PORT, () => console.log('tudo certo, nada errado'));
