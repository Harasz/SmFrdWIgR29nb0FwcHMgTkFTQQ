# SmFrdWIgR29nb0FwcHMgTkFTQQ - Space App

A microservice for fetching the URL of astronomy picture of the day.

## Installation

Install all dependencies with pnpm

```bash
  pnpm install
```

Start development with pnpm

```bash
  pnpm star:dev
```

Build project with pnpm

```bash
  pnpm build
```

## Run with Docker

Build docker image

```bash
  pnpm install
```

Run docker image

```bash
  docker run --env-file=.env -p={PORT}:{APP_PORT} gogo
```

when:

- `{PORT}` is the port that app should listen in local network,
- `{APP_PORT}` is the port specified in environment variables for the app.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Variable              | Type     | Default value | Details                                                                  |
| --------------------- | -------- | ------------- | ------------------------------------------------------------------------ |
| `API_KEY`             | `string` | DEMO_KEY      | Specifies a key for the API.                                             |
| `CONCURRENT_REQUESTS` | `number` | 5             | Specifies the number of requests that can be sent at the same time.      |
| `PORT`                | `number` | 8080          | Specifies the port on which the application will listen for connections. |
