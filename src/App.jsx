import './styles/style.scss'
import './pages/HomePage.jsx'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignUpPage } from './pages/SignUpPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { AuthProvider } from './contexts/AuthContext'


function App() {
  return (
    
    <div className="App">
    <Router>
      <AuthProvider>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/profiles" component={ProfilePage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
