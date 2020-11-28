import express from 'express'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { transactionRouter } from "./routes/transactionRouter.js";
import dotenv from 'dotenv';
dotenv.config();

//criando variaveis de ambiente
// process.env.USER_DB = "emersonpessoa"

//Conexao com o MongoDB
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@cluster0.cginj.mongodb.net/finalChancellerResolution?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao MongoDb Atlas");
  } catch (err) {
    console.log("Erro ao conectar no MongoDB");
  }
})();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Acessou o Middleware!");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});
app.use("/transaction", transactionRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("Fala Dev -- API STARTED http://localhost:3002");
});
