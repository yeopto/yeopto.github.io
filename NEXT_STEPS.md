# 다음 단계 작업 가이드

## 현재 완료된 작업 ✅

1. ✅ Next.js 프로젝트 초기화 및 기본 설정
   - TypeScript, Tailwind CSS, ESLint 9, Prettier 설정
   - `next.config.mjs`, `postcss.config.mjs` (ES module 형식)

2. ✅ 디자인 시스템 토큰 정의
   - `lib/design-system/tokens.ts` - 색상, 타이포그래피, 간격, 그림자, 트랜지션, z-index
   - `app/globals.css` - CSS 변수 및 다크모드 지원
   - `tailwind.config.ts` - 토큰을 Tailwind에 통합

3. ✅ 기본 UI 컴포넌트 개발
   - Button, Card, Typography, Badge, Input, Avatar, Divider, Container
   - `components/ui/` 디렉토리
   - `lib/utils/cn.ts` - 클래스명 병합 유틸리티

4. ✅ 마크다운 처리 시스템 구축
   - `lib/markdown/getAllPosts.ts` - 모든 포스트 메타데이터 추출
   - `lib/markdown/getPostBySlug.ts` - 특정 포스트 + HTML 변환
   - `lib/markdown/parseMarkdown.ts` - 마크다운 파싱 유틸리티
   - `components/markdown/MarkdownContent.tsx` - 마크다운 렌더링
   - `@tailwindcss/typography` 플러그인 설정

5. ✅ Post Feature 구현
   - PostCard, PostList, PostHeader, PostContent, RelatedPosts
   - `usePostList`, `usePost` 훅
   - `postUtils.ts` - 읽기 시간 계산, 날짜 포맷팅

6. ✅ Category Feature 구현
   - `getAllCategories` 유틸리티
   - `useCategories` 훅
   - `CategoryFilter` 컴포넌트 (URL 쿼리 파라미터 연동)

7. ✅ 페이지 구현
   - `app/layout.tsx` - 루트 레이아웃 (메타데이터, 폰트)
   - `app/page.tsx` - 홈 페이지 (Server Component)
   - `app/posts/[slug]/page.tsx` - 포스트 상세 (generateStaticParams)
   - `app/not-found.tsx` - 404 페이지
   - `components/common/Footer.tsx`, `Introduction.tsx`
   - `components/client/PostListClient.tsx`, `CategoryFilterClient.tsx`

## 해결된 이슈

- ✅ `next.config.js` → `next.config.mjs` 변경 (ES module)
- ✅ `postcss.config.js` → `postcss.config.mjs` 변경
- ✅ `src/pages/` 디렉토리 삭제 (App Router 충돌 해결)
- ✅ `tsconfig.json`에서 `src` 폴더 exclude
- ✅ `remark-prism` 타입 선언 추가 (`types/remark-prism.d.ts`)

## 다음 단계 작업 목록

### 1. Search Feature 구현 (우선순위: 높음)
- [x] `features/search/components/SearchBar.tsx` - 검색 입력 컴포넌트
- [x] `features/search/components/SearchResults.tsx` - 검색 결과 표시
- [x] `features/search/hooks/useSearch.ts` - Fuse.js 통합 검색 훅
- [x] `features/search/utils/searchUtils.ts` - 검색 관련 유틸리티
- [x] `features/search/index.ts` - export 파일

**참고**: `fuse.js` 패키지는 이미 설치되어 있음

### 2. TableOfContents Feature 구현
- [x] `features/toc/components/TableOfContents.tsx` - 목차 컴포넌트
- [x] `features/toc/hooks/useTableOfContents.ts` - 목차 추출 훅
- [x] `features/toc/utils/tocUtils.ts` - HTML에서 헤딩 추출 유틸리티
- [x] `features/toc/index.ts` - export 파일

### 3. SEO 최적화
- [ ] `app/sitemap.ts` - 동적 사이트맵 생성
- [ ] `app/robots.ts` - robots.txt 생성
- [ ] `app/rss.xml/route.ts` - RSS 피드 생성
- [ ] 구조화된 데이터 (JSON-LD) 추가

### 4. 다크모드 구현
- [ ] `components/common/ThemeProvider.tsx` - next-themes Provider
- [ ] `components/common/ThemeToggle.tsx` - 다크모드 토글 버튼
- [ ] `app/layout.tsx`에 ThemeProvider 추가
- [ ] 모든 컴포넌트 다크모드 스타일 확인


### 5. 디자인 다듬기
- [ ] 애니메이션 추가
- [ ] 그라데이션 효과
- [ ] 호버 효과 개선
- [ ] 모바일 반응형 최적화

### 6. 빌드 및 배포 설정
- [ ] `next.config.mjs` 최종 확인
- [ ] GitHub Pages 배포 설정 (또는 Vercel)
- [ ] 빌드 테스트
- [ ] 배포 워크플로우 설정

## 현재 프로젝트 구조

```
yeopto-blog/
├── app/                    # Next.js App Router
│   ├── layout.tsx         ✅
│   ├── page.tsx           ✅
│   ├── posts/[slug]/page.tsx ✅
│   ├── not-found.tsx      ✅
│   └── globals.css        ✅
├── components/
│   ├── ui/                ✅ 기본 UI 컴포넌트
│   ├── common/            ✅ Footer, Introduction
│   └── markdown/          ✅ MarkdownContent
├── features/
│   ├── post/              ✅ Post 관련 컴포넌트, 훅, 유틸
│   └── category/          ✅ Category 관련 컴포넌트, 훅, 유틸
├── lib/
│   ├── design-system/     ✅ tokens.ts
│   ├── markdown/          ✅ getAllPosts, getPostBySlug, parseMarkdown
│   └── utils/             ✅ cn.ts
├── types/                 ✅ post.types.ts, remark-prism.d.ts
├── contents/              ✅ 기존 마크다운 파일들
└── public/                ✅ 정적 파일 (profile-image.png)
```

## 중요한 설정 파일

- `next.config.mjs` - 정적 사이트 생성 (`output: 'export'`)
- `tailwind.config.ts` - 디자인 토큰 통합
- `tsconfig.json` - `src` 폴더 exclude
- `package.json` - 모든 필요한 패키지 설치됨

## 다음 대화 시작 시

1. 이 파일(`NEXT_STEPS.md`)을 참조하여 진행 상황 파악
2. `MIGRATION_PROGRESS.md`도 확인
3. 첫 번째 우선순위 작업(Search Feature)부터 시작

## 참고사항

- SSG 사용 중 (`output: 'export'`)
- Server Component와 Client Component 분리 완료
- 모든 마크다운 파일은 `contents/` 디렉토리에 있음

