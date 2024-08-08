# DIV2CSU &middot; [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build and Deploy to Netlify](https://github.com/div2csu/DIV2CSU/actions/workflows/production_build.yml/badge.svg)](https://github.com/div2csu/DIV2CSU/actions/workflows/production_build.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/div2csu/DIV2CSU/pulls)

**DIV2CSU**는 대한민국 군대 내 종이로 되어있던 아날로그식 일처리를 일정 부분 디지털화 시킨 웹사이트입니다. 보안법에 저촉될 위험이 있는 정보들을 다루기 보다는 상점, 동아리 및 용사 관리 위주등에 초점을 맞추고 있습니다.

- **상점 관리** (용사 상점 신청 및 간부 상점 승인 등...)

DIV2CSU는 제2신속대응사단 예하 부대 동아리 **Keyboard Warrior**에 의해 제작되었습니다.

## 📋 Tech Stack

- 웹프레임워크: [NextJS](https://nextjs.org/)
- 데이터베이스: [PostgreSQL](https://postgresql.org/)
- SQL Query Builder: [Kysely](https://kysely.dev/)
- 데이터베이스 Schema 관리: [Prisma](https://www.prisma.io/)
- Styling: [Tailwindcss](https://tailwindcss.com/), [Ant Design](https://ant.design/)


## 🎉 웹사이트 Deploy
### 설치 및 Build
```
yarn install
yarn build
```

### 웹사이트가 구동되기 위해 다음 .env 파일이 필요합니다
```
POSTGRES_URL="<POSTGRES_CONNECTION_STRING>"
JWT_SECRET_KEY="<COMPLEX_RANDOM_STRING>"
```

## 👏 How to contribute

DIV2CSU는 오픈소스 웹사이트로, 부대에 적용하고 싶거나 개발에 기여하고 싶으시면 PR 열어주시면 됩니다. 그 외 기타 이슈나 피드백 제안은 아래를 참고해주시면 됩니다.

### 이슈 제보 및 피드백 제안

이슈 또는 피드백은 [다음](https://github.com/div2csu/DIV2CSU/issues)에 제보 부탁드립니다.


## 📄 License

DIV2CSU는 [MIT License](https://github.com/div2csu/DIV2CSU/blob/main/LICENSE)로 자유롭게 이용하시면 됩니다.

