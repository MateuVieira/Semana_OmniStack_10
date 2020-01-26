import React, { useState, useEffect } from 'react';
import api from '../../servers/api'
import './styles.css';

import DevItemInfo from '../DevItemInfo';
import DevInfoTechs from '../DevInfoTechs';

function DevInfo() {

    const [infoState, setInfoState] = useState([]);
    const [infoTechs, setInfoTechs] = useState([]);
    const [stateForTechs, setStateForTechs] = useState([]);

    const [techsSelect, setTechsSelect] = useState('');


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
            setTechsSelect(response.data[0].info);
            handleSelectTech(response.data[0].info);
        }

        loadInfoTechs();
    }, []);

    function parseQuerry(data) {
        const aux = data.split('').map(char => (char === ' ' ? '%20' : char));
        return aux.reduce((a, b) => a + b);
    }

    async function resquestStateForTechs(data) {
        const response = await api.get(`/search-techs?tech=${parseQuerry(data)}`);
        // console.log(response.data);

        setStateForTechs(response.data);
    }

    function handleSelectTech(data) {
        setTechsSelect(data);
        verifySelect(data);
        // console.log(data);
        resquestStateForTechs(data);
    }

    function verifySelect(data) {

        const ulElement = document.querySelector(`.info-tech-list`);

        let item = null;
        ulElement.childNodes.forEach(element => {
            element.className = 'info';
            if (element.id === `info-${data}`) {
                item = element;
            }
        })
        item.className = 'info select';
    }

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
                        {infoStateFirstTen.map(dado => (
                            <DevItemInfo key={dado.info} data={dado} />
                        ))}
                    </ul>
                </div>
            </div>
            <h3> Quer saber onde encontrar um Dev que saiba: </h3>
            <div className="info-tech-state">
                <div className="info-tech">
                    <ul className="info-tech-list">
                        {infoTechs.map(dado =>
                            <DevInfoTechs key={dado.info} data={dado}
                                action={handleSelectTech} />
                        )}
                    </ul>
                </div>
                <div className="tech-for-state">
                    <ul className="list-state">
                        {stateForTechs.map(dado =>
                            <DevItemInfo key={dado.info} data={dado} />
                        )}
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