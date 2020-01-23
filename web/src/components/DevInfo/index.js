import React from 'react';
import './styles.css';

import DevItemInfo from '../DevItemInfo';

function DevInfo() {

    const data = [
        {state: 'São Paulo', dev: 1001, porCento: "100%"},
        {state: 'Rio de Janeiro', dev: 800, porCento: "79.9%"},
        {state: 'Minas Gerais', dev: 700, porCento: "69.9%"},
        {state: 'Santa Catarina', dev: 650, porCento: "64.9%"},
        {state: 'Paraná', dev: 450, porCento: "44.9%"},
        {state: 'Rio Grande do Sul', dev: 400, porCento: "39.9%"},
    ];

    return (
        <div className='info'>
            <div className='dev-state'>
                <ul className="list-state">
                    <strong className='titulo'>Dev's pelo Brasil</strong>
                    {data.map(dado => (
                        <DevItemInfo key={dado.dev} data={dado} />
                        ))}
                </ul>
            </div>
        </div>
    );

}

export default DevInfo;

