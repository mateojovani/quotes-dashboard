import quotesClient from '../api/quotes'
const api = new quotesClient()

export const getRandomQuote = () => dispatch => {
    return api.getRandomQuote().then(quote => {
        return dispatch({
            type: 'RANDOM_QUOTE',
            payload: quote
        })
    })
    .catch(err => console.log("Could not get random quote!"))
}

export const getQuotes = (params) => dispatch => {
    return api.getQuotes(params).then(quotes => {
        return dispatch({
            type: 'QUOTES',
            payload: quotes
        })
    })
    .catch(err => console.log("Could not get quotes!"))
}

export const addQuote = (params) => dispatch => {
    return api.addQuote(params)
    .then(quote => dispatch(getQuotes()))
    .catch(err => {
        console.log("Could not add a quote!")
        dispatch({ type: 'FAILED_TO_ADD_QUOTE', payload: err })
        dispatch({ type: 'DISMISS_ERR', payload: null})
    })
}

export const editQuote = (params) => dispatch => {
    return api.editQuote(params)
    .then(quote => dispatch(getQuotes()))
    .catch(err => {
        console.log("Could not edit quote!")
        dispatch({ type: 'FAILED_TO_EDIT_QUOTE', payload: err })
        dispatch({ type: 'DISMISS_ERR', payload: null})
    })
}

export const deleteQuote = (params) => dispatch => {
    return api.deleteQuote(params)
    .then(quote => dispatch(getQuotes()))
    .catch(err => {
        console.log("Could not delete quote!")
        dispatch({ type: 'FAILED_TO_DELETE_QUOTE', payload: err })
        dispatch({ type: 'DISMISS_ERR', payload: null})
    })
}