import React from 'react'

export default function HueInput({ hueValue, handleChangeInput }) {
    return (
        <input type='range' min='0' max='359' value={ hueValue } onChange={ handleChangeInput }/>
    );
}