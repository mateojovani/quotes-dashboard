import React, { Component } from 'react'
import { connect } from 'react-redux'
import '@material/typography/dist/mdc.typography.css'
import './main.css'
import { ThemeProvider } from '@rmwc/theme'
import Bar from '../bar/bar'
import Quotes from '../quotes/quotes'

class Main extends Component {
    render() {
        return (
            <div>
                <ThemeProvider options={{
                    primary: '#2ecc71',
                    secondary: 'white',
                    onPrimary: '#000',
                    textPrimaryOnBackground: 'white'
                }}>
                    <Bar />
                    <Quotes />
                </ThemeProvider>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps
)(Main)