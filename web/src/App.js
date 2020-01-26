import React, { useState, useEffect } from 'react';
import api from './servers/api';

import './css/global.css';
import './css/App.css';
import './css/Sidebar.css';
import './css/Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
import DevSearch from './components/DevSearch';
import DevInfo from './components/DevInfo';

function App() {

  const [devs, setDevs] = useState([]);
  const [devsInfo, setDevsInfo] = useState({});
  const [page, setPage] = useState(1);

  const [formCadastro, setFormCadastro] = useState(false);

  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get(`/devs?page=${page}`);

      const { docs, ...infoPage } = response.data;

      if (devs.length === 0) {
        setDevs(docs);
        setDevsInfo(infoPage);
        return;
      }

      if (devsInfo.page == page || devsInfo.page === undefined) return;
      setDevsInfo(infoPage);
      setDevs([...devs, ...docs]);
      testePageMoreDevs();
    }

    loadDevs();
  });

  async function handleAddDev(data) {

    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  function handleOpenCadastro() {
    setFormCadastro(true);
  }

  function handleCloseCadastro() {
    setFormCadastro(false);
  }

  function handleBuscar(e) {
    e.preventDefault();

    const keySearch = document.querySelector('#search');

    setBusca(keySearch.value);
  }

  function filterDevs(dev) {

    if (busca === '')
      return true;

    return dev.techs.includes(busca);
  }

  function testePageMoreDevs() {
    
    if (page === devsInfo.pages || devs.length === devsInfo.total) {
      const buttonPage = document.querySelector('#more-devs');
      buttonPage.disabled = true;
      return;
    }
  }

  function handleMoreDevs() {

    testePageMoreDevs();

    setPage(page + 1);
  }

  return (

    <div id='app'>
      <header className='principal'>
      </header>
      {formCadastro ? <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} closeForm={handleCloseCadastro} />
      </aside> : (
          <button id='button-cadastra-dev' onClick={handleOpenCadastro} > JOIN! </button>
        )}
      <DevSearch busca={handleBuscar} />
      <main>
        <ul>
          {devs.filter(filterDevs).map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
        <button id='more-devs' onClick={handleMoreDevs} > </button>
        <DevInfo />
      </main>
    </div>
  );
}

export default App;
