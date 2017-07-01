import React from 'react'

export default function RGBValueInput({ rgbValue }) {
    return(
        <div className="color-value">
            <span>{ rgbValue }</span>
        </div>
    );
}