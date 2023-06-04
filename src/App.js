import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Header from './components/Header';
import Resume from './components/Resume';
import GlobalStyle from './styles/global';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    const http = "http://localhost:3001/";
    const [transactionsList, setTransitionsList] = useState([])

    const [income, setIncome] = useState(0); // Entradas
    const [expense, setExpense] = useState(0); //Saídas
    const [total, setTotal] = useState(0); //Total


    useEffect(() => {
        Axios.get(http + "listar_contas").then((result) => {
            setTransitionsList(result.data);
        })

        const amountExpense = transactionsList.filter((item) => item.tipo).map((transaction) => Number(transaction.valor));
        const amountIncome = transactionsList.filter((item) => !item.tipo).map((transaction) => Number(transaction.valor));

        // //Todas as saidas total
        const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);

        //Todas as entradas total
        const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

        // //Total sobre as entradas e saidas
        const total = Math.abs(income - expense).toFixed(2);

        setIncome(`R$ ${income}`);
        setExpense(`R$ ${expense}`);
        setTotal(`${Number(income) < Number(expense) ? "-" : ""} R$ ${total}`);

    }, [transactionsList]);

    const handleAdd = (transaction) => {
        const { desc, amount, expense } = transaction;

        Axios.post(http + "registrar_contas", {
            descricao: desc,
            valor: amount,
            tipo: expense
        }).then((response) => {
            if (response.status === 200) {
                toast.success("Conta Inserida com sucesso!");
            }
        })
    }

    return (
        <>
            <Header />
            <ToastContainer autoClose={3000} />
            <Resume income={income} expense={expense} total={total} />
            <Form handleAdd={handleAdd} transactionList={transactionsList} setTransitionsList={setTransitionsList} />
            <GlobalStyle />
        </>
    )
}

export default App;