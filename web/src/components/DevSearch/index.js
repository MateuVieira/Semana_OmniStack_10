
import React from 'react';

import './styles.css';


function DevSearch({ busca }) {

    return (
        <section className='search'>
            <div className="webflow-style-input">
                <input className="" type="text" placeholder="Techs" id='search'></input>
                <button type="submit" onClick={busca} />
            </div>
        </section>
    )
}

export default DevSearch;
