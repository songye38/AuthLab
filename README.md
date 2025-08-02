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

✅ JWT 토큰 발급 & 검증

✅ Redis 연동해서 토큰 저장/만료 관리

6. 인증 필요 API 작성 (내 정보 조회)

7. 로그아웃 API (Redis에서 토큰 삭제)

간단한 React 로그인 폼 UI 제작

## 추후 개발
1. Postman으로 토큰 테스트
→ 받은 토큰을 Authorization 헤더에 넣고,
Bearer <토큰> 이렇게 보내서 보호된 API 호출해봐!

2. 토큰 만료 확인
→ ACCESS_TOKEN_EXPIRE_MINUTES = 30 이니까
30분 지나면 401 에러 나는지도 나중에 실험해봐.

3. Refresh Token 만들기 (옵션)
→ 지금은 Access Token만 있으니까,
로그인 유지하고 싶다면 Refresh Token도 설계할 수 있어.

4. Redis 연결 테스트
→ 로그인한 유저 정보 캐싱하거나,
로그아웃 시 토큰 블랙리스트 관리도 Redis로 가능해!

