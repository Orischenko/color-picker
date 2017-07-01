import React, { Component } from 'react'
import HueInput from './HueInput'
import CanvasColorPalitra from './CanvasColorPalitra'
import RGBValueInput from './RGBValueInput'
import HEXValueInput from './HEXValueInput'
import AlphaInput from './AlphaInput'
import AlphaValueInput from './AlphaValueInput'

const convert = require('../../node_modules/color-convert/conversions');

export default class ColorPicker extends Component{
    state = {
        coordX: 0,
        coordY: 0,
        canvasWidth: 300,
        canvasHeight: 300,
        hue: 359,  //0 - 359,
        saturation: 100, //0 - 100%
        lightness: 50, //0 - 100%
        rgb: '255, 0, 0',
        hex: 'FF0000',
        opacity: 1  // 0 - 1
    };

    render() {
        //set body color
        const R = this.state.rgb.split(',')[0];
        const G = this.state.rgb.split(',')[1];
        const B = this.state.rgb.split(',')[2];

        document.body.style.backgroundColor = `rgba(${ R }, ${ G }, ${ B }, ${ this.state.opacity })`;

        return(
            <div>
                <div className="palitra-wrapper">
                    { this.getCanvas() }
                    { this.getHueInput() }
                    <div className="aplpha-wrapper">
                        { this.getAlphaInput() }
                    </div>
                    <div className="values-wrapper">
                        <div>RGB { this.getRGBValueInput() }</div>
                        <div>HEX { this.getHEXValueInput() }</div>
                        <div>&alpha; { this.getAlphaValueInput() }</div>
                    </div>
                </div>
            </div>
        );
    }

    handleChangeHueInput = (event) => {
        //перевод hsl в rgb, т.к. HUE динамическое
        const R = Math.round(convert.hsl.rgb([event.target.value, this.state.saturation, this.state.lightness])[0]);
        const G = Math.round(convert.hsl.rgb([event.target.value, this.state.saturation, this.state.lightness])[1]);
        const B = Math.round(convert.hsl.rgb([event.target.value, this.state.saturation, this.state.lightness])[2]);
        const rgb = `${ R }, ${ G }, ${ B }`;

        //перевод rgb в hex
        const hex = convert.rgb.hex( [R, G, B]);

        this.setState({
            hue: event.target.value,
            hex: `${ hex }`,
            rgb: rgb
        });
    };

    getCanvas() {
        return(
            <CanvasColorPalitra
                hueValue={ this.state.hue }
                onClick={ this.handlerCanvasClick }
                canvasWidth={ this.state.canvasWidth }
                canvasHeight={ this.state.canvasHeight }
            />
        );
    }

    getHueInput() {
        return(
            <HueInput
                hueValue={ this.state.hue }
                handleChangeInput={ this.handleChangeHueInput }
            />
        );
    }

    handlerCanvasClick = (canvas) => (event) => {
        const canvasElem = canvas.refs.canvas.getContext('2d');

        //учитываем margin и padding
        const topIndent = canvas.refs.canvas.getBoundingClientRect().top;
        const leftIndent = canvas.refs.canvas.getBoundingClientRect().left;

        // получение координат
        const x = event.clientX - leftIndent;
        const y = event.clientY - topIndent;



        // получение цвета пикселя | x, y, width, height
        const img_data = canvasElem.getImageData(x, y, 1, 1).data;

        const R = img_data[0];
        const G = img_data[1];
        const B = img_data[2];

        const rgb = `${ R }, ${ G }, ${ B }`;

        // конвертируем из RGB в HEX
        const hex = convert.rgb.hex( [R, G, B]);

        this.setState({
            coordX: x,
            coordY: y,
            saturation: Math.round(convert.rgb.hsl([R, G, B])[1]),
            lightness: Math.round(convert.rgb.hsl([R, G, B])[2]),
            rgb: rgb,
            hex: `${ hex }`
        });
    };

    handleChangeAlphaInput = (event) => {
        this.setState({
            opacity: +event.target.value/100
        });
    };

    getAlphaValueInput() {
        return(
            <AlphaValueInput
                opacityValue={ this.state.opacity }
            />
        );
    }

    getAlphaInput() {
        return(
            <AlphaInput
                handleChangeInput={ this.handleChangeAlphaInput }
                rgbValue={ this.state.rgb }
            />
        );
    }

    getRGBValueInput() {
        return(
            <RGBValueInput
                rgbValue={ this.state.rgb }
            />
        );
    }

    getHEXValueInput() {
        return(
            <HEXValueInput
                hexValue={ this.state.hex }
            />
        );
    }
}