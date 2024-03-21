import livros from "../models/Livro.js";

export default class LivroController {

    static listarLivros = async (req, res) => {
        try {
            const livrosResultado = await livros.find().populate("autor", "nome").exec();
            res.status(200).json(livrosResultado)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static listarLivroPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const livrosResultado = await livros.findById(id).populate("autor", "nome").exec();
            res.status(200).json(livrosResultado)
        } catch (err) {
            res.status(400).json(err);
        }
    }

    static listarLivrosPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora;
            const livrosResultado = await livros.find({'editora': editora}).populate("autor", "nome").exec();
            res.status(200).json(livrosResultado)
        } catch (err) {
            res.status(400).json(err);
        }
    }

    static cadastrarLivro = async (req, res) => {
        try {
            let livro = new livros(req.body);
            const response = await livro.save();
            res.status(201).json(response.toJSON())
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.`})
        }
    }

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id
            await livros.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso!"});
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static excluirLivro = async (req, res) => {
        try {
            const id = req.params.id
            await livros.findByIdAndDelete(id, {$set: req.body});
            res.status(200).send({message: "Livro excluído com sucesso!"});
        } catch (err) {
            res.status(500).send(err);
        }
    }
}