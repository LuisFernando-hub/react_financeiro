import React, { useState } from 'react'
import Grid from '../Grid';
import * as C from './styles';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Form = ({ handleAdd, transactionList, setTransitionsList }) => {
    const [desc, setDesc] = useState(""); //Descrição
    const [amount, setAmount] = useState(""); // Valor
    const [isExpense, setExpense] = useState(false); // Check


    const generateID = () => Math.round(Math.random() * 1000);

    const handleSave = () => {
        if (!desc || !amount) {
            toast.warning("Informe a descrição e o valor!");
            return;
        } else if (amount < 1) {
            toast.warning("O valor tem que ser positivo!");
            return;
        }

        const transaction = {
            id: generateID(),
            desc: desc,
            amount: amount,
            expense: isExpense,
        };

        handleAdd(transaction);

        setDesc("");
        setAmount("");
    }

    return (
        <>
            <C.Container>
                <C.InputContent>
                    <C.Label>Descrição</C.Label>
                    <C.Input value={desc} onChange={(e) => setDesc(e.target.value)} />
                </C.InputContent>
                <C.InputContent>
                    <C.Label>Valor</C.Label>
                    <C.Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </C.InputContent>
                <C.RadioGroup>
                    <C.Input
                        type="radio"
                        id="rIncome"
                        defaultChecked
                        name="group1"
                        onChange={() => setExpense(!isExpense)}
                    />
                    <C.Label htmlFor='rIncome'>Entrada</C.Label>


                    <C.Input
                        type="radio"
                        id="rExpenses"
                        name="group1"
                        onChange={() => setExpense(!isExpense)}
                    />
                    <C.Label htmlFor='rExpenses'>Saída</C.Label>
                </C.RadioGroup>
                <C.Button onClick={handleSave}>ADICIONAR</C.Button>
            </C.Container>
            <Grid itens={transactionList} setItens={setTransitionsList} />
        </>
    )
}

export default Form