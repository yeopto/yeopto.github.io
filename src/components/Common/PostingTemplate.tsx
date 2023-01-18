import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from 'components/Common/GlobalStyle';
import Footer from 'components/Common/Footer';
import { Helmet } from 'react-helmet';

type PostingTemplateProps = {
  title: string;
  description: string;
  url: string;
  image: string;
  children: ReactNode;
  author: string;
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PostingTemplate: FunctionComponent<PostingTemplateProps> = function ({
  children,
  title,
  description,
  url,
  image,
  author,
}) {
  return (
    <Container>
      <Helmet
        titleTemplate={`%s - ${author}`}
      >
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />
        
        <meta
          name="google-site-verification"
          content="ql22z_2Y_hxY79KKMHs_pLQVmom92VRl7YZ-86hVhZo"
        />
        <meta
          name="naver-site-verification"
          content="afb35c954ef587db6a8825631a9011d9d7652fdb"
        />

        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  );
};

export default PostingTemplate;
