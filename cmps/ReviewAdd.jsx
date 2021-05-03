import { bookService } from '../services/book-service.js'
import { utilService } from '../services/util-service.js'

export class ReviewAdd extends React.Component {
    state = {
        review: {
            fullName: 'Books Reader',
            rate: 1,
            readAt: Date.now(),
            txt: '',
        },
        bookReviews: []
    }
    componentDidMount() {
        this.getBookReviews()
    }
    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState({ review: { ...this.state.review, [field]: value } })
    }
    onSendReview = (ev) => {
        ev.preventDefault()
        const bookId = this.props.bookId;
        const bookReview = this.state.review;
        bookService.addReview(bookId, bookReview)
        this.getBookReviews()

    }

    getBookReviews() {
        const bookId = this.props.bookId
        bookService.getBookById(bookId)
            .then(book => {
                this.setState({ bookReviews: book.bookReviews })
            })
    }

    onDeleteReview(reviewId) {
        const bookId = this.props.bookId
        bookService.deleteReview(reviewId, bookId)
        this.getBookReviews()
        console.log(this.state)
    }

    render() {
        const { bookReviews } = this.state;
        return (
            <div className="reviews-area">
                <form className="review-form" onSubmit={this.onSendReview}>
                    <label className="review-form-item" htmlFor="fullName">Full Name</label>
                    <input className="review-form-item" type="text" id="fullName" name="fullName" onChange={this.handleChange} />
                    <label className="review-form-item" htmlFor="bookRate">Rate</label>
                    <select className="review-form-item" id="bookRate" name="rate" onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label className="review-form-item" htmlFor="readAt">Read At</label>
                    <input className="review-form-item" type="date" id="readAt" name="readAt" onChange={this.handleChange} />
                    <label className="review-form-item" htmlFor="bookReview"></label>
                    <textarea className="review-form-item" id="bookReview" name="txt" cols="30" rows="10" onChange={this.handleChange}></textarea>
                    <button className="btn review-form-item" >Send!</button>
                </form>
                <section >
                    <ul className="clean-list reviews">
                        {bookReviews.map(review => {
                            return <li className="review" key={review.id}><span className="btn delete-review" onClick={() => {
                                this.onDeleteReview(review.id)
                            }}>X</span>
                                <h3>User: {review.fullName} , Rate: {review.rate} , Read At: {review.readAt}</h3>
                                <p>{review.review}</p>
                            </li>
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}
