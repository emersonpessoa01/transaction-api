import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
// import { logger } from "./config/logger.js";

import { pokemonRouter } from "./routes/pokemonRouter.js";

// import { db } from "./models/index.js";

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@cluster0.cginj.mongodb.net/projetos?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado no banco com sucesso");
  } catch (error) {
    console.log("Erro ao conectar ao banco");
    process.exit();
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
// app.use(f
//   cors({
//     origin: "https://pokemon-whrath.herokuapp.com/",
//   })
// );

app.use(pokemonRouter);

app.get("/", (req, res) => {
  res.send("API em execucao");
});

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Servidor em execucao na porta ${PORT} http://localhost:8082/`);
});
