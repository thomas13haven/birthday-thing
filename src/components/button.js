import React, { Component } from 'react';

const Button = (title, callback) => {
    return (
        <button className="button" onClick={callback}>
            {title}
        </button>
    )
}

export default Button;