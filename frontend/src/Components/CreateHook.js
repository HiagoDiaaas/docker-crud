import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const CreateHook = (props) => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();

    useEffect(() => {
        if (id == -1) {
            return;
        }
        CustomerService.getCustomerById(id).then((res) => {
            let cust = res.data;
            setName(cust.name);
            setAddress(cust.address);
            setEmail(cust.email);
        })
    }, [])


    const changeNameHandler = (event) => {
        setName(event.target.value);
    }

    const changeAddressHandler = (event) => {
        setAddress(event.target.value);
    }

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const saveCustomer = (event) => {
        event.preventDefault();
        let cust = { name: name, address: address, email: email };
        if (id < 0) {
            CustomerService.createCustomer(cust).then(res => {
                navigate('/customers');
            })
        } else {
            CustomerService.updateCustomer(cust, id).then(res => {
                navigate('/customers');
            })
        }
    }

    const cancel = () => {
        navigate('/customers');
    }

    const pageTitle = () => {
        if (id < 0) {
            return "Adicionar Cliente";
        } else {
            return "Atualizar Cliente";
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h3 class="text-center"> {pageTitle()}</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label> Nome</label>
                                <input name="name" placeholder=" Customers Name" className="form-control"
                                    value={name} onChange={changeNameHandler} />
                            </div>

                            <div className="form-group">
                                <label>Endereço</label>
                                <input name="address" placeholder="Address" className="form-control"
                                    value={address} onChange={changeAddressHandler} />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" placeholder="Email" className="form-control"
                                    value={email} onChange={changeEmailHandler} />
                            </div>
                            <button className="btn btn-success" onClick={saveCustomer}>Salvar</button>
                            <button className="btn btn-success" onClick={cancel} style={{ marginLeft: "10px" }}>Cancelar</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateHook