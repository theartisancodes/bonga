import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Landing from './components/Landing/Landing';
import * as serviceWorker from './utils/serviceWorker';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import firebase from './constants/firebase'

const store = createStore(() => {}, composeWithDevTools());

const Root = props => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        props.history.push('/')
      }
    })
  });
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    )
};

Root.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};
const RoutePath = withRouter(Root);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RoutePath />
    </Router>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
