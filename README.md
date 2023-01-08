## Hexagonal 2048 game

### TODO:
- add theme

### To start locally run

```
npm run start-server
npm start
```

open your browser with [http://localhost:3000/?radius=3&hostname=localhost&port=13337](http://localhost:3000/?radius=3&hostname=localhost&port=13337)

### Search params

The game has the ability to be set up via searchParams. Required params are:

- `hostname` - this parameter sets hostname for rng-server.
- `port` - optional parameter. If it is not set to default port is 80 otherwise the game would use this port for rng-server.
- `radius` - radius for the game

### Directions and Keys

You have 6 keyboard keys (Latin lower case letters) for 6 existing directions:

| Direction                 | Keyboard key |
| ------------------------- | :----------: |
| north (top)               |      w       |
| north-east (top-right)    |      e       |
| north-west (top-left)     |      q       |
| south (bottom)            |      s       |
| south-east (bottom-right) |      d       |
| south-west (bottom-left)  |      a       |

After pressing any of the listed keys, all your numbers should be shifted in the chosen direction.


## Package scripts description

* `npm run start` - starts dev server with the game. The page will be reloaded on each code update.
* `npm run build` - builds the production version of the game. This command is used for tests.
* `npm run start-server` - starts rng-server locally.
* `npm run test:unit` - starts unit tests
* `npm run test:local` - This command expects that dev-server with the game is launched and local rng-server not. These tests use [puppeteer](https://github.com/puppeteer/puppeteer) for tests in a browser. You are able to see how tests run in the browser for the game with this command.
* `npm run test` - starts production tests. This command use port 3000, so please leave it free if you try to use this command.
