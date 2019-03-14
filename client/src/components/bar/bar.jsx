import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRandomQuote } from '../../actions/quotes'
import './bar.css'

const Quote = (props) => {
    return (
        <p className='quote'>"{props.quote.content}"</p>
    )
}

class Bar extends Component {
    componentDidMount() {
        this.props.getRandomQuote()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps)
            this.props = nextProps
    }

    render() {
        return (
            <div className='top-bar'>
                <h1>Quotes Dashboard</h1>
                <Quote quote={this.props.quotesReducer && this.props.quotesReducer.randomQuote || ""} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getRandomQuote: () => dispatch(getRandomQuote())
})

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bar)