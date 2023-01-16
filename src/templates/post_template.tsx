import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { PostPageItemType } from 'types/PostItem.types';
import PostHead from 'components/Post/PostHead';
import PostingTemplate from 'components/Common/PostingTemplate';
import PostContent from 'components/Post/PostContent';
import CommentWidget from 'components/Post/CommentWidget';

type PostTemplateProps = {
  data: {
    site: {
      siteMetadata: {
        author: string;
      }
    };
    allMarkdownRemark: {
      edges: PostPageItemType[];
    };
  };
  location: {
    href: string;
  };
};

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
    site: { siteMetadata },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0];

  return (
    <PostingTemplate title={title} description={summary} url={href} image={publicURL} author={siteMetadata.author}>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <PostContent html={html} />
      <CommentWidget />
    </PostingTemplate>
  );
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    site {
      siteMetadata {
        author
      }
    }
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`;
