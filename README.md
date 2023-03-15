# College-BazaaR

College-BazaaR is a Full Stack Marketplace App where students can buy/sell the items from other students who don't need the items anymore.
<br>
Through this App students can chat with the sellers directly to negotiate the price, get things sorted etc.
It uses Socket.io for real time communication and stores data in MongoDB Database.

## Tech Stack

**Client:** React JS

**Server:** Node JS, Express JS

**Database:** Mongo DB

## Demo

https://anudeep-nagulapally-college-bazaar.up.railway.app/

## Run Locally

Clone the project

```bash
  git clone https://github.com/Nagulapally-Anudeep/College-BazaaR.git
```

Go to the project directory

```bash
  cd College-BazaaR
```

Install dependencies

```bash
  npm install
```

```bash
  cd client/
  npm install
```

Start the server (Go to project directory)

```bash
  npm run server
```

Start the Client

```bash
  //open now terminal
  cd client
  npm start
```

Add your own environment variables by taking .env.example as Reference

```bash
    MONGO_URL="MonogDB Url"
    PORT="PORT"
    JWT_SECRET_KEY="your secret key"
    NODE_ENV="PROD"or"DEV
```

# Features

- ### Authenticaton

- ### Sell Items in the Marketplace

- ### Real Time Chatting with sellers (with typing indicators)

- ### Search/Discover Items in Marketplace

- ### Marking Items as Favourite

- ### Pagination Feature

- ### Updating/Delete the Items posted by you

## Made By

- [@Anudeep-Nagulapally](https://github.com/Nagulapally-Anudeep)
