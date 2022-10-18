import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      반갑습니다, 개발중입니다.
      <br />© October.2022 yeopto, Powered By Gatsby.
    </FooterWrapper>
  );
};

export default Footer;
