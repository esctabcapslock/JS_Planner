# 만들기 계획

## 목적

- 일정 관리하기 (`일정.xlsm`의 대체)
- 각 과정별 세부 정보 페이지 만들어 저장하기 <= 이 부분의 가독성이 떨어지는 문제가 있음
- 최근에 어떤 과정이 있는지 보여주기

## 명칭의 정의

- 과업: 해야 할 거대한 목표 (열에 해당됨)
- 과정: 세부적인 것들 
- 메모: 세부적인 것들 내부에 대한 메몬

## 계획

- 서버 - 클라이언트 구조로 만들기

### 서버
- app.js: 실행하기
- module/db.js: db 관리하는 api
    - db 파일의 관리 (없으면 생성하기)
    - 과업 추가, 수정, 삭제
    - 과업목록 읽기
    - 과정 추가, 수정, 삭제
    - 과정목록 읽기,
    - 과정메모 읽기, 추가, 수정, 삭제
    - 오래된 일정 정리하기

- module/server.js: 클라이언트 - 서버 통신 

### 데이터베이스 구조

#### 각 값의 속성

- image.db, task.db
- 추후 archive_image.db, archive_task.db 만들어서 오래된 것 저장
- 다른 파일은 db/files 폴더에 저장하기 (문서 등등)


- 과업 (task)
    - id
    - 유형 (str)
    - 이름 (str)

- 과정 (process)
    - id
    - 이름 (str)
    - 유형 (str/none)
    - 날짜 (date)
    - 시각 (date/none)
    - 해당되는 과업 id
    - 메모 연결 링크 

- 메모
    - id
    - 해댕되는 과업 id
    - 해당되는 과정 id (int/none)
    - 기록한 글들 (마크다운 기반)
    - 업로드한 사진 등

- 이미지들
    - id
    - 원래 파일명

## 클라이언트

### 메인페이지

- 스프레드시트 형태의 구성
- 가까운 과업 위주로 구성하기
- 빈 셀 클릭: 일정추가
- 그냥 셀 좌클릭: 편집
- 그냥 셀 우클릭: 삭제 할 수 있음

- 아래 창같은게 뜨게 하고,,,
- 편집기는 마크다운 기반(?)으로 하고,
- 이미지 넣을 수 있도록 하기

## 깃헙 업로드
```cmd
git add ./src
git add ./built
git add ./doc
git add ./package.json
git add ./tsconfig.json
git status
```

## 참조
### 타입스크립트
- [ㅅ](https://medium.com/jspoint/typescript-compilation-the-typescript-compiler-4cb15f7244bc)
