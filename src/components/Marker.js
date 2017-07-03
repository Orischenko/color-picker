import React, { Component } from 'react'

export default class Marker extends Component{
    componentDidMount() {
        this.updateMarker();
    }

    componentDidUpdate() {
        this.updateMarker();
    }

    render() {
        return(
            <div className='marker' ref='colorMarker'></div>
        );
    }

    updateMarker() {
        const { coordTop, coordLeft } = this.props;

        const mrkr = this.refs.colorMarker;

        //учитываем margin и padding
        const topIndent = mrkr.getBoundingClientRect().top;
        const leftIndent = mrkr.getBoundingClientRect().left;

        mrkr.style.top = `${ coordTop }px`;
        mrkr.style.left = `${ coordLeft }px`;

        console.log( '---', mrkr.getBoundingClientRect().top );
    }
}