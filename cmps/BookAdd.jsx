import { bookService } from '../services/book-service.js'
import { showUserMsg } from '../services/event-bus-service.js'

//showUserMsg('asdasd','success')

export class BookAdd extends React.Component {
    state = {
        filter: '',
        books: null
    }

    componentDidMount() {   
    }

    handleChange = (ev) => {
        const filter = ev.target.value;
        this.setState({ filter },this.getGoogleBooks)
    }

    getGoogleBooks = () => {
        const filter = this.state.filter
        bookService.getBooksFromApi(filter)
            .then(filteredBooks => {
                this.setState({ books: filteredBooks })
            })
    }

    onAddBook(book){
        bookService.addBook(book)
        showUserMsg(`${book.volumeInfo.title} was successfully added`, 'success',book.id)
        this.props.loadBooks()
    }

    render() {
        const {books,filter} = this.state;
        console.log(books,filter)
        return (
            <div>
                <label className="book-add-search-label" htmlFor="book-add-search">Add Book</label>
                <input type="search" id="book-add-search" name="filter" onChange={this.handleChange} />
                <ul className="api-list">
                    {books && books.map(book => <li key={book.id} >{book.volumeInfo.title} <button onClick={() => {
                        this.onAddBook(book)
                    }}>+</button></li>
                )}
                </ul>
            </div>
        )
    }
}