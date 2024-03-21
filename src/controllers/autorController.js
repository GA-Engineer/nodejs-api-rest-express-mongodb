import autores from "../models/Autor.js";

export default class AutorController {

    static listarAutores = async (req, res) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static listarAutorPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const autoresResultado = await autores.findById(id);
            res.status(200).json(autoresResultado)
        } catch (err) {
            res.status(400).json(err);
        }
    }

    static cadastrarAutor = async (req, res) => {
        try {
            let autor = new autores(req.body);
            const response = await autor.save();
            res.status(201).json(response.toJSON())
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar autor.`})
        }
    }

    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id
            await autores.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Autor atualizado com sucesso!"});
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static excluirAutor = async (req, res) => {
        try {
            const id = req.params.id
            await autores.findByIdAndDelete(id, {$set: req.body});
            res.status(200).send({message: "Autor excluído com sucesso!"});
        } catch (err) {
            res.status(500).send(err);
        }
    }
}