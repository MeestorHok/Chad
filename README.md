# Blue CMS

## Installation

- Install MongoDB
- Install Redis
- Clone Repository
- Install Prod Dependencies `npm install --production`
- Ensure the following environment variables are set:
  - `MONGODB_URI`: the URI for your Mongo Database. This must include the username,
    password, host, port, and database name. for example: `mongodb://username:password@localhost:27017/blue`
  - `REDIS_URI`: ??

## Development

#### Getting Started

- Clone Repository
- Install Dev Dependencies `npm install`

#### Modifying

- Coding standard: TBD, test everything
- Policies: Security 1st, Speed 2nd, Reliability 3rd, Features last

#### Committing Changes

1. Lint `.ejs` files: `npm run lint-ejs`
2. Lint `.js` files: `npm run lint-js`
3. Check Dependencies: `npm run check-deps`
4. Run Tests: `npm test`
5. Commit and Push
