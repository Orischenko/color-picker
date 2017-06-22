import React from 'react'
import ReactDOM from 'react-dom'
import ColorPicker from './components/ColorPicker'

require('./sass/style.scss');

ReactDOM.render(
    <ColorPicker />,
    document.getElementById('color-picker')
);