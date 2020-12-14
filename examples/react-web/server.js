/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Server } from 'boardgame.io/server';
import path from 'path';
import serve from 'koa-static';
import TicTacToe from './src/tic-tac-toe/game';
import Chess from './src/chess/game';

const PORT = process.env.PORT || 8000;
const server = Server({ games: [TicTacToe, Chess] });

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, './build');
server.app.use(serve(frontEndAppBuildPath));

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) =>
      await serve(frontEndAppBuildPath)(
        Object.assign(ctx, { path: 'index.html' }),
        next
      )
  );
});
