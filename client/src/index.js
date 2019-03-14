import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import Main from './components/main/main'
import * as serviceWorker from './serviceWorker'
import 'material-components-web/dist/material-components-web.min.css'

ReactDOM.render(
    <Provider store={configureStore()}>
        <Main />
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()