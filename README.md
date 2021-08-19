# f1-app
## Link: [Formula One](https://forumula-one.herokuapp.com/home)

## Install
**Execute:**
```
npm install
```

## Usage
### Production
**File:** `.env`
```
PORT=?<port>
HOST=?<host>
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
PORT=?<port>
HOST=?<host>
NODE_ENV=dev
```

**Execute:**
```
npm run serve
```

## Deploy on Heroku

Contact Marcus Bader to be invited to the Heroku project.

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


## Tools
**Execute:**

To list all linting errors in js or vue files: ```npm run lint```

To auto fix linting errors in js or vue files: ```npm run lint:fix```

If you get an npm ```ERR! code ELIFECYCLE``` error when running the linting command it is because eslint exits with a non zero status code if linting errors are found.

**VsCode**

For VsCode install the eslint plugin: https://github.com/microsoft/vscode-eslint

This will enable auto fixes on save using the .vscode/settings.json file.


## Circuits API

Base url: `https://f1-light-api.herokuapp.com/api/v1/circuits`

A get request with a country name will return the circuit data like this:

`https://f1-light-api.herokuapp.com/api/v1/circuits/<country>`

Just make a GET request on the base url the get the available countries.
