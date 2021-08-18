import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';

ReactDOM.render(
  <Router>
    <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
          <Route path="/app" component={App} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
