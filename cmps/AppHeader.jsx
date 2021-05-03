const { NavLink,withRouter} = ReactRouterDOM
export class _AppHeader extends React.Component{
    render(){
        return <nav className="app-header">
        <h1>Books Madness</h1>
        <ul className="clean-list">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/book">Books</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </nav>
    }
    
}

export const AppHeader = withRouter(_AppHeader)