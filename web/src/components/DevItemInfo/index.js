import React from 'react';
import './styles.css';

function DevItemInfo({ data }) {

    return (
        <li  className='intem-state'>
            <div className='item-state-info'>
                <span>{data.dev}</span>
                <span>  |  </span>
                <strong>{data.state}</strong>
            </div>
            <div className="div-background"></div>
            <div className="div-background-bar" style={{ width: data.porCento }} ></div>
        </li>
    )
}

export default DevItemInfo