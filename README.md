# gifty[yekim]

## 구동시키기 위해 설정해야할 파일

### 1. `.env` 파일

```
NODE_ENV=development
# 서비스 DB [development | test | production] 선택합니다. (현재 development만 구현됨)
COOKIE_SECRET=COOKIE_SECRET
# cookie parser 사용을 위한 SECRET 코드를 입력합니다.
PORT=8080
# 서비스 운영을 위한 PORT를 설정합니다.

KAKAO_CLIENT_SECRET=
# 카카오 개발자 페이지의 REST_API를 등록합니다.
KAKAO_REDIRECT_URI=
# 카카오 개발자 페이지의 REDIRECT_URI를 등록합니다.
JWT_SECRET=
# jwt 토큰 발급을 위한 SECRET 코드를 입력합니다.

DB_USER=
# DB 사용자명을 입력합니다.
DB_NAME=
# DB 명을 입력합니다.
DB_PASSWORD=
# DB 사용자의 비밀번호를 입력합니다.
DB_HOST=localhost
# DB HOST 명을 입력합니다.
DB_DIALECT=mysql
# DB 프로그램 명[ mysql | mariadb | postgres | mssql ]을 입력합니다.
DB_PORT=3306
# DB PORT 번호를 입력합니다.
```
> 참고: 카카오 개발자 페이지의 REST_API는 [카카오 개발자](https://developers.kakao.com/)에서 앱을 만들면 발급받을 수 있습니다.



### 2. `/configs/config.json` 파일
seeder 생성을 위해 설정합니다. (현재, development 부분만 구현되어 있습니다.)

``` json
{
  "development": {
    "username": "DB_접속을_위한_username",
    "password": "DB_접속을_위한_user의_password",
    "database": "서비스를_위해_설정할_DB_이름",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },
  "test": ...,
  "production": ...
}
```

## 구동 방법
1. Sequelize와 연동을 위해 DB 프로그램을 구동시킵니다. (mysql 예시) 
    ``` bash
    $ mysqld_safe&
    ```
2. app을 위해 사용된 모듈들을 설치합니다. (node_modules 생성)
    ``` bash
    $ npm i
    ```
3. app을 구동시킵니다. (seed 데이터 생성시 `npm run-script resetData`)
    ``` bash
    $ npm start
    ```
[참고]
- aws 사용시 서버 포트 포워딩 (localhost:8080 -> domain:80)
  ``` bash
  $ sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
  ```
