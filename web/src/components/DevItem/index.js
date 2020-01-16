import React, { useState } from 'react';
import api from '../../servers/api';

import './styles.css';

function DevItem({ dev }) {

  // const [edit, setEdit] = useState(false);


  async function handleDeleteDev() {

    if (
      window.confirm(
        `Voce tem certeza que deseja excluir o usuário ${dev.name}`
      )
    ) {
      try {
        await api.delete(`/devs/${dev.github_username}`);
        window.location.reload();
      } catch {
        return;
      }
    }
  }

  async function handleUpdateDev() {
   
    
  }

  return ( 

    <li className='dev-item'>
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`} >Acessar perfil no GitHub</a>

      {/* Add Update and Delete */}

      <div className="button-group">
        <button className='button-edit' onClick={handleUpdateDev} ></button>
        <button className='button-close' onClick={handleDeleteDev} ></button>
      </div>

      {/* End */}
    </li>
  );
}

export default DevItem;