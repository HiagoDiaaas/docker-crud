import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import {useNavigate} from 'react-router-dom';


const CustomerHook = (props) => {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        CustomerService.getAllCustomers().then((res) => {
            setCustomers(res.data);
        })
    })

    const addCustomer = (() => {
        navigate('/add/-1');
    });

    const editCustomer = ((id) => {
        navigate(`/add/${id}`);
    });

    const deleteCustomer = ((id) => {
        CustomerService.deleteCustomer(id).then((res) => {
            navigate('/customers');
        });
    });

    return (
        <div>
            <h2 className="text-center">Cadastro de Clientes</h2>
            <div>
                <button className="btn btn-primary" onClick={addCustomer}>
                    Adicionar novo cliente
                </button>
            </div>

            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(
                            cust =>
                                <tr key={cust.id}>
                                    <td>{cust.name}</td>
                                    <td>{cust.address}</td>
                                    <td>{cust.email}</td>
                                    <td>
                                        <button onClick={() => editCustomer(cust.id)} className="btn btn-info">Atualizar</button>
                                        <button onClick={() => deleteCustomer(cust.id)} className="btn btn-danger">Deletar</button>
                                    </td>

                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerHook