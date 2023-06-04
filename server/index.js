const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'finances'
})

app.use(cors());
app.use(express.json());


app.post("/registrar_contas", (req, res) => {
    const { descricao, valor, tipo } = req.body;

    let SQL = "INSERT INTO contas (descricao, valor, tipo) VALUES (?,?,?)";

    db.query(SQL, [descricao, valor, tipo], (err, result) => {
        res.send(result);
    })
})

app.get("/listar_contas", (req, res) => {
    let SQL = "SELECT * FROM contas";

    db.query(SQL, (err, result) => {
        if (err) console.log(err);

        res.send(result);
    })
})

app.delete("/deletar_conta/:id", (req, res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM contas WHERE id = ?"

    db.query(SQL, [id], (err, result) => {
        res.send(result);
    })
})


app.listen(3001, () => {
    console.log('rodando servidor');
});