import React from 'react';
import './styles.css';

function DevInfoTechs({ data, action }) {

    function handleSelect() {
        action(data.info);
    }

    return (
        <li className='info' id={`info-${data.info}`} onClick={handleSelect}>
            <strong>{data.info}</strong>
        </li>
    )
}

export default DevInfoTechs