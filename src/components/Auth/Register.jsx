import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import md5 from 'md5';
import {
  Grid, Segment, Form, Button, Header, Message, Icon,
} from 'semantic-ui-react';
import firebase from '../../constants/firebase'
// import PropTypes from 'prop-types';


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

const Register =  () => {
  const [userName, setUserName ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [passwordConfirmation, setPasswordConfirmation ] = useState('');
  const [errors, setErrors ] = useState([]);
  // eslint-disable-next-line
  const [userRef, setUserRef ] = useState(firebase.database().ref('users'));
  const [loading, setLoading ] = useState(false);

  const checkIsEmpty = () => {
    return !userName.length || !email.length || !password.length || !passwordConfirmation.length;
  };

  const validatePassword = () => {
    if (password.length < 7 || passwordConfirmation.length < 7 ) {
      return false
    } else if (password !== passwordConfirmation) {
      return false
    }
    return true
  };
 const checkIsValid = () => {
    let errors = [];
    let error;
    if(checkIsEmpty(errors)) {
      error = { message: 'All fields must be filled'};
      setErrors(errors.concat(error));
      return false
    } else if (!validatePassword(errors)) {
      error = { message: 'Password is invalid'};
      setErrors(errors.concat(error));
      return false;
    }
    return true

  };
  const handleEmail = event => {
    const email = event.target.value;
    setEmail(email)
};
  const handleUserName = event => {
  const username = event.target.value;
    setUserName(username);
};
  const handlePassword = event => {
  const password = event.target.value;
    setPassword(password)
};
  const handlePasswordConfirmation = event => {
  const confirmation =  event.target.value;
    setPasswordConfirmation(confirmation)
};

const handleErrors =  errors => errors.map((error, index) => (<p key={index}>{error.message}</p>));

  const handleSubmit = event => {
    event.preventDefault();
    if(checkIsValid()){
     setErrors([]);
     setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then(newUser =>
          newUser.user.updateProfile({
            displayName: userName,
            photoURL: `http://gravatar.com/avatar/${md5(newUser.user.email)}?d=identicon`
          }).then(
            () => {
              handleSaveUser(newUser).then(() => {
                setLoading (false);
              })
            } ).catch(
            error => (
              setErrors(errors.concat(error),
              setLoading (false)))

        ).catch(
            error => (
              setErrors(errors.concat(error),
                setLoading (false)))
          ))

      // i  will  revisit this  and add a passwordless  login
      // .sendSignInLinkToEmail(email, actionCodeSettings).then(
      // () => {window.localStorage.setItem('emailForSignIn', email)}
    }
};

  const handleSaveUser = newUser => {
   return userRef.child(newUser.user.uid).set({
     name: newUser.user.displayName,
     avatar: newUser.user.photoURL
   })
  };

  const handleInputErrors = (errors, input) => {
   return errors.some(error => error.message.toLowerCase().includes(input)) ? 'error': ''
  };

    return (
      <div>
        <Container>
          <GridCustom>
            <Header as="h2" icon color="teal" textAlign="center">
              <Icon name="game" />
            </Header>
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  className={() => handleInputErrors(errors, 'username')}
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={userName}
                  type="text"
                  onChange={handleUserName}
                />
                <Form.Input
                  className={() => handleInputErrors(errors, 'email')}
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={handleEmail}
                />
                <Form.Input
                  className={() => handleInputErrors(errors, 'password')}
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={handlePassword}
                />
                <Form.Input
                  className={() => handleInputErrors(errors, 'password')}
                  fluid
                  name="passwordConfirmation"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password Confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={handlePasswordConfirmation}
                />
                <Button
                  disabled={loading}
                  className={loading ? 'loading': ''}
                  color="teal"
                  fluid
                  size="large"
                >
                  Register
                </Button>
              </Segment>
            </Form>
            {
              errors.length > 0 && (
                <Message error>
                  {handleErrors}
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

Register.propTypes = {

};

export default Register;
