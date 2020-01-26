import React from 'react';
// import api from '../../servers/api';

import './styles.css';

// import DevEdit from '../DevEdit';

function DevItem({ dev }) {


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
    </li>
  );
}

export default DevItem;


 // const [edit, setEdit] = useState(false);

  // async function handleDeleteDev() {

  //   if (
  //     window.confirm(
  //       `Voce tem certeza que deseja excluir o usuário ${dev.name}`
  //     )
  //   ) {
  //     try {
  //       await api.delete(`/devs/${dev.github_username}`);
  //       window.location.reload();
  //     } catch {
  //       return;
  //     }
  //   }
  // }

  // function handleUpdateDev() {
  //   setEdit(true);
  // }

  // function handleDevEditClose() {
  //   setEdit(false);
  // }