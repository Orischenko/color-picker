import React from 'react'

export default function FullWidthBlock({ hexValue }) {
    return (
        <div className="cta-color-block" style={{backgroundColor: `#${hexValue}`}}></div>
    );
}