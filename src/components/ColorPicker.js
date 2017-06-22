import React, { Component } from 'react'
import HueInput from './HueInput'

export default class ColorPicker extends Component{
    state = {
        hue: 0
    };

    render() {
        const { a } = this.props;

        return(
            <HueInput
                hueValue={ this.state.hue }
                handleChangeInput={ this.handleChangeHueInput }
            />
        );
    }

    handleChangeHueInput = (event) => {
        this.setState({
            hue: event.target.value

        }, () => {
            console.log( '---', this.state.hue )
        });
    };
}