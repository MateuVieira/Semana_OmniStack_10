import React, { useState } from 'react';
import api from '../../servers/api';

import './styles.css';

function DevEdit({ dataDev, close }) {

    // console.log(dataDev);

    const [name, setName] = useState(dataDev.name);
    const [techs, setTechs] = useState(dataDev.techs.join(', '));
    const [bio, setBio] = useState(dataDev.bio);

    async function handleEditUser(e) {

        e.preventDefault();

        try {
          await api.put(`/devs/${dataDev.github_username}`, {
            name,
            techs,
            bio,
          });
    
          alert(`O usuario ${dataDev.github_username} foi atualizado com sucesso`);
        } catch (error) {
          alert("Tente mais tarde");
        }
      }

    return (
        <div className='background-div'>
            <form onSubmit={handleEditUser}>

                <img src={dataDev.avatar_url} alt={dataDev.name} />

                <div className='input-block'>
                    <label htmlFor='name' >Nome do usuário</label>
                    <input name='name' id='name'
                         value={name} onChange={e => setName(e.target.value)}></input>
                </div>
                <div className='input-block'>
                    <label htmlFor='techs' >Tecnologias</label>
                    <input name='techs' id='techs'
                         value={techs} onChange={e => setTechs(e.target.value)}></input>
                </div>


                <div className='input-block'>
                    <label htmlFor='bio' >Biográfia do usuário</label>
                    <textarea name='bio' id='bio'
                         value={bio} onChange={e => setBio(e.target.value)}></textarea>
                </div>
                <button type='submit'>Editar</button>
                <button onClick={close}>Cancelar</button>
            </form>

        </div>
    );
}

export default DevEdit;