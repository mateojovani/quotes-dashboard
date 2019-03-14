const initialState = {
    randomQuote: null,
    quotesView: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "RANDOM_QUOTE":
            return { ...state, randomQuote: action.payload }
        case "QUOTES":
            return { ...state, quotesView: action.payload }
        case "FAILED_TO_ADD_QUOTE":
        case "FAILED_TO_EDIT_QUOTE":
        case "FAILED_TO_DELETE_QUOTE":
            return { ...state, error: action.payload }
        case "DISMISS_ERR":
            return { ...state, error: action.payload }
        default:
            return state
    }
}