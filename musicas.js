const express = require ('express');

const router = express.Router();

let listaMusicas = [{
    "nome":"Capitães de areia",
    "genero":"Rap",
    "autor": "2017",
    "duracao":"3:10 min"
}];

router.get("/", (req, res) => {
    res.status(200).json({message: 'musicas OK'});
});

router.get("/musicas", (req, res) => {
    res.status(200).json({listaMusicas});
});

router.get("/musicasIndex/:id", (req, res) => {
    const id = req.params.id;
    const index = listaMusicas[id]
    if (index == -1){
        res.status(204).json({message: "Musica não encontrada."});
        return;
    }
    res.status(200).json({index: index});   
});

router.post("/musicas", (req, res) =>     {
    const musica = req.body;

    if(!musica.nome){
        res.status(404).json({message:"Nome da requisição musica está vazio."});
        return;
    }
    if(!musica.genero){
        res.status(404).json({message: "Genero da requisição musica está vazio."});
        return;
    }
    if(!musica.autor){
        res.status(404).json({message: "Autor da requisição musica está vazio."});
        return;
    }
    if(!musica.duracao){
        res.status(404).json({message: "Duração da requisição musica está vazia."});
        return;
    }

    listaMusicas.push(musica);
    res.status(201).json({message: "Musica cadastrada com sucesso!"});
});

router.put("/musicas/:id", (req, res) => {
    const id = req.params.id;
    const musica = listaMusicas[id];

    console.log(musica);

    listaMusicas[id] = req.body;

    res.status(200).json(listaMusicas[id]);
});

router.delete("/deletar/musicas/:id", (req, res) => {
    const id = req.params.id;
    listaMusicas.splice(id, 1);
    res.json(listaMusicas);
});

module.exports = router;            