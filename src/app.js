import express from "express";
import db from "./config/dbConnect.js"
import livros from "./models/Livro.js"

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => console.log("Conectado ao banco"));

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
});

app.get('/livros', async (req, res) => {
    try {
        const livrosResultado = await livros.find();
        res.status(200).json(livrosResultado)
    } catch (err) {
        res.status(500).json(err);
    }
})

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso');
});

app.put('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.json(livros);
});

app.get('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    res.json(livros[index]);
});

app.delete('/livros/:id', (req, res) => {
    const {id} = req.params;
    const index = buscaLivro(id);
    livros.splice(index, 1);
    res.send(`Livro ${id} removido com sucesso!`);
});


function buscaLivro(id){
    return livros.findIndex(livro => id == livro.id);
}

export default app;