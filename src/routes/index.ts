import KoaRouter from 'koa-router';

import postRouter from './post';

const router = new KoaRouter();

router.use('/posts', postRouter.routes());

export default router;
