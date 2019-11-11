import React, { useState } from 'react';
import logo from '../assets/tindev.svg'
import './Login.css'
import api from '../services/api'

// utiliza {} p acessar variavel em JavaScript
export default function Login({ history }) {
    /*
        usamos o state p receber do input
        quando for modificar o valor de username chama setUsername
        p acessar o valor chama username
    */
    const [username, setUsername] = useState('');    
        //teste de username/setusername
    async function teste(evento){
        evento.preventDefault(); //previni o funcionamente normal
        
        const response = await api.post('/devs',{
            username,
        });  

        const { _id } = response.data;
            
        history.push(`/dev/${_id}`);
    }
    

    return(
        <div className="login-container">
            <form onSubmit={teste}>
                <img src={logo} alt="Tindev"/>
                <input
                    //tag c varios atributos
                    placeholder="Digite seu user Github"
                    value={username}
                    //onChange é dispara quando houver alteracao no input
                    onChange={evento => setUsername(evento.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}