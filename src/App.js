import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Header from './components/Header';
import Resume from './components/Resume';
import GlobalStyle from './styles/global';

const App = () => {
    const data = localStorage.getItem("transactions");
    const [transactionsList, setTransitionsList] = useState(
        data ? JSON.parse(data) : []
    )

    const [income, setIncome] = useState(0); // Entradas
    const [expense, setExpense] = useState(0); //Saídas
    const [total, setTotal] = useState(0); //Total

    useEffect(() => {
        //Filtrando os valores das saidas
        const amountExpense = transactionsList.filter((item) => item.expense).map((transaction) => Number(transaction.amount));

        //Filtrando os valores das entradas
        const amountIncome = transactionsList.filter((item) => !item.expense).map(transaction => Number(transaction.amount));

        //Todas as saidas total
        const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);

        //Todas as entradas total
        const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

        //Total sobre as entradas e saidas
        const total = Math.abs(income - expense).toFixed(2);

        setIncome(`R$ ${income}`);
        setExpense(`R$ ${expense}`);
        setTotal(`${Number(income) < Number(expense) ? "-" : ""} R$ ${total}`);

    }, [transactionsList]);

    const handleAdd = (transaction) => {
        const newArrayTransactions = [...transactionsList, transaction];
        setTransitionsList(newArrayTransactions);

        localStorage.setItem("transactions", JSON.stringify(newArrayTransactions));
    }

    return (
        <>
            <Header />
            <Resume income={income} expense={expense} total={total} />
            <Form handleAdd={handleAdd} transactionList={transactionsList} setTransitionsList={setTransitionsList} />
            <GlobalStyle />
        </>
    )
}

export default App;