<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A comprehensive e-commerce platform built with <a href="https://nestjs.com/">NestJS</a></p>
    <p align="center">
<a href="https://nestjs.com" target="_blank"><img src="https://img.shields.io/badge/nestjs-v10-red" alt="NestJS Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This project is a robust e-commerce solution developed using the [Nest](https://github.com/nestjs/nest) framework. It provides a scalable and efficient backend for managing online stores, handling product catalogs, user authentication, shopping carts, order processing, and payment integration. Leveraging NestJS's modular architecture, this platform offers a solid foundation for building feature-rich e-commerce applications with TypeScript.

Key features include:
- Product management system
- User authentication and authorization
- Shopping cart functionality
- Order processing and management
- Payment gateway integration
- RESTful API for seamless frontend integration

## Built with
- <a href='https://nestjs.com/' target="_blank"><img alt='nestjs' src='https://img.shields.io/badge/nestjs-100000?style=for-the-badge&logo=nestjs&logoColor=FFFFFF&labelColor=FF0000&color=FF0000'/></a>
- <a href='https://www.prisma.io/' target="_blank"><img alt='Prisma' src='https://img.shields.io/badge/Prisma-100000?style=for-the-badge&logo=Prisma&logoColor=FFFFFF&labelColor=4687FA&color=4687FA'/></a>
- <a href='https://jwt.io/' target="_blank"><img alt='jsonwebtokens' src='https://img.shields.io/badge/Jsonwebtoken-100000?style=for-the-badge&logo=jsonwebtokens&logoColor=FFFFFF&labelColor=FFA60D&color=FFA60D'/></a>

## Installation
Clone the repository
```bash
git clone https://github.com/nduongg04/e-commerce-api.git
```
Switch to the repo folder
```bash
cd e-commerce-api
```
Install dependencies
```bash
npm install
```
Create your .env file with the following variables
```env
#APP
APP_PORT=

#DATABASE
DATABASE_URL=

#JWT
JWT_ACCESS_TOKEN_SECRET=
JWT_REFRESH_TOKEN_SECRET=
JWT_ACCESS_TOKEN_EXPIRATION_TIME=
JWT_REFRESH_TOKEN_EXPIRATION_TIME=
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Database
<p>(Click on the following image to reach the database schema)</p>
<a href="https://dbdiagram.io/d/66ff75b0fb079c7ebd4d729f">
<img src="https://i.postimg.cc/xTNHVpmN/Untitled.png" alt="Database schema" width="50%" />
</a>

## License

This project is [MIT licensed](LICENSE).
