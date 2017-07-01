import React from 'react'

export default function AlphaInput({ handleChangeInput, rgbValue }) {
    const R = rgbValue.split(',')[0];
    const G = rgbValue.split(',')[1];
    const B = rgbValue.split(',')[2];

    const gradientInput = <input
                type='range'
                min='0'
                max='100'
                defaultValue='100'
                onChange={ handleChangeInput }
                className="alpha-input"
                style={{background: `linear-gradient(to right, rgba(${ R }, ${ G }, ${ B }, 0), rgb(${R}, ${G}, ${B}))`}}
            />;

    return(
        <span>
            { gradientInput }
        </span>
    );
}