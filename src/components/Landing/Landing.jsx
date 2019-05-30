import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
 background-image: url(../../imgLocal/landingBackground.jpg);
 background-repeat: no-repeat;
 background-position: center;
 -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const TextContainer = styled.div`
  border-style: solid;
  padding: 24px;
  position: absolute;
  top: 40%;
  left: 40%;
  background-color: aliceblue;
  opacity: 0.5;
  display: inline-block;    
  font-family: "Roboto",sans-serif;
  font-size: 28px;
  font-weight: 400;
`;
const renderLandingPage = (
  <div>
    <Container>
      <TextContainer>
      Text Here
      </TextContainer>
    </Container>
  </div>
);

const Landing = () => {
    return (
      renderLandingPage
    );
};

export default Landing;
