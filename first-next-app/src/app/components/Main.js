'use client';
import React from 'react';
import Nav from './Nav';

export default class Main extends React.Component {
    constructor() { // lifecycle number 1
        super();
        this.state = { // define state
            username: "Attri",
            products: []
        }
    }

    updateUserName = () => { // Update state using this.setState({})
        this.setState({
            username: "Partik"
        })
    }

    handleAddProduct = (productName) => {
        this.setState((prevState) => ({  // Update state using this.setState({})
            products: [...prevState.products, productName]
        }))
    }

    render() { // lifecycle number 2
        return (
            <div>
                <Nav />
                <main>{this.props.children}</main>
            </div>
        )
    }
}

// export default Main;