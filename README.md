# 📦 Node.js + Express + TypeScript — Modular Backend Starter Pack

## Node v12.12.0

A **fully scalable, production-ready backend starter template** built with **Node.js**, **Express**, and **TypeScript**, following a **clean modular architecture** and real-world industry practices.

This project is designed to serve as a **solid foundation** for small to large-scale backend systems, including authentication, payments, real-time features, security, and third-party integrations.

```txt
│   .dockerignore
│   .env.sample
│   .gitignore
│   Dockerfile
│   eslint.config.js
│   make.cmd
│   package-lock.json
│   package.json
│   prisma.config.ts
│   README.md
│   Stripe.md
│   tsconfig.json
│
├───.vscode
│       settings.json
│
├───prisma
│   │   enums.prisma
│   │   schema.prisma
│   │
│   └───schema
│           payment.prisma
│           user.prisma
│           waitingList.prisma
│
├───scripts
│       makeModule.ts
│
└───src
    │   app.ts
    │   server.ts
    │
    ├───app
    │   │   constants.ts
    │   │
    │   ├───cache
    │   │       sse.ts
    │   │
    │   ├───config
    │   │       index.ts
    │   │
    │   ├───errors
    │   │       apiError.ts
    │   │
    │   ├───middlewares
    │   │       auth.ts
    │   │       globalErrorHandler.ts
    │   │       multerErrorHandler.ts
    │   │       multerFileUpload.ts
    │   │       notFound.ts
    │   │       validateRequest.ts
    │   │
    │   ├───modules
    │   │   ├───auth
    │   │   │       auth.controller.ts
    │   │   │       auth.route.ts
    │   │   │       auth.service.ts
    │   │   │
    │   │   ├───dashboard
    │   │   │       dashboard.controller.ts
    │   │   │       dashboard.interface.ts
    │   │   │       dashboard.route.ts
    │   │   │       dashboard.service.ts
    │   │   │       dashboard.utils.ts
    │   │   │       dashboard.validations.ts
    │   │   │
    │   │   ├───mail
    │   │   │       mail.controller.ts
    │   │   │       mail.interface.ts
    │   │   │       mail.route.ts
    │   │   │       mail.service.ts
    │   │   │       mail.utils.ts
    │   │   │       mail.validations.ts
    │   │   │
    │   │   ├───payments
    │   │   │       payments.controller.ts
    │   │   │       payments.interface.ts
    │   │   │       payments.route.ts
    │   │   │       payments.service.ts
    │   │   │       payments.utils.ts
    │   │   │       payments.validations.ts
    │   │   │
    │   │   ├───serveFile
    │   │   │       serveFile.controller.ts
    │   │   │       serveFile.interface.ts
    │   │   │       serveFile.route.ts
    │   │   │       serveFile.service.ts
    │   │   │       serveFile.utils.ts
    │   │   │       serveFile.validations.ts
    │   │   │       temp.html
    │   │   │
    │   │   ├───user
    │   │   │       user.controller.ts
    │   │   │       user.route.ts
    │   │   │       user.service.ts
    │   │   │       user.validation.ts
    │   │   │
    │   │   └───waitingList
    │   │           waitingList.controller.ts
    │   │           waitingList.route.ts
    │   │           waitingList.service.ts
    │   │           waitingList.validation.ts
    │   │
    │   ├───prisma
    │   │       prisma.ts
    │   │
    │   ├───routes
    │   │       index.ts
    │   │
    │   ├───static
    │   │       1_LOGO.png
    │   │       3_facebook2x.png
    │   │       4_twitter2x.png
    │   │       5_linkedin2x.png
    │   │       6_instagram2x.png
    │   │       Auth.png
    │   │
    │   ├───template
    │   │   │   links.ts
    │   │   │
    │   │   ├───resetPassword
    │   │   │       resetPassword.html
    │   │   │       resetPassword.ts
    │   │   │
    │   │   └───verifyEmail
    │   │           verifyEmail_Code.html
    │   │           verifyEmail_Code.ts
    │   │           verifyEmail_Link.html
    │   │           verifyEmail_Link.ts
    │   │
    │   └───utils
    │           catchAsync.ts
    │           emailSender.ts
    │           fileUploaderToS3.ts
    │           JwtHelper.ts
    │           passTsValidation.ts
    │           QueryBuilder.ts
    │           sendResponse.ts
    │           sse_library.ts
    │           stripe.ts
    │
    └───seeds
            seedAdmin.ts


```