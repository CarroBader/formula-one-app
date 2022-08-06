# Formula One Application

## Link: [Formula One](https://forumula-one-app.herokuapp.com/home)

## Install

**Execute:**

```
npm install
```

## Usage

### Production

**File:** `.env`

```
HOST=?<host>
PORT=?<port>
NODE_ENV=production
```

**Execute:**

```
npm run build
npm run start
```

## Dev

**File:** `.env`

```
HOST=?<host>
PORT=?<port>
NODE_ENV=dev
```

**Execute:**

```
npm run serve
```

## Deploy on Heroku

### .git/config

Make sure you have these lines in the file `.git/config`.

```
[remote "heroku"]
        url = https://git.heroku.com/formula-one-light.git
        fetch = +refs/heads/*:refs/remotes/heroku/*
```

### Commands to deploy

Execute these commands

`git push heroku main`
