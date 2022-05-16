import './styles/style.scss'
import './pages/HomePage.jsx'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignUpPage } from './pages/SignUpPage.jsx'
import { BrowsePage } from './pages/BrowsePage.jsx'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Redirect } from 'react-router-dom'

function App() {
  
  const NoUserRoute = (props) => {
    const { user } = useAuth()
    return user ? <Route {...props} /> : <Redirect to="/" />
  }
  const UserRoute = (props) => {
    const { user } = useAuth()
    return !user ? <Route {...props} /> : <Redirect to="/browse" />
  }

  return (
    
    <div className="App">
    <Router>
      <AuthProvider>
      <Switch>
        <UserRoute path="/login" component={LoginPage} />
        <UserRoute path="/signup" component={SignUpPage} />
        <NoUserRoute path="/browse" component={BrowsePage} />
        <UserRoute path="/" component={HomePage} />
      </Switch>
    </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
