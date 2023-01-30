import React from 'react';
import './Form.css';

function Form (props) {
    return (
        <section>
            <form className='form' onSubmit={props.onSubmit}>

                { props.children }

            </form>
        </section>
    )
}

export default Form;