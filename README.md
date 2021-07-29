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

## Tools
**Execute:**
```
npm run lint
```
If you get an npm ```ERR! code ELIFECYCLE``` error when running the linting command it is because eslint exits with a non zero status code if linting errors are found.

**Eslint**

For VsCode install the eslint plugin: https://github.com/microsoft/vscode-eslint

This will enable auto fixes on save.

