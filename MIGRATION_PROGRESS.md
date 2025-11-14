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

### 3. 기본 UI 컴포넌트 개발 (다음 작업)

- [ ] `components/ui/Button.tsx` - 버튼 컴포넌트
- [ ] `components/ui/Card.tsx` - 카드 컴포넌트
- [ ] `components/ui/Typography.tsx` - 타이포그래피 컴포넌트
- [ ] `components/ui/Badge.tsx` - 배지 컴포넌트
- [ ] `components/ui/Input.tsx` - 입력 필드 컴포넌트
- [ ] `components/ui/Avatar.tsx` - 아바타 컴포넌트
- [ ] `components/ui/Divider.tsx` - 구분선 컴포넌트
- [ ] `components/ui/Container.tsx` - 컨테이너 컴포넌트

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
