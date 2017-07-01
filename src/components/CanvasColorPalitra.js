import React, { Component } from 'react'

export default class CanvasColorPalitra extends Component{
    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    render() {
        const { onClick, canvasWidth, canvasHeight } = this.props;
        return(
            <canvas
                className='color-palitra'
                ref='canvas'
                width={ canvasWidth }
                height={ canvasHeight }
                onClick={ onClick( this ) }
            />
        );
    }

    updateCanvas() {
        const canvas = this.refs.canvas.getContext('2d');

        { this.addGradientH(canvas) }
        { this.addGradientV(canvas) }
    }

    addGradientH(canvas) {
        const { hueValue } = this.props;

        //horizontal gradient
        const grH = canvas.createLinearGradient(0, 0, canvas.canvas.width, 0);

        grH.addColorStop(0, '#fff');
        grH.addColorStop(1,  `hsl(${hueValue}, 100%, 50%)`);  //hue, width, height

        canvas.fillStyle = grH;
        canvas.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    }

    addGradientV(canvas) {
        const grV = canvas.createLinearGradient(0, 0, 0, canvas.canvas.height);
        grV.addColorStop(0, 'rgba(0,0,0,0)');
        grV.addColorStop(1, 'rgba(0,0,0,1)');

        canvas.fillStyle = grV;
        canvas.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    }
}