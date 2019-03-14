import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuotes, addQuote, editQuote, deleteQuote } from '../../actions/quotes'
import QuotesTable from './table'

import {
    Card,
    CardActions
} from '@rmwc/card'
import { Button, ButtonIcon } from '@rmwc/button'
import { ListDivider } from '@rmwc/list'
import { Typography } from '@rmwc/typography'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogButton
} from '@rmwc/dialog'
import { TextField } from '@rmwc/textfield'
import { Snackbar } from '@rmwc/snackbar'
class Quotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false,
            dialogText: "",
            dialogMode: "Add",
            quote: null,
            filter: null
        }

        this.modal = {
            handleTextChange: this.handleTextChange.bind(this),
            handleActionBtn: this.handleActionBtn.bind(this),
            editQuote: this.handleQuoteEdit.bind(this)
        }
        this.handleFilter = this.handleFilter.bind(this)
    }
    componentDidMount() {
        this.props.getQuotes()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps)
            this.props = nextProps
    }

    handleTextChange(text) {
        this.setState({
            dialogText: text
        })
    }

    handleQuoteEdit(quote) {
        this.setState({
            dialogOpen: true,
            dialogMode: "Edit",
            dialogText: quote.content,
            quote: quote
        })
    }

    handleActionBtn(mode = "Add", data) {
        if (mode == "Add")
            this.props.addQuote(data)
        else this.props.editQuote({ ...this.state.quote, content: data.content })
    }

    handleFilter(e) {
        this.setState({
            filter: e.target.value
        }, () => this.props.getQuotes({filterBy: 'content', filter: this.state.filter})) //TODO support multiple column filter
    }

    render() {
        return (
            <div className='quotes-card'>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={evt => { this.setState({ dialogOpen: false }) }}
                >
                    <DialogTitle>Add a quote</DialogTitle>
                    <DialogContent>
                        <TextField textarea fullwidth value={this.state.dialogText} onChange={(e) => this.modal.handleTextChange(e.target.value)} outlined label="Quote" />
                    </DialogContent>
                    <DialogActions>
                        <DialogButton action="close">Cancel</DialogButton>
                        <DialogButton
                            onClick={() => this.handleActionBtn(this.state.dialogMode, { content: this.state.dialogText })}
                            action="accept"
                            isDefaultAction
                        >
                            {this.state.dialogMode}
                        </DialogButton>
                    </DialogActions>
                </Dialog>
                <Card outlined style={{ marginTop: '10px' }}>
                    <CardActions>
                        <TextField onChange={this.handleFilter} outlined withLeadingIcon="search" withTrailingIcon="close" label="Filter quotes" />
                        <Button onClick={() => { this.setState({ dialogOpen: true, dialogMode: "Add" }) }}><ButtonIcon icon="add" /> Create</Button>
                    </CardActions>

                    <ListDivider />
                    {
                        this.props.quotesReducer && this.props.quotesReducer.quotesView ?
                            <QuotesTable
                                filter={this.state.filter}
                                editQuote={this.modal.editQuote}
                                deleteQuote={this.props.deleteQuote}
                                getPage={this.props.getQuotes}
                                quotesView={this.props.quotesReducer.quotesView} /> :
                            null
                    }
                </Card >
                <Snackbar
                    show={this.props.quotesReducer && this.props.quotesReducer.error}
                    message="Action failed!"
                    timeout={1000}
                />
            </div>
        )
    }
}

/**
 * CRUD ACTIONS on quotes api
 */
const mapDispatchToProps = dispatch => ({
    getQuotes: (params) => dispatch(getQuotes(params)),
    addQuote: (params) => dispatch(addQuote(params)),
    editQuote: (params) => dispatch(editQuote(params)),
    deleteQuote: (params) => dispatch(deleteQuote(params))
})

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quotes)