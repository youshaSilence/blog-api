import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import router from './routes/index';
import Config from './config';

const config = Config();

async function main() {
    const app = new Koa();
    app.use(bodyParser());

    app.use(router.routes());

    app.listen(config.port);
}

main();
