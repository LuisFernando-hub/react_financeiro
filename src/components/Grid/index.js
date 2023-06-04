import React, { useEffect } from 'react'
import GridItem from '../GridItem';
import * as C from './styles';
import Axios from 'axios';

import { toast } from 'react-toastify';


const Grid = ({ itens, setItens }) => {
    const onDelete = (ID) => {
        const http = "http://localhost:3001/";

        Axios.delete(http + "deletar_conta/" + ID).then((result) => {
            if (result.status === 200) {
                toast.success("Conta deletada com sucesso!");
            }
        })
    };

    return (
        <C.Table>
            <C.Thead>
                <C.Tr>
                    <C.Th width={40}>Descrição</C.Th>
                    <C.Th width={40}>Valor</C.Th>
                    <C.Th width={10} alignCenter>Tipo</C.Th>
                    <C.Th width={10}></C.Th>
                </C.Tr>
            </C.Thead>
            <C.Tbody>
                {itens?.map((item, index) => (
                    <GridItem key={index} item={item} onDelete={onDelete} />
                ))}
            </C.Tbody>
        </C.Table>
    )
}

export default Grid