const express = require ('express');

const router = express.Router();

let listaJogos = [{
    "nome":"The witch",
    "genero":"RPG",
    "lancamento": "2015",
    "avaliacao":"10"
}];

router.get("/", (req, res) => {
    res.status(200).json({message: 'jogos OK'});
});

router.get("/jogos", (req, res) => {
    res.status(200).json({listaJogos});
});

router.get("/jogosIndex/:id", (req, res) => {
    const id = req.params.id;
    const index = listaJogos[id]
    if (index == -1){
        res.status(204).json({message: "Jogo não encontrado."});
        return;
    }
    res.status(200).json({index: index});   
});

router.post("/jogos", (req, res) =>     {
    const jogo = req.body;

    if(!jogo.nome){
        res.status(404).json({message:"Nome da requisição jogo está vazia"});
        return;
    }
    if(!jogo.genero){
        res.status(404).json({message: "Genero da requisição jogo está vazia."});
        return;
    }
    if(!jogo.lancamento){
        res.status(404).json({message: "Lancamento da requisição jogo está vazia."});
        return;
    }
    if(!jogo.avaliacao){
        res.status(404).json({message: "Avaliação da requisição jogo está vazia."});
        return;
    }

    listaJogos.push(jogo);
    res.status(201).json({message: "Jogo cadastrado com sucesso!"});
});

router.put("/jogos/:id", (req, res) => {
    const id = req.params.id;
    const jogo = listaJogos[id];

    console.log(jogo);

    listaJogos[id] = req.body;

    res.status(200).json(listaJogos[id]);
});

router.delete("/deletar/jogos/:id", (req, res) => {
    const id = req.params.id;
    listaJogos.splice(id, 1);
    res.json(listaJogos);
});

module.exports = router;            