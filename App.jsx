const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM;
import { BookApp } from './pages/BookApp.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'



export function App() {
    return (
            <Router>
                <header>
                    <AppHeader />
                </header>
                <main>
                    <UserMsg/>
                    <Switch>
                        <Route component={BookDetails} path="/book/:bookId" />
                        <Route component={BookApp} path="/book" />
                        <Route component={AboutUs} path="/about" />
                        <Route component={HomePage} path="/" />
                    </Switch>
                </main>
                <footer>
                    Coffee Rights &copy;
                </footer>
            </Router>
    )
}


