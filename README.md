# 👨‍💻 Developer Pacemaker 👩‍💻

## 개발자를 위한 학습 도우미(플래너) → http://00.000.000.000

### 🏆 SeSAC(청년취업사관학교) 풀스택 웹개발 부트캠프 3차 팀프로젝트 우수상 수상작

![image](https://github.com/Soonmo97/Developer-Pacemaker-server/assets/154948606/7a320fc3-94e7-405e-91e3-f3f7031cfc72)

![image](public/images/calendar.png)

### 작업 기간: 2024.05.31. ~ 2024.06.21.

### 인원: 5명(프론트엔드 2명, 백엔드 3명)

### 로그인:

- ID: `test@test.com`
- PW: `1234`

## 📖 Description

혼자 외롭게 공부하는 개발자를 위해 "페이스 메이커"를 만들어주기 위한 공간 제공합니다.

다른 사람들과 공통 목표를 설정할 수 있는 스터디그룹을 형성해서 시너지 효과를 기대합니다.

비슷한 학습 목표를 가진 사람들과 함께 공부하고 싶은 개발자 지망생을 위한 서비스입니다.

학습 플래너를 활용해서 체계적으로 기록하며 공부하고 싶은 사람들을 위한 서비스입니다.

## :baby_chick: Demo

시연영상

## ⭐ Main Feature

### 메인 페이지

- react-slick 라이브러리 , react-calendar 라이브러리를 사용해 슬라이드, 달력 구현

### 스터디그룹 관리

- 스터디그룹 CRUD(그룹장 권한)
- 그룹장 권한 확인을 위해 요청에 담긴 시퀀스와 로그인(토큰) 시퀀스 비교
- 스터디그룹에 그룹장 시퀀스로 그룹장 관리

###

### 회원가입 및 로그인

- jwt토큰 및 bcrypt 사용
- 이메일 및 닉네임 중복체크

### 소셜 로그인 구현(카카오)

- 카카오 OAuth2.0 토큰 발급 및 사용자 정보 요청
- 사용자 인증 후 jwt토큰 발급으로 로그인 처리
-

### Chat-GPT API 연결

-
-

### 학습 플래너 관리

-
-
-

## 🔧 Stack(Library&Framwork etc)

- **Front-end**: React
- **back-end** : Java, Spring boot
- **Database** : AWS RDS (Mysql)
- **ORM** : JPA
- **Deploy**: AWS EC2

## :open_file_folder: Project Structure

```markdown
frontend
├── public
│   ├── images
├── src
├── components
   └── pages
   └── store
   └── utils
├── App.tsx
|\_\_ index.tsx

backend
├── config
├── controller
├── dto
├── entity
├── repository
├── security
|\_\_ service
```

## 👨‍💻 Role & Contribution

![image](https://github.com/Soonmo97/Developer-Pacemaker-server/assets/154948606/820b7cb1-30c4-446b-8dbf-f9f9171b1f1a)
![image](https://github.com/Soonmo97/Developer-Pacemaker-server/assets/154948606/99e56f74-f39d-4902-afc2-026b923db2fc)

## 👨‍👩‍👧‍👦 Developer

- **권오진** (깃허브 주소)
- **권태현** (https://github.com/Matryoshkaaaa)
- **권순모** (https://github.com/Soonmo97)
- **김화영** (깃허브 주소)
- **이형석** (깃허브 주소)
