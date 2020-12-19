import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes/routes.js";

import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React a api
 */
app.use(express.static(path.join("client/build")));

/**
 * Rota raiz
 */
app.get("/api/", (_, res) => {
  res.send({
    message:
      "Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações",
  });
});

/**
 * Rotas principais do app
 */
app.use("/api/transaction", router);

/**
 * Conexão ao Banco de Dados
 */
(async () => {
  console.log("iniciando conexão ao banco de dados...");
  const { DB_CONNECTION } = process.env;
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDb Atlas");
  } catch (err) {
    console.log("Erro ao conectar no MongoDB");
  }
})();

/**
 * Definição de porta e
 * inicialização do app
 */
const APP_PORT = process.env.PORT || 8080;
app.listen(APP_PORT, () => {
  console.log(`Servidor iniciado em http://localhost:3002`);
});
