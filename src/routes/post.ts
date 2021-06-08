import Router from 'koa-router';

import * as post from '../controllers/post';

const router = new Router();

interface Post {
    id?: number,
    userId?: number,
    title?: string,
    bodyText?: string,
}

router.post('/', async (ctx, next) => {
    const params = {
        userId: ctx.request.body.userId,
        title: ctx.request.body.title,
        bodyText: ctx.request.body.bodyText,
    };

    const newPost = await post.addPost(params);

    ctx.body = newPost;
    ctx.status = 200;

    next();
});

router.get('/', async (ctx, next) => {
    const posts = await post.list();
    ctx.body = posts;
    ctx.status = 200;

    next();
});

router.get('/:id', async (ctx, next) => {
    const params = {
        id: parseInt(ctx.params.id),
    };

    const postResult = await post.getById(params);

    ctx.body = postResult;
    ctx.status = 200;

    next();
});

router.put('/:id', async (ctx, next) => {
    const params = {
        title: ctx.request.body.title,
        bodyText: ctx.request.body.bodyText,
    };

    const id = parseInt(ctx.params.id);

    const updateResult = await post.updateById(id, params);

    ctx.status = 200;
    ctx.body = updateResult;

    next();
});

router.del('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id);

    await post.setDeleted(id);
    
    ctx.status = 200;

    next();
});

export default router;
