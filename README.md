# 🧭 LiveTrip

> LiveTrip은 여행 호스트가 자신만의 체험을 등록하고, 참가자들이 이를 예약할 수 있는 **체험 기반 여행 플랫폼**입니다.  
> Next.js와 TypeScript를 기반으로 제작되었으며, 직관적인 UI와 안정적인 데이터 관리에 초점을 두었습니다.

---

## 🧱 기술 스택 (Tech Stack)

| Category | Tech |
|-----------|------|
| **Frontend** | Next.js (App Router), React, TypeScript |
| **State / Data** | TanStack React Query |
| **Form Management** | React Hook Form |
| **Authentication** | NextAuth (Credential + Kakao OAuth) |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Build / Deploy** | Vercel |
| **Tools** | ESLint, Prettier, GitHub Actions |

---

## 📁 폴더 구조 (Project Structure)

```bash
src/
 ├── app/                     # Next.js App Router pages
 │   ├── auth/                # 로그인/회원가입
 │   ├── profile/             # 프로필 페이지
 │   └── registration/        # 체험 등록 / 수정
 │
 ├── domain/
 │   ├── auth/                # 인증 관련 로직 (NextAuth)
 │   ├── profile/             # 프로필 폼 & 훅
 │   ├── registration/        # 체험 등록 폼, 이미지 업로드, leave guard 등
 │   └── common/              # 재사용 UI 컴포넌트
 │
 ├── hooks/                   # 커스텀 훅 (useLeaveGuard 등)
 ├── components/              # 전역 UI (Button, Input 등)
 └── lib/                     # 유틸 함수, fetch API 등
```

> 💡 **도메인 단위 구조(Domain-driven structure)**  
> 기능별로 폴더를 분리하여 유지보수성과 협업 효율을 높였습니다.

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
> 모든 요청은 **Bearer Token 기반 인증**을 사용합니다.

---

## 👥 팀 & 역할 (Team)

| 이름 | 역할 | 주요 담당 |
|------|------|-----------|
| **권수형** | Frontend Developer | 홈, 프로필, 로그인/ 회원가입 | [Ospac](https://github.com/Ospac) |
| **박서현** | Frontend Developer | 체험 상세, 예약현황 | [urapp13ofmyeye](https://github.com/urapp13ofmyeye) |
| **안연정** | Frontend Developer | 예약 내역, 내 체험 관리 | [aNN-algorithm](https://github.com/aNN-algorithm) |
| **이승현** | Frontend Developer | 체험 등록/수정 | [sseung30](https://github.com/sseung30) |
