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
<!--
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
-->

### AWS 이용
- AWS에 가입해 서버를 호스팅해보자
- 회원가입 (04.01) 완료

<!--
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
- 가까운 과업 위주로 정렬하여 보여주기
- 빈 셀 클릭: 일정추가
- 그냥 셀 좌클릭: 메모열기
- 그냥 셀 우클릭 or 더블클릭: 편집 or 삭제할 수 있는 contextmenu가 열림
- 하나의 과정에 여러 메모가 연동됨

- 아래 창같은게 뜨게 하고,,,
- 편집기는 마크다운 기반(?)으로 하고,
    - 실시간 동시 편집 구현을 목표로 하자
    - socket.io or 직접구현 유력
- 이미지, 필기내용 넣을 수 있도록 하기
-->
## 깃헙 업로드
```cmd
git add ./src
git add ./built
git add ./doc
git add ./public
git add ./package.json
git add ./tsconfig.json
git add ./README.md
git status
git commit -m "context 메뉴 만듦 + 수정기능 일부 만듦"
git push origin master
```
## 콘솔에서 실행
```cmd
tsc; node built/app    
```

## 참조
### 타입스크립트
- [컴파일러](https://medium.com/jspoint/typescript-compilation-the-typescript-compiler-4cb15f7244bc)
- [TS 전반](https://joshua1988.github.io/ts/guide/interfaces.html)
- [postgres 모듈](https://www.npmjs.com/package/postgres)


## 서비스 구조

- 암호화해서 보관
- *개인 데이터는 서버에서 무결성 검증 안 할 것*
    - 프론트엔드 코드 틀리면 데이터 날라감
        - XSS, 중간자 공격 등에 취약
    - 서버는 유저의 내용을 알기 힘들다.
    - *모두 백업* 기능을 만들것

### AWS RDS 데이터베이스
- 암호화해서 보관
- 암호화된 내용은 _ 붙이기
- 그냥 body 속성을 만든 뒤, 그 안에 json같은 형식을 저장

- 과업 (task)
    - id
    - userId
    - _유형 (str)
    - _이름 (str)

- 과정 (process)
    - id
    - userId
    - 알림시각 (date/none) 안내 메시지 발송용 시각.
    - _이름 (str)
    - _유형 (str/none)
    - _시작일시 (date)
    - _시작시각 (bool) -> 정확한 시각을 표시한 경우
    - _종료일시 (date/none)
    - _종료시각 (bool)
    - _taskId

- 메모
    - id
    - userId (삭제를 위함)
    - _기록한 글들 (마크다운 기반)

- 파일(이미지 포함)
    - filename
    - userId  (삭제 위함)
    - file_size (사용자별 사용량 측정하기 위함)

- 유저
    - userId
    - email
        - 특정 도메인만 허용
    - encrypted_pw
    - 인증 여부




### E2C 서버 - 클라이언트 로직구성
- 최대한 restFull하게 구성
- https위에서 전송되므로 암호화는 구성하지 않는다.

- 회원가입
    - 입력값
        - email
        - pw
    - 전송값
        - email
        - SHA512(pw)
        - SHW512('info'+pw)

    - 서버 생성값
        - 고유한 userID 생성할 것
        - 인증 여부 = true일 경우
            - 파일에 [받은 info file 이름].csv, setting.json 파일 생성
            - 클라이언트의 요청으로 생기게 함
        - taskId, startDate, endDate 순으로 구성됨

    - 이메일 인증 관련
        - txt 파일 만들기
        - userId - 생성일시 - 인증 key로 생성
        - 간단한 숫자 6자리 정도로 설정.
        - 시간 지난 피일은 자동 삭제.


- 로그인
     입력값
        - email
        - pw
    - 전송값
        - email
        - SHA512(pw)
    - 2-facter 인증 지원시, 이메일 코드 입력해야 함.
    - 세션
        - key - userId - date 순으로
        - 시간 제한 둘 것
        - 서버 작으므로 세션 방식이 충분하고 안정적일것.

- 이메일 주소 변경

- 읽어버린 비번 찾기
    - 내용물 못 찾음

- 회원 탈퇴

- 메인페이지 접속
    - 로그인 하기.
    - 성공 가정
    - task 총 목록 요청
    - setting.json 요청하기
    - [받은 info file 이름].csv 요청
        - 이를 바탕으로 process 요청
        - 1달 이내로 보여주기

    - 파일에 대해 CRUD 모두 가능하게 하기.
    - task는 pw 기반으로 암호화하기.
    - process는 pw 기반을 바탕으로 한 무언가로 하기
    
### 클라이언트 로직구성

- 임시 저장 피일 - process 날짜가 적혀있음 - 쓸모없는거 안가져옴
```js
data = {
    processId:date,
    processId:date,
    ...
}
```

- 전체 task 목록을 가져옴 (GET /a/task)
- 전체 process 목록을 가져옴 (POST /a/process/, body에 리스트 전달 include or exclude=[1,3,4,34,56,466])
- 쓸모없는 process는 삭제토록 함.
- 이를 바탕으로 GUI 생성
    - task CRUD 기능
    - process CRUD 기능

## QOS
- 같은 ip, user agent에서 같은 페이지 초당 5회 이상
    - 1분 차단
- 같은 ip 초당 30회 이상
    - ip 1시간 차단
- admin으로 들어와서 해제
- abstract class block(until:date)
- class blockedIP(ip:IP)
- class blockedAgent(agent:string)

## 할일

<!-- 1. 먼저 db 속성 수정하기 -->
2. 그리고 위에 표시된 순으로 api 만들기 확인
3. 그리고 클라이언트 작성
4. QOS 만들기
5. 빌드
