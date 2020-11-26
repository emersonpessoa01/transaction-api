import mongoose from 'mongoose';
import pokemonModel from "../models/pokemonModel.js"

const db = {};
// db.url = process.env.MONGODB;
db.mongoose = mongoose;
db.pokemon = pokemonModel(mongoose) 

export { db };
