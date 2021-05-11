import Koa from 'koa';

function main() {
    const app = new Koa();

    app.use(async (ctx: { body: string; }) => {
        ctx.body = 'hello world';
    });

    app.listen(3000);
}

main();
