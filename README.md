<div align="center">

<img src="https://6nmd.us/logo.png" width="350" height="200">

## 6nmd.us

A simple URL shortener in Typescript and VueJS

</div>

To use:

1. Get PostgreSQL and NodeJS setup.
2. Rename `.env.example` to `.env` in project root
3. Change `PORT` in `.env` to the port you want to run the backend API on. Then change `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, and `DB_DB` to your corresponding Postgres Connection Details, and change `VUE_APP_API_URL` to the URL you want to run the backend API on.
4. Run `cd backend && npm i && npm run start cd frontend && yarn && yarn build`

Dev scripts included in each package.JSON

### API Docs

API BASE URL = https://api.6nmd.us

#### `POST /url-create`

Create a URL. Supported Schemes are http(s)://, (s)ftp://

Returns the slug of a URL which can be retrieved at `/:slug`

Throws a 400 error for an invalid URL, or a 500 for an SQL Insert Fail.

Example Curl:

```
curl --request POST \
  --url http://api.6nmd.us/url-create \
  --header 'Content-Type: application/json' \
  --data '{
   "url": "https://6nmd.us"
}'
```

#### `GET /:slug`

Get a URL.

Returns a given URL in plain text if it exists, if not returns a 404.
