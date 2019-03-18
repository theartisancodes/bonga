import React from 'react';
import styled from 'styled-components';
import {
  Grid, Segment, Form, Button, Header, Message, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Layout from '../Layout/Layout';

const Container = styled.div`
  text-align: center;
  vertical-align: middle;
`;

const SignUp = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Container>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="#455A64" textAlign="center">
            <Icon name="Cheza" />
          </Header>
          <Form size="large">
            <Segment stacked>
              {children}
            </Segment>
          </Form>
        </Grid.Column>
      </Container>
    </Layout>
  );
};

SignUp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SignUp;
