# 🧭 LiveTrip

> LiveTrip은 여행 호스트가 자신만의 체험을 등록하고, 참가자들이 이를 예약할 수 있는 **체험 기반 여행 플랫폼**입니다.  
> Next.js와 TypeScript를 기반으로 제작되었으며, 직관적인 UI와 안정적인 데이터 관리에 초점을 두었습니다.

---

## 🧱 기술 스택 (Tech Stack)

| Category | Tech |
|-----------|------|
| **Frontend** | Next.js 15.5.9, React 19.1.0, TypeScript |
| **State / Data** | TanStack React Query |
| **Form Management** | React Hook Form |
| **Authentication** | NextAuth (Credential + Kakao OAuth) |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Build / Deploy** | Vercel |
| **Tools** | ESLint, Prettier, GitHub Actions |

---

## 📁 폴더 구조 (Project Structure)
**도메인 주도 폴더 설계(Domain-driven structure)**  
```bash
src/
├── api/                # 전역 API 설정 (Fetch 인터셉터, 공통 쿼리 스트링 생성 등)
├── app/                # Next.js App Router (Routing, Layout, Route Handlers)
│   ├── (with-header)/  # 헤더 레이아웃이 포함된 페이지 그룹
│   │   ├── (home)/     # 홈 및 검색 결과 페이지
│   │   ├── (with-sidemenu)/ # 사이드메뉴가 포함된 대시보드 페이지 그룹
│   │   └── registration/ # 체험 등록 페이지
│   ├── api/            # Route Handlers (Auth, Kakao, Upload 등)
│   ├── auth/           # 로그인/회원가입 레이아웃 및 페이지
│   └── globals.css     # 전역 스타일 설정
├── components/         # 공통 UI 컴포넌트 (Domain-agnostic)
│   ├── button/         # 공통 버튼 (Arrow, Default)
│   ├── dialog/         # 모달, 바텀시트 시스템
│   ├── dropdown/       # 선택창 컴포넌트
│   ├── header/         # 공통 헤더 및 네비게이션
│   ├── toast/          # 전역 알림(Toast) 시스템
│   └── ui/             # 기타 원자 단위 UI 컴포넌트 (Input, Spinner, Star 등)
├── domain/             # 비즈니스 도메인별 핵심 로직 (핵심 계층)
│   ├── activity/       # 체험(Activity) 관련 도메인
│   │   ├── actions/    # Server Actions (등록, 삭제 등)
│   │   ├── api.ts      # 도메인 전용 API 호출 함수
│   │   ├── components/ # 체험 도메인 전용 컴포넌트 (List, Card, Form 등)
│   │   ├── hooks/      # 체험 관련 커스텀 훅 (Service, Data Fetching)
│   │   └── utils/      # 도메인 전용 유틸 (Query Options 등)
│   ├── reservation/    # 예약(Reservation) 관련 도메인
│   │   ├── actions/    # 승인, 거절 등 서버 액션
│   │   ├── components/ # 예약 현황 캘린더, 상태 배지 등
│   │   └── hooks/      # 예약 데이터 처리 훅
│   └── user/           # 사용자(User) 및 인증 도메인
│       ├── components/ # 로그인/회원가입 폼, 프로필 수정 폼
│       ├── queries/    # 사용자 정보 및 프로필 수정 Mutate 훅
│       └── utils/      # 인증 관련 유틸 (Auth Helper)
├── hooks/              # 전역 공통 커스텀 훅 (Infinite Scroll, Observer 등)
├── types/              # 전역 타입 정의 (외부 SDK 등)
├── utils/              # 전역 유틸리티 함수
│   └── react-query/    # React Query 설정 및 Provider (Dehydration)
├── middleware.ts       # 인증 및 접근 제한 미들웨어
└── next.d.ts           # Next.js 타입 확장
```

---

## ✨ 주요 기능 (Features)

### 🧩 회원가입 & 로그인
- **NextAuth** Credential Provider를 이용해 자체 로그인/회원가입 구현  
- **Kakao OAuth** 연동을 통한 간편 회원가입 지원  
- 회원가입 시 **React Hook Form + 클라이언트 유효성 검증** 적용  
- 회원가입 완료 후 **자동 로그인 및 세션 유지**

### 👤 프로필 수정 (Profile Edit)
- **React Query Mutation**을 활용한 실시간 수정 반영  
- **프로필 이미지 업로드** 시 `URL.createObjectURL()`로 즉시 미리보기 제공  
- **서버 URL로 자동 교체**하여 불필요한 재업로드 방지  

### 🧾 체험 등록 (Experience Registration)
- `FormProvider` + `useFormContext`로 복잡한 폼 구조 관리  
- `useState`로 **동적 일정(TimeSlot)** 추가/삭제 기능 구현  
- **이미지 업로드 훅**(`useBannerImageUpload`, `useIntroImageUpload`)으로 비동기 업로드 + 미리보기  
- `useLeaveGuard` 훅으로 페이지 이탈 시 데이터 손실 방지  

---

## 🔌 API 연동 (API Integration)

| 기능 | Method | Endpoint | 설명 |
|------|---------|-----------|------|
| 회원가입 | `POST` | `/auth/signup` | 이메일/비밀번호 회원가입 |
| 로그인 | `POST` | `/auth/signin` | 자격증명 로그인 |
| 카카오 로그인 | `GET` | `/auth/kakao` | Kakao OAuth 인증 |
| 프로필 수정 | `PATCH` | `/profile` | 닉네임 / 이미지 변경 |
| 체험 등록 | `POST` | `/activities` | 새 체험 생성 |
| 체험 수정 | `PATCH` | `/activities/{id}` | 체험 내용 변경 |
| 이미지 업로드 | `POST` | `/upload` | S3 업로드 및 URL 반환 |

> ⚙️ API 연동은 **React Query + custom fetch wrapper**로 구성되어 있으며,  

---

## 👥 팀 & 역할 (Team)

| 이름 | 역할 | 주요 담당 | GitHub |
|------|------|-----------|-----|
| **권수형** | Frontend Developer | 홈, 프로필, 로그인/ 회원가입 | [Ospac](https://github.com/Ospac) |
| **박서현** | Frontend Developer | 체험 상세, 예약현황 | [urapp13ofmyeye](https://github.com/urapp13ofmyeye) |
| **안연정** | Frontend Developer | 예약 내역, 내 체험 관리 | [aNN-algorithm](https://github.com/aNN-algorithm) |
| **이승현** | Frontend Developer | 체험 등록/수정 | [sseung30](https://github.com/sseung30) |
