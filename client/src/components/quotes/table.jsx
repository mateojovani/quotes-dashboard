import React, { Component } from 'react'
import '@rmwc/data-table/data-table.css'
import {
    DataTable,
    DataTableContent,
    DataTableHead,
    DataTableBody,
    DataTableHeadCell,
    DataTableRow,
    DataTableCell
} from '@rmwc/data-table'
import { ListDivider } from '@rmwc/list'
import {
    CardAction,
    CardActions,
    CardActionIcons
} from '@rmwc/card'
import { IconButton } from '@rmwc/icon-button'

class QuotesTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            sortBy: 'created_at',
            sortDir: 1
        }
        this.getpage = this.getPage.bind(this)
    }

    getPage(params) {
       if (this.props.filter) {
            params.filter = this.props.filter
            params.filterBy = 'content'
       }

        return this.props.getPage(params)
    }

    render() {
        return (
            <div>
                <DataTable style={{ width: '99.9%' }}>
                    <DataTableContent style={{ width: '100%' }}>
                        <DataTableHead >
                            <DataTableRow>
                                <DataTableHeadCell
                                    sort={this.state.sortBy === 'content' ? this.state.sortDir: null}
                                    onSortChange={sortDir => {
                                        this.setState({
                                            sortDir: this.state.sortDir*-1,
                                            sortBy: 'content'
                                        }, () => {
                                            this.getPage({sortBy: 'content', sort: this.state.sortDir === 1 ? "ASC": "DESC" })
                                        })
                                    }}
                                >Quote</DataTableHeadCell>
                                <DataTableHeadCell>Categories</DataTableHeadCell>
                                <DataTableHeadCell
                                    sort={this.state.sortBy === 'created_at' ? this.state.sortDir: null}
                                    onSortChange={sortDir => {
                                        this.setState({
                                            sortDir: this.state.sortDir*-1,
                                            sortBy: 'created_at'
                                        }, () => {
                                            this.getPage({sortBy: 'created_at', sort: this.state.sortDir === 1 ? "ASC": "DESC" })
                                        })
                                    }}
                                >Created</DataTableHeadCell>
                                <DataTableHeadCell>Actions</DataTableHeadCell>
                            </DataTableRow>
                        </DataTableHead>
                        <DataTableBody>
                            {this.props.quotesView.quotes.map((quote, i) => (
                                <DataTableRow
                                    key={i}>
                                    <DataTableCell>{quote.content}</DataTableCell>
                                    <DataTableCell></DataTableCell>
                                    <DataTableCell>{new Date(quote.created_at).toDateString()}</DataTableCell>
                                    <DataTableCell>
                                        <IconButton icon="edit" onClick={() => this.props.editQuote(quote)}/>
                                        <IconButton icon="delete" onClick={() => this.props.deleteQuote(quote)} />
                                    </DataTableCell>
                                </DataTableRow>
                            ))}
                        </DataTableBody>
                    </DataTableContent>
                </DataTable>
                <ListDivider />

                <CardActions>
                    <CardActionIcons>
                        <CardAction onClick={() => this.getPage({page: parseInt(this.props.quotesView.page) - 1})} icon="arrow_back"/>
                        <CardAction onClick={() => this.getPage({page: parseInt(this.props.quotesView.page) + 1})} icon="arrow_forward" />
                    </CardActionIcons>
                </CardActions>
            </div>
        )
    }
}

export default QuotesTable