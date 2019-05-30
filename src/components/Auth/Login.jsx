import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Grid, Segment, Form, Button, Header, Message, Icon,
} from 'semantic-ui-react';
import firebase from '../../constants/firebase'

const Container = styled.div`
  text-align: center;
  vertical-align: middle;
`;
const GridCustom = styled(Grid.Column)`
    max-width: 450px;
    display: inline-block;
    width: 30%;
    margin-top: 100px;
`;

const Login = () => {
  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEmail= event => {
    const email = event.target.value;
    setUserName(email);
  };
  const handlePassword = event => {
    const password = event.target.value;
    setPassword(password)
  };
  const handleErrors =  errors => errors.map((error, index) => (<p key={index}>{error.message}</p>));
  const handleInputErrors = (input) => {
    return errors.some(error => error.message.toLowerCase().includes(input)) ? 'error': ''
  };
  const isLoginValid = (email, password) => email && password;

  const handleLogin = event => {
    event.preventDefault();
    if(isLoginValid(email, password)) {
      setError(errors);
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password).then(user => {
          console.log(user);
          setLoading(false)
        })
        .catch( error => {
          console.log(error);
          setError(error);
          setLoading(false)
        })
    }
    };

    return (
      <div>
        <Container>
          <GridCustom>
            <Header as="h2" icon color="teal" textAlign="center">
              <Icon name="game" />
            </Header>
            <Form size="large" onSubmit={handleLogin}>
              <Segment stacked>
                <Form.Input
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={handleEmail}
                />
                <Form.Input
                  className={() => handleInputErrors(password, 'password')}
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                />
                <Button
                  disabled={loading}
                  className={loading ? 'loading': ''}
                  color="teal"
                  fluid
                  size="large"
                >
Login
                </Button>
              </Segment>
            </Form>
            {
              errors && errors.length > 0 && (
                <Message error>
                  {handleErrors}
                </Message>
              )
            }
            <Message>
              New user?
              <Link to="/register">Register</Link>
            </Message>
          </GridCustom>
        </Container>
      </div>
    );
};

Login.propTypes = {

};

export default Login;
