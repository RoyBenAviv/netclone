import './styles/style.scss'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { BrowsePage } from './pages/BrowsePage'
import { AddProfilePage } from './pages/AddProfilePage'
import { ManageProfiles } from './pages/ManageProfiles.jsx'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Redirect } from 'react-router-dom'

function App() {
  const PrivateRoute = (props) => {
    const { user } = useAuth()
    return user ? <Route {...props} /> : <Redirect to="/" />
  }

  return (
    <div className="App">
    <Router>
      <AuthProvider>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/browse/add" component={AddProfilePage} />
        <PrivateRoute path="/browse" component={BrowsePage} />
        <PrivateRoute path="/ManageProfiles" component={ManageProfiles} />
        <Route path="/" component={HomePage} />
      </Switch>
    </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
