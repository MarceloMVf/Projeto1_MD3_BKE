const express = require('express');

const app = express();

const port = (3000);

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: 'index OK'});
});

const jogosRouter = require("./jogos");
app.use("/jogos", jogosRouter);

const musicasRouter = require("./musicas");
app.use("/musicas", musicasRouter);

const livrosRouter = require("./livros");
app.use("/livros", livrosRouter);

app.listen (port, () => {
    console.log(`API usando a porta ${port}`);
});