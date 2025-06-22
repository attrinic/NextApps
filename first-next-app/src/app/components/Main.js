'use client';
import React from 'react';
import Nav from './Nav';

export default class Main extends React.Component {

    render() { // lifecycle number 2
        return (
            <div>
                <Nav />
                <main>{this.props.children}</main>
            </div>
        )
    }
}