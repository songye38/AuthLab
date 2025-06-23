
### 폴더구조
/frontend
│
├── public/                     # 정적 자원 (이미지, favicon 등)
│
├── src/                        # Next.js 13+ 권장 src 폴더
│   ├── app/                    # 앱 라우팅 폴더 (pages 대신 사용 가능)
│   │   ├── auth-method-1/      # 방법1 로그인 페이지 및 컴포넌트 (예: JWT)
│   │   ├── auth-method-2/      # 방법2 로그인 페이지 및 컴포넌트 (예: 세션)
│   │   ├── auth-method-3/      # 방법3 로그인 페이지 및 컴포넌트 (예: OAuth)
│   │   ├── common/             # 공통 컴포넌트 (버튼, 입력창 등)
│   │   ├── layout.tsx          # 전역 레이아웃 파일
│   │   └── page.tsx            # 기본 홈 페이지
│   │
│   ├── components/             # 범용 컴포넌트 (모달, 알림 등)
│   ├── hooks/                  # 커스텀 훅 (인증 상태, 폼 핸들링 등)
│   ├── styles/                 # Tailwind 커스텀 스타일 및 글로벌 CSS
│   │   └── globals.css         # 글로벌 스타일 파일
│   ├── utils/                  # 유틸 함수 모음 (API 호출, 데이터 가공 등)
│   └── context/                # 인증 상태관리 Context
│
├── tailwind.config.js          # Tailwind 설정 파일
├── postcss.config.js           # PostCSS 설정 파일
├── next.config.js              # Next.js 설정 파일 (필요 시)
├── package.json                # 프로젝트 의존성 및 스크립트
└── tsconfig.json               # 타입스크립트 설정 파일



### 설명
- src/app/auth-method-1 이런 식으로 인증 방식별로 폴더 나눠서 페이지와 관련 컴포넌트, 스타일 모두 관리
- common 폴더는 여러 인증 방식에서 공통으로 쓰는 UI 컴포넌트나 버튼, 폼 요소 등
- **components**는 앱 전역에서 쓸 수 있는 모달, 알림, 네비게이션 같은 범용 컴포넌트 분리
- **hooks**는 로그인 상태, API 호출 등을 위한 커스텀 훅 모음
- **context**는 인증 관련 React Context 구현해 로그인 상태 전역 관리
- styles 폴더에 Tailwind 커스터마이징 css 파일 두고 전역 스타일 작성

