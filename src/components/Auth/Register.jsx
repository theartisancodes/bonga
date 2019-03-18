import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../constants/firebase'
import styled from 'styled-components';
import md5 from 'md5';
import {
  Grid, Segment, Form, Button, Header, Message, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';


const Container = styled.div`
  text-align: center;
  vertical-align: middle;
`;
const GridCustom = styled(Grid.Column)`
    max-width: 450px;
    display: inline-block;
    float: center;
    align-items: right;
    width: 30%;
    margin-top: 100px;
`;

class Register extends Component {
  constructor(props) {
    super(props);
    const initialState = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',

    };
    this.state = {
      ...initialState,
      loading: false,
      errors: []
    };
  }
  checkIsEmpty = ({ username, email, password, passwordConfirmation }) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length;
  };

  validatePassword = ({ password, passwordConfirmation }) => {
    if (password.length < 7 || passwordConfirmation.length < 7 ) {
      return false
    } else if (password !== passwordConfirmation) {
      return false
    }
    return true
  };
  checkIsValid = () => {
    let errors = [];
    let error;
    if(this.checkIsEmpty(this.state)) {
      error = { message: 'All fields must be filled'};
      this.setState(({errors: errors.concat(error)}));
      return false
    } else if (!this.validatePassword(this.state)) {
      error = { message: 'Password is invalid'};
      this.setState({ errors: errors.concat(error)});
      return false;
    }
    return true

  };
  handleChange = event => {
    this.setState({[ event.target.name]: event.target.value })
};

  handleErrors =  errors => errors.map((error, index) => (<p key={index}>{error.message}</p>));

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, errors, username }  = this.state;
    if(this.checkIsValid()){
      this.setState({ errors: [], loading:true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then(newUser =>
          newUser.user.updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(newUser.user.email)}?=identicon`
          }).then(
            () => this.setState({ loading:  false})
          ).catch(
            error => { this.setState({ errors: errors.concat(error), loading: false})}
          )

        // () => this.setState({ loading: false })
        ).catch( error => {
        this.setState({errors: errors.concat(error), loading: false})
      })

      // i  will  revisit this  and add a passwordless  login
      // .sendSignInLinkToEmail(email, actionCodeSettings).then(
      // () => {window.localStorage.setItem('emailForSignIn', email)}
    }
};

  handleInputErrors = (errors, input) => {
   return errors.some(error => error.message.toLowerCase().includes(input)) ? 'error': ''
  };

  render() {
    const { username,  email, password, passwordConfirmation, errors, loading } = this.state;
    return (
      <div>
        <Container>
          <GridCustom>
            <Header as="h2" icon color="teal" textAlign="center">
              <Icon name="game" />
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  className={this.handleInputErrors(errors, 'username')}
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={username}
                  type="text"
                  onChange={this.handleChange}
                />
                <Form.Input
                  className={this.handleInputErrors(errors, 'email')}
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  className={this.handleInputErrors(errors, 'password')}
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  className={this.handleInputErrors(errors, 'password')}
                  fluid
                  name="passwordConfirmation"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password Confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
                <Button
                  disabled={loading}
                  className={loading ? 'loading': ''}
                  color="teal"
                  fluid
                  size="large"
                > Submit
                </Button>
              </Segment>
            </Form>
            {
              errors.length > 0 && (
                <Message error>
                  {this.handleErrors(errors)}
                </Message>
              )
            }
            <Message>
                Already a user?
              <Link to="/login">Login</Link>
            </Message>
          </GridCustom>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {

};

export default Register;
