# Gatsby → Next.js 마이그레이션 가이드

이 문서는 현재 Gatsby 블로그의 기능들이 Next.js로 마이그레이션될 때 어떻게 대체되는지 설명합니다.

## 1. 데이터 페칭 및 파일 시스템

### Gatsby 방식

```javascript
// gatsby-config.js
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `contents`,
    path: `${__dirname}/contents`,
  },
}

// 페이지에서 GraphQL 쿼리
export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;
```

### Next.js 방식

```typescript
// lib/markdown/getAllPosts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'contents');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ''),
      frontmatter: data,
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date),
  );
}
```

**변경 사항:**

- ❌ `gatsby-source-filesystem` 제거
- ❌ GraphQL 쿼리 제거
- ✅ Node.js `fs` 모듈로 직접 파일 읽기
- ✅ `gray-matter`로 frontmatter 파싱

---

## 2. 마크다운 변환

### Gatsby 방식

```javascript
// gatsby-config.js
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      'gatsby-remark-prismjs',
      'gatsby-remark-images',
      'gatsby-remark-external-links',
    ],
  },
}

// 컴포넌트에서
<div dangerouslySetInnerHTML={{ __html: html }} />
```

### Next.js 방식

```typescript
// lib/markdown/parseMarkdown.ts
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism';
import remarkImages from 'remark-images';

export async function parseMarkdown(content: string) {
  const processedContent = await remark()
    .use(remarkHtml)
    .use(remarkPrism)
    .process(content);

  return processedContent.toString();
}
```

**변경 사항:**

- ❌ `gatsby-transformer-remark` 제거
- ✅ `remark` + 플러그인 사용
- ✅ `remark-html`로 HTML 변환
- ✅ `remark-prism`으로 코드 하이라이팅

---

## 3. 이미지 최적화

### Gatsby 방식

```typescript
import { GatsbyImage } from 'gatsby-plugin-image';

<GatsbyImage image={gatsbyImageData} alt="Profile" />;
```

### Next.js 방식

```typescript
import Image from 'next/image';

<Image src="/profile-image.png" alt="Profile" width={120} height={120} />;
```

**변경 사항:**

- ❌ `gatsby-plugin-image`, `gatsby-plugin-sharp` 제거
- ✅ `next/image` 사용 (내장 최적화)
- ✅ 자동 WebP 변환, lazy loading 포함

---

## 4. 페이지 생성

### Gatsby 방식

```javascript
// gatsby-node.js
exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`...`);

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post_template.tsx'),
      context: { slug: node.fields.slug },
    });
  });
};

// src/templates/post_template.tsx
export default function PostTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  // ...
}
```

### Next.js 방식

```typescript
// app/posts/[slug]/page.tsx
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  return <PostContent post={post} />;
}

// generateStaticParams로 빌드 타임에 모든 경로 생성
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}
```

**변경 사항:**

- ❌ `gatsby-node.js`의 `createPages` API 제거
- ❌ `templates/` 디렉토리 제거
- ✅ App Router의 동적 라우팅 (`app/posts/[slug]/page.tsx`)
- ✅ `generateStaticParams`로 정적 경로 생성

---

## 5. SEO 및 메타데이터

### Gatsby 방식

```typescript
import { Helmet } from 'react-helmet';

<Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
</Helmet>;
```

### Next.js 방식

```typescript
// app/posts/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.thumbnail],
    },
  };
}
```

**변경 사항:**

- ❌ `gatsby-plugin-react-helmet` 제거
- ❌ `react-helmet` 제거
- ✅ `generateMetadata` 함수 사용
- ✅ `app/layout.tsx`에서 기본 메타데이터 설정

---

## 6. RSS 피드

### Gatsby 방식

```javascript
// gatsby-config.js
{
  resolve: `gatsby-plugin-feed`,
  options: {
    feeds: [{
      serialize: ({ query: { site, allMarkdownRemark } }) => {
        return allMarkdownRemark.nodes.map(node => ({
          title: node.frontmatter.title,
          date: node.frontmatter.date,
          url: site.siteMetadata.siteUrl + node.fields.slug,
        }));
      },
      query: `...`,
      output: "/rss.xml",
    }],
  },
}
```

### Next.js 방식

```typescript
// app/rss.xml/route.ts
import { getAllPosts } from '@/lib/markdown/getAllPosts';

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = 'https://yeopto.github.io';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>yeopto's Blog</title>
    ${posts
      .map(
        post => `
      <item>
        <title>${post.frontmatter.title}</title>
        <link>${siteUrl}${post.slug}</link>
        <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      </item>
    `,
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
```

**변경 사항:**

- ❌ `gatsby-plugin-feed` 제거
- ✅ Route Handler (`app/rss.xml/route.ts`)로 RSS 생성

---

## 7. 사이트맵 및 robots.txt

### Gatsby 방식

```javascript
// gatsby-config.js
'gatsby-plugin-advanced-sitemap',
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: 'https://yeopto.github.io/',
      sitemap: 'https://yeopto.github.io/sitemap.xml',
      policy: [{ userAgent: '*', allow: '/' }],
    },
  };
```

### Next.js 방식

```typescript
// app/sitemap.ts
import { getAllPosts } from '@/lib/markdown/getAllPosts';

export default async function sitemap() {
  const posts = await getAllPosts();
  const siteUrl = 'https://yeopto.github.io';

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...posts.map(post => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
    })),
  ];
}

// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yeopto.github.io/sitemap.xml',
  };
}
```

**변경 사항:**

