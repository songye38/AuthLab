# AuthLab
로그인 기능 마스터해보자!

## 목표
사용자 회원가입, 로그인, 로그아웃 구현

JWT(Json Web Token) 기반 인증

Redis를 활용한 세션(토큰) 관리 및 만료 처리

FastAPI + PostgreSQL + Redis 조합 실습

최소한의 UI (React)에서 로그인 폼과 로그아웃 버튼

## 대략적인 개발 순서
✅ FastAPI 프로젝트 세팅

✅ PostgreSQL에 User 모델 만들기

✅ 회원가입 API 만들기 (비밀번호 해싱 포함)

4. JWT 토큰 발급 & 검증

5. Redis 연동해서 토큰 저장/만료 관리

6. 인증 필요 API 작성 (내 정보 조회)

7. 로그아웃 API (Redis에서 토큰 삭제)

간단한 React 로그인 폼 UI 제작

