const { Link } = ReactRouterDOM

import { bookService } from '../services/book-service.js'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { icon } from '../cmps/BookPreview.jsx'


export class BookDetails extends React.Component {
    state = {
        book: null
    }
    componentDidMount() {
        this.loadBook()
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
          this.loadBook()
        }
      }

    txtForPageCount = (pageCount) => {
        if (pageCount > 500) return 'Long Reading'
        else if (pageCount > 200) return 'Decent Reading'
        else if (pageCount < 100) return 'Light Reading'
        else return null;
    }


    txtForPublishDate = (publishYear) => {
        const date = new Date();
        const currYear = date.getFullYear()
        const yearsAgo = currYear - publishYear;
        if (yearsAgo > 10) return 'Veteran Book'
        else if (yearsAgo < 1) return 'New!'
        else return null;
    }

    classNameBasedOnPrice = (price) => {
        if (price > 150) return 'red-price';
        else if (price < 20) return 'green-price';
        else return '';
    }

    loadBook() {
        const id = this.props.match.params.bookId
        bookService.getBookById(id).then(book => {
          if (!book) return this.props.history.push('/')
          this.setState({ book })
        })
      }
    render() {
        const { book } = this.state;
        if (!book) return <div>Loading...</div>
        return (
            <div className="book-details">
                <h1>{book.title}</h1>
                <img src={book.thumbnail}/>
                <h2>{book.subtitle}</h2>
                <h2>Categories:{book.categories.map(categorie => {
                    return `${categorie} , `
                })}</h2>
                <h2>Authors{book.authors.map(author => {
                    return `${author} , `
                })}</h2>
                <h3>Publish Date: {book.publishedDate}</h3>
                <p>{book.description}</p>
                <h3>Language: {book.language}</h3>
                <h3>{this.txtForPageCount(book.pageCount)}</h3>
                <h3>{this.txtForPublishDate(book.publishedDate)}</h3>
                <h1 className={this.classNameBasedOnPrice(book.listPrice.amount)}>Price: {book.listPrice.amount}{icon(book.listPrice.currencyCode)}</h1>
                <h1>{book.listPrice.isOnSale ? 'On Sale!' : 'Out Of Stock'}</h1>
                <button onClick={() => this.props.history.push('/book')} > Go back</button>
                <h2>Add a review to this book!</h2>
                <Link to={`/book/${bookService.getNextBookId(book.id)}`} >Next Book</Link>
                <ReviewAdd bookId={book.id}/>
            </div>
        )
    }

}
