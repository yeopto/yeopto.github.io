import React, { createRef, FunctionComponent, useEffect } from 'react';
import styled from '@emotion/styled';

const src = 'https://giscus.app/client.js';

type UtterancesAttributesType = {
  src: string;
  'data-repo': string;
  'data-repo-id': string;
  'data-category': string;
  'data-category-id': string;
  'data-mapping': string;
  'data-strict': string;
  'data-reactions-enabled': string;
  'data-emit-metadata': string;
  'data-input-position': string;
  'data-theme': string;
  'data-lang': string;
  crossorigin: string;
  async: string;
};

const UtterancesWrapper = styled.div`
  display: flex;
  width: 768px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const CommentWidget: FunctionComponent = function () {
  const element = createRef<HTMLDivElement>();

  useEffect(() => {
    if (element.current === null) return;

    const utterances: HTMLScriptElement = document.createElement('script');

    const attributes: UtterancesAttributesType = {
      src,
      'data-repo': 'yeopto/yeopto.github.io',
      'data-repo-id': 'R_kgDOIBgOPA',
      'data-category': 'Comments',
      'data-category-id': 'DIC_kwDOIBgOPM4CSDAL',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '0',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'light',
      'data-lang': 'ko',
      crossorigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    element.current.appendChild(utterances);
  }, []);

  return <UtterancesWrapper ref={element} />;
};

export default CommentWidget;