- ❌ `gatsby-plugin-advanced-sitemap` 제거
- ❌ `gatsby-plugin-robots-txt` 제거
- ✅ `app/sitemap.ts`로 동적 사이트맵 생성
- ✅ `app/robots.ts`로 robots.txt 생성

---

## 8. 스타일링

### Gatsby 방식

```typescript
// gatsby-config.js
'gatsby-plugin-emotion',

// 컴포넌트에서
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
```

### Next.js 방식

```typescript
// Tailwind CSS 사용
<div className="flex flex-col gap-4">
  {/* ... */}
</div>

// 또는 CSS Modules
import styles from './PostContent.module.css';
<div className={styles.container}>
```

**변경 사항:**

- ❌ `gatsby-plugin-emotion` 제거
- ❌ `@emotion/styled` 제거
- ✅ Tailwind CSS 사용 (권장)
- ✅ CSS Modules도 사용 가능

---

## 9. 코드 하이라이팅

### Gatsby 방식

```javascript
// gatsby-config.js
{
  resolve: 'gatsby-remark-prismjs',
  options: {
    classPrefix: 'language-',
  },
}

// gatsby-browser.js
import 'prismjs/themes/prism-tomorrow.css';
```

### Next.js 방식

```typescript
// lib/markdown/parseMarkdown.ts
import remarkPrism from 'remark-prism';

const processedContent = await remark()
  .use(remarkPrism)
  .process(content);

// app/globals.css
@import 'prismjs/themes/prism-tomorrow.css';
```

**변경 사항:**

- ❌ `gatsby-remark-prismjs` 제거
- ✅ `remark-prism` 플러그인 사용
- ✅ `app/globals.css`에서 Prism 테마 import

---

## 10. Import Alias

### Gatsby 방식

```javascript
// gatsby-node.js
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
```

### Next.js 방식

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "components/*": ["./components/*"],
      "lib/*": ["./lib/*"]
    }
  }
}
```

**변경 사항:**

- ❌ `gatsby-node.js`의 webpack 설정 제거
- ✅ `tsconfig.json`의 `paths` 설정 사용

---

## 11. 글로벌 설정

### Gatsby 방식

```javascript
// gatsby-ssr.js
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'ko' });
};

// gatsby-browser.js
import 'prismjs/themes/prism-tomorrow.css';
```

### Next.js 방식

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

// app/globals.css
@import 'prismjs/themes/prism-tomorrow.css';
```

**변경 사항:**

- ❌ `gatsby-ssr.js` 제거
- ❌ `gatsby-browser.js` 제거
- ✅ `app/layout.tsx`에서 HTML 속성 설정
- ✅ `app/globals.css`에서 전역 스타일 import

---

## 12. 빌드 및 배포

### Gatsby 방식

```bash
# 빌드
gatsby build

# 결과물
public/ 디렉토리에 정적 파일 생성
```

### Next.js 방식

```javascript
// next.config.js
module.exports = {
  output: 'export', // 정적 사이트 생성
};

// 빌드
npm run build

// 결과물
out/ 디렉토리에 정적 파일 생성
```

**변경 사항:**

- ❌ `gatsby build` 제거
- ✅ `next build` 사용
- ✅ `output: 'export'` 설정으로 정적 사이트 생성
- ✅ GitHub Pages 배포 가능

---

## 요약 테이블

| Gatsby 기능                           | Next.js 대체                           | 비고             |
| ------------------------------------- | -------------------------------------- | ---------------- |
| `gatsby-source-filesystem`            | Node.js `fs` 모듈                      | 직접 파일 읽기   |
| GraphQL 쿼리                          | Server Components에서 직접 데이터 페칭 | GraphQL 불필요   |
| `gatsby-transformer-remark`           | `remark` + 플러그인                    | 마크다운 처리    |
| `gatsby-plugin-image`                 | `next/image`                           | 이미지 최적화    |
| `gatsby-node.js` `createPages`        | App Router 동적 라우팅                 | 파일 시스템 기반 |
| `react-helmet`                        | `generateMetadata`                     | SEO 메타데이터   |
| `gatsby-plugin-feed`                  | Route Handler (`app/rss.xml/route.ts`) | RSS 피드         |
| `gatsby-plugin-sitemap`               | `app/sitemap.ts`                       | 사이트맵         |
| `gatsby-plugin-robots-txt`            | `app/robots.ts`                        | robots.txt       |
| `gatsby-plugin-emotion`               | Tailwind CSS                           | 스타일링         |
| `gatsby-remark-prismjs`               | `remark-prism`                         | 코드 하이라이팅  |
| `gatsby-ssr.js` / `gatsby-browser.js` | `app/layout.tsx` / `app/globals.css`   | 글로벌 설정      |

---

## 마이그레이션 체크리스트

- [ ] `gatsby-config.js` 제거
- [ ] `gatsby-node.js` 제거
- [ ] `gatsby-browser.js` 제거
- [ ] `gatsby-ssr.js` 제거
- [ ] GraphQL 쿼리 제거 및 파일 시스템 직접 읽기로 변경
- [ ] `react-helmet` 제거 및 `generateMetadata`로 변경
- [ ] `GatsbyImage` → `next/image`로 변경
- [ ] Emotion → Tailwind CSS로 변경
- [ ] `templates/` 디렉토리 → `app/` 디렉토리로 이동
- [ ] `pages/` 디렉토리 → `app/` 디렉토리로 이동
- [ ] RSS 피드를 Route Handler로 구현
- [ ] 사이트맵 및 robots.txt를 App Router 방식으로 구현
