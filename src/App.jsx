import './styles/style.scss'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { BrowsePage } from './pages/BrowsePage'
import { BrowseWatchPage } from './pages/BrowseWatchPage'
import { AddProfilePage } from './pages/AddProfilePage'
import { ManageProfiles } from './pages/ManageProfiles'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'




const PrivateRoute = (props) => {
  const { user } = useAuth()
  return user ? <Route {...props} /> : <Redirect to="/" />
}

export default function App() {

    return (
      <div className="App">
        <Router >
          <AuthProvider>
            <TransitionGroup>
              <CSSTransition timeout={{ enter: 300, exit: 300 }} classNames="fade" key={Route.path}>
                <Switch>
                  <Route path="/login" component={LoginPage} />
                  <Route path="/signup" component={SignUpPage} />
                  <PrivateRoute path="/browse/add" component={AddProfilePage} />
                  <PrivateRoute path="/browse/:id" component={BrowseWatchPage} />
                  <PrivateRoute path="/browse" component={BrowsePage} />
                  <PrivateRoute path="/ManageProfiles" component={ManageProfiles} />
                  <Route path="/" component={HomePage} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </AuthProvider>
        </Router>
      </div>
    )
  }