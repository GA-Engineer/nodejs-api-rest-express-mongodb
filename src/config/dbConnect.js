import mongoose from "mongoose";

mongoose.connect("mongodb+srv://gabiandraded:senha@cluster0.vnfloez.mongodb.net/alura-node");

const db = mongoose.connection;

export default db;