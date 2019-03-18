import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Grid, Segment, Form, Button, Header, Message, Icon,
} from 'semantic-ui-react';

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

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Container>
          <GridCustom>
            <Header as="h2" icon color="teal" textAlign="center">
              <Icon name="game" />
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  type="text"
                  onChange={() => {}}
                />
                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={() => {}}
                />
                <Button color="teal" fluid size="large"> Submit</Button>
              </Segment>
            </Form>
            <Message>
              New user?
              <Link to="/register">Register</Link>
            </Message>
          </GridCustom>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {

};

export default Login;
