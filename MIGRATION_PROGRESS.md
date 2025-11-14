# Next.js 마이그레이션 진행 상황

## 완료된 작업

### 1. 프로젝트 초기 설정 ✅

- [x] `package.json` - Next.js 14, ESLint 9, 필요한 패키지들 설정
- [x] `tsconfig.json` - TypeScript strict mode 설정
- [x] `next.config.mjs` - 정적 사이트 생성 설정 (`output: 'export'`)
- [x] `postcss.config.mjs` - PostCSS 설정
- [x] `tailwind.config.ts` - Tailwind CSS 설정 (다크모드 지원)
- [x] `eslint.config.mjs` - ESLint 9 Flat Config 설정
- [x] `.prettierrc` - Prettier 설정 (탭 사용)
- [x] `.gitignore` - Git ignore 설정

### 주요 설정 내용

#### 패키지 매니저

- **pnpm** 사용

#### ESLint 설정

- ESLint 9.17.0
- Flat Config 형식 (`eslint.config.mjs`)
- `@typescript-eslint` 8.18.2
- `@next/eslint-plugin-next` 사용 (eslint-config-next 대신)
- `eslint-plugin-react`, `eslint-plugin-react-hooks` 최신 버전
- `sourceType: 'module'` - 모든 파일을 ES module로 처리

#### Next.js 설정

- App Router 사용
- 정적 사이트 생성 (`output: 'export'`)
- 이미지 최적화 비활성화 (정적 사이트용)
- `trailingSlash: true`

#### TypeScript 설정

- Strict mode 활성화
- Path alias 설정:
  - `@/*` → `./*`
  - `components/*` → `./components/*`
  - `lib/*` → `./lib/*`
  - `features/*` → `./features/*`

### 2. 디자인 시스템 토큰 정의 ✅

- [x] `lib/design-system/tokens.ts` 생성
  - 색상 팔레트 (라이트/다크)
  - 타이포그래피 스케일
  - 간격(spacing)
  - 그림자(shadows)
  - 트랜지션 설정
  - z-index 레이어
- [x] `app/globals.css` 생성
  - CSS 변수로 디자인 토큰 적용
  - 다크모드 CSS 변수
  - 그라데이션 유틸리티
  - 애니메이션 키프레임
  - 코드 블록 스타일
  - 스크롤바 커스터마이징
- [x] `tailwind.config.ts` 업데이트
  - 디자인 토큰을 Tailwind에 통합
  - 커스텀 색상, 그림자, 트랜지션 추가

## 다음 단계

### 3. 기본 UI 컴포넌트 개발 ✅

- [x] `lib/utils/cn.ts` - 클래스명 병합 유틸리티
- [x] `components/ui/Button.tsx` - 버튼 컴포넌트 (variants: primary, secondary, outline, ghost / sizes: sm, md, lg)
- [x] `components/ui/Card.tsx` - 카드 컴포넌트 (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- [x] `components/ui/Typography.tsx` - 타이포그래피 컴포넌트 (h1-h6, body, body2, caption, overline)
- [x] `components/ui/Badge.tsx` - 배지 컴포넌트 (variants: default, primary, secondary, success, warning, error)
- [x] `components/ui/Input.tsx` - 입력 필드 컴포넌트
- [x] `components/ui/Avatar.tsx` - 아바타 컴포넌트 (sizes: sm, md, lg, xl)
- [x] `components/ui/Divider.tsx` - 구분선 컴포넌트 (horizontal, vertical)
- [x] `components/ui/Container.tsx` - 컨테이너 컴포넌트 (sizes: sm, md, lg, xl, full)
- [x] `components/ui/index.ts` - 컴포넌트 export 파일
- [x] `package.json` - clsx, tailwind-merge 패키지 추가

## 다음 단계

### 4. 마크다운 처리 시스템 구축 ✅

- [x] `types/post.types.ts` - Post 타입 정의 (Gatsby 타입에서 Next.js 타입으로 변환)
- [x] `lib/markdown/getAllPosts.ts` - 모든 포스트 메타데이터 추출 (재귀적으로 마크다운 파일 찾기)
- [x] `lib/markdown/getPostBySlug.ts` - 특정 포스트 내용 추출 및 HTML 변환
- [x] `lib/markdown/parseMarkdown.ts` - 마크다운 파싱 유틸리티
- [x] `components/markdown/MarkdownContent.tsx` - 마크다운 렌더링 컴포넌트 (prose 스타일)
- [x] `package.json` - @tailwindcss/typography 플러그인 추가
- [x] `tailwind.config.ts` - typography 플러그인 설정

## 다음 단계

### 5. Post Feature 구현 ✅

- [x] `features/post/utils/postUtils.ts` - 읽기 시간 계산, 날짜 포맷팅, 상대 시간 포맷팅
- [x] `features/post/components/PostCard.tsx` - 포스트 카드 컴포넌트 (썸네일, 제목, 요약, 카테고리, 날짜, 읽기 시간)
- [x] `features/post/components/PostList.tsx` - 포스트 리스트 (그리드 레이아웃, 반응형)
- [x] `features/post/components/PostHeader.tsx` - 포스트 헤더 (제목, 날짜, 카테고리, 읽기 시간)
- [x] `features/post/components/PostContent.tsx` - 포스트 본문 (썸네일 + 마크다운 콘텐츠)
- [x] `features/post/components/RelatedPosts.tsx` - 관련 포스트 추천 컴포넌트
- [x] `features/post/hooks/usePostList.ts` - 포스트 리스트 로직 (카테고리 필터링, 검색)
- [x] `features/post/hooks/usePost.ts` - 단일 포스트 로직 (Client Component용)
- [x] `features/post/index.ts` - 모든 컴포넌트, 훅, 유틸리티 export

## 다음 단계

### 6. Category Feature 구현 ✅

- [x] `features/category/utils/categoryUtils.ts` - getAllCategories 함수 (카테고리명: 포스트 개수 매핑)
- [x] `features/category/hooks/useCategories.ts` - useCategories 훅 (카테고리 목록과 통계 반환)
- [x] `features/category/components/CategoryFilter.tsx` - 카테고리 필터 컴포넌트 (Badge 기반, URL 쿼리 파라미터 연동)
- [x] `features/category/index.ts` - 모든 컴포넌트, 훅, 유틸리티 export

## 다음 단계

### 7. 페이지 구현 (다음 작업)

- [ ] `app/layout.tsx` - 루트 레이아웃 (메타데이터, 폰트, 다크모드 설정)
- [ ] `app/page.tsx` - 홈 페이지 (포스트 리스트, 카테고리 필터)
- [ ] `app/posts/[slug]/page.tsx` - 포스트 상세 페이지
- [ ] `app/not-found.tsx` - 404 페이지

## 참고 사항

### 파일 구조

```
yeopto-blog/
├── app/                    # (아직 생성 안 됨)
├── components/             # (아직 생성 안 됨)
├── features/               # (아직 생성 안 됨)
├── lib/                    # (아직 생성 안 됨)
├── contents/               # 기존 마크다운 파일 유지
├── public/                 # 정적 파일
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

### 중요한 결정 사항

1. **패키지 매니저**: pnpm 사용
2. **ESLint**: 9.x 버전, Flat Config 사용
3. **설정 파일**: `.mjs` 확장자 사용 (ES module)
4. **코드 스타일**: 탭 사용 (`useTabs: true`)

### 다음 대화 시작 시

이 문서를 참조하여 진행 상황을 파악하고 다음 단계를 진행하세요.
