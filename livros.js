const express = require ('express');

const router = express.Router();

let listaLivros = [{
    "nome":"A Tormenta de Espadas",
    "genero":"Fantasia",
    "autor": " George R. R. Martin",
    "paginas":"1716"
}];

router.get("/", (req, res) => {
    res.status(200).json({message: 'Livros OK'});
});

router.get("/livros", (req, res) => {
    res.status(200).json({listaLivros});
});

router.get("/livrosIndex/:id", (req, res) => {
    const id = req.params.id;
    const index = listaLivros[id]
    if (index == -1){
        res.status(204).json({message: "Livro não encontrado."});
        return;
    }
    res.status(200).json({index: index});   
});

router.post("/livros", (req, res) =>     {
    const livro = req.body;

    if(!livro.nome){
        res.status(404).json({message:"Nome da requisição livro está vazio."});
        return;
    }
    if(!livro.genero){
        res.status(404).json({message: "Genero da requisição livro está vazio."});
        return;
    }
    if(!livro.autor){
        res.status(404).json({message: "Autor da requisição livro está vazio."});
        return;
    }
    if(!livro.paginas){
        res.status(404).json({message: "Paginas da requisição livro está vazia."});
        return;
    }

    listaLivros.push(livro);
    res.status(201).json({message: "Livro foi cadastrado com sucesso!"});
});

router.put("/livros/:id", (req, res) => {
    const id = req.params.id;
    const livro = listaLivros[id];

    console.log(livro);

    listaLivros[id] = req.body;

    res.status(200).json(listaLivros[id]);
});

router.delete("/deletar/livros/:id", (req, res) => {
    const id = req.params.id;
    listaLivros.splice(id, 1);
    res.json(listaLivros);
});

module.exports = router;            