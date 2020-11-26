import { db } from "../models/index.js";

const pokemonDB = db.pokemon;
const create = async (req, res) => {
  const pokemon = new pokemonDB({
    name: req.body.name,
    img: req.body.img,
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    speed: req.body.speed,
    active: req.body.active,
  });

  try {
    await pokemon.save();
    res.send({
      message: "Pokemon inserido com sucesso",
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const data = await pokemonDB.find(condition);
    if (data.length < 1) {
      res.status(404).send({
        message: "Pokemon nao encontrado",
      });
    } else {
      res.send(data);
      logger.info("findAll /pokemon");
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.info(`findAll /pokemon - ${err.message}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await pokemonDB.findById({ _id: id });
    if (data.length < 1) {
      res.status(404).send({
        message: `Pokemon id:${id} nao encontrado`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Erro ao buscar o Documento id: ${id}`,
    });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const data = await pokemonDB.findByIdUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (data.length < 1) {
      res.status(404).send({
        message: `Pokemon id : ${id} nao encontrado para atualizacao`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar o Pokemon id: " + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await pokemonDB.findByIdRemove({ _id: id });
    if (data.length < 1) {
      res.send({
        message: "Pokemon excluido com sucesso",
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Pokemon id: " + id });
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await pokemonDB.deleteMany();
    if (data.length < 1) {
      res.status(404).send({
        message: "Nenhum Pokemon encontrado para exclusao",
      });
    } else {
      res.send({
        message: "Pokemons excluidos com sucesso",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos os Pokemons" });
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
