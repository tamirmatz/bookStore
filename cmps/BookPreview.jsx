const { Link } = ReactRouterDOM

export function BookPreview({ book }) {
  const currencyIcon = icon(book.listPrice.currencyCode);
  return (
    <Link to={`/book/${book.id}`}>
      <article className="book-preview">
        <h1>{book.title}</h1>
        <img src={book.thumbnail} alt="" />
        <h1>Price: {book.listPrice.amount}{currencyIcon}</h1>
      </article>
    </Link>
  )
}

export function icon(currencyCode) {
  switch (currencyCode) {
    case 'ILS': return '₪';
    case 'EUR': return '€';
    case 'USD': return '$';
  }
  return null;
}