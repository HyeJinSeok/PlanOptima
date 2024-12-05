## 1. H2 데이터베이스 서버 실행
   
먼저 H2 데이터베이스를 TCP 서버 모드로 실행해야 합니다.<br>
터미널이나 커맨드 라인에서 다음 명령어를 실행합니다:<br>
java -jar h2*.jar -tcp -tcpAllowOthers -ifNotExists

## 2. 로그인 버튼을 통해 회원가입/로그인 진행

ex) 회원가입 버튼 - 아이디: hyejin / 비밀번호: 000623 / 이름: 석혜진

## 3. 한 유형 당 3개 이상의 스케쥴이 생성되어야 Check 메뉴의 개선하기 기능이 작동합니다.


## 4. 미완성된 기능

1) Member마다 고유한 Weight 및 weightHistory DB를 갖지 않고, DB가 통합된 상태. (보완 예정)

2) taskType 클래스의 calculateAdjustedTime 메서드가 임의로 정의된 상태. (수식 보완 예정)

3) Cabinet 메뉴의 병합하기 기능 (차트 보완 예정)

