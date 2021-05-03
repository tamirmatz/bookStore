import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookAdd } from '../cmps/BookAdd.jsx'


export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: null,
    }
    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        console.log('the filterby is', this.state.filterBy)
        bookService.query(this.state.filterBy).then((books) => {
            this.setState({ books })
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    render() {
        const { books } = this.state
        return (
            <section>
                <BookFilter onSetFilter={this.onSetFilter} />
                <BookList books={books} />
                <BookAdd loadBooks ={this.loadBooks} />
            </section>
        )
    }
}