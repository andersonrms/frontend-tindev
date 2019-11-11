import React, { useEffect, useState }from 'react';
//link para chamar a rota, to='/' significa q vamos p pag princ
import { Link } from 'react-router-dom';
//useEffect chama da api assim q exibe na tela
import logo from '../assets/tindev.svg'
import dislike from '../assets/dislike.svg'
import like from '../assets/like.svg'
import './Main.css'
import api from '../services/api'

//propriedade match recebe todos os params da URL
export default function Main({ match }){
    // pra mexer no user, precisar mexer no setUsers
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })
            setUsers(response.data);
        }
        
        loadUsers();
    }, [match.params.id]);
    
    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });

        //remove usuario da tela c o dislike
        setUsers(users.filter( user => user._id !== id));
    }

    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });

        //remove usuario da tela c o dislike
        setUsers(users.filter( user => user._id !== id));
    }

    // user.length é um if q verifica se ta vazio o vetor de user
    return (
        <div className="main-container">
            <Link to='/'>
                <img src={logo} alt="Tindev"/>
            </Link>           
            { users.length > 0 ? (
                <ul>
                     {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name}/>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={ () => handleDislike(user._id)}>
                                <img src={dislike} alt="Disleki"></img>
                            </button>
                            <button type="button" onClick={() => handleLike(user._id)}>
                                <img src={like} alt="Like"></img>
                            </button>
                        </div>
                    </li>
                ))}
                </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            ) }

            
        </div>
    )
}