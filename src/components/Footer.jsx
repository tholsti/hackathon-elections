import React from 'react';
import { comments } from '../assets/comments.json';
import styled, { keyframes } from 'styled-components';

const moveComments = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-4000px);
  }
`;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row;
  width: 100%;
  white-space: nowrap;
  animation: ${moveComments} 60s linear infinite;
  animation-delay: 2s;
`

const Comment = styled.div`
  padding: 3px 12px 3px 12px;
`

const Footer = () => {
  const [width, setWidth] = React.useState('0');

  React.useEffect(() => {
    setWidth(document.querySelector('#footer').scrollWidth);
  }, []);
  
  return (
    <StyledFooter width={width} id={'footer'}>
      {comments.map(c => (
        <Comment style={{background: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`}}>
          {c}
        </Comment>
      ))}
    </StyledFooter>
  )
};

export default Footer;
