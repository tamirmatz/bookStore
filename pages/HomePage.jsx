
const { Link } = ReactRouterDOM;
export function HomePage() {
    return (
        <section className="home">
            <img src="../assets/img/Book-Store-Hero.jpeg"/>
            <h1>Welcome To Our Book Store!</h1>
            <p>Check out our <Link to="/book">books!</Link> </p>
        </section>
    )
}

