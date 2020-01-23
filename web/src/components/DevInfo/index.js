import React , { useState, useEffect } from 'react';
import api from '../../servers/api'
import './styles.css';

import DevItemInfo from '../DevItemInfo';

function DevInfo() {

    const [infoState, setInfoState] = useState([]);
    const [infoTechs, setInfoTechs] = useState([]);

    
    useEffect(() => {
        async function loadInfoState() {
          const response = await api.get('/search-location-list');
    
          setInfoState(response.data);
        }
    
        loadInfoState();
      }, []);

      useEffect(() => {
        async function loadInfoTechs() {
          const response = await api.get('search-techs-list');
    

          setInfoTechs(response.data);
        }
    
        loadInfoTechs();
      }, []);

      let number = 10;

      let infoTechsFirstTen = infoTechs.slice(0, number);
      let infoStateFirstTen = infoState.slice(0, number);

    return (
        <section className='info-section'>
            <h3>Algumas Informações</h3>
            <div className='info'>
                <div className='dev-techs'>
                    <ul className="list-state">
                        <strong className='titulo'>Techs dos Dev's</strong>
                        {infoTechsFirstTen.map(dado => 
                            <DevItemInfo key={dado.info} data={dado} />
                        )}
                    </ul>
                </div>
                <div className='dev-state'>
                    <ul className="list-state">
                        <strong className='titulo'>Dev's pelo Brasil</strong>
                        {/* {dataState.map(dado => (
                            <DevItemInfo key={dado.dev} data={dado} info={dataInfo} />
                        ))} */}
                        {infoStateFirstTen.map(dado => (
                            <DevItemInfo key={dado.info} data={dado} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );

}

export default DevInfo;



  // const dataState = [
    //     { state: 'São Paulo', dev: 1001, porCento: "100%" },
    //     { state: 'Rio de Janeiro', dev: 800, porCento: "79.9%" },
    //     { state: 'Minas Gerais', dev: 700, porCento: "69.9%" },
    //     { state: 'Santa Catarina', dev: 650, porCento: "64.9%" },
    //     { state: 'Paraná', dev: 450, porCento: "44.9%" },
    //     { state: 'Rio Grande do Sul', dev: 400, porCento: "39.9%" },
    // ];

    // const dataTechs = [
    //     { state: 'JavaScript', dev: 1001, porCento: "100%" },
    //     { state: 'ReactJS', dev: 800, porCento: "79.9%" },
    //     { state: 'NodeJS', dev: 700, porCento: "69.9%" },
    //     { state: 'VueJS', dev: 650, porCento: "64.9%" },
    //     { state: 'React Native', dev: 450, porCento: "44.9%" },
    //     { state: 'Electron', dev: 400, porCento: "39.9%" },
    // ];