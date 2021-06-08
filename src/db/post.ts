import { connect } from './db';

interface Post {
    id?: number,
    userId?: number,
    title?: string,
    bodyText?: string,
}

export async function create(params: Post): Promise<Post> {
    const client = await connect();

    const now = new Date();

    const newPost = await client.query(
        'INSERT INTO posts(id, created_at, updated_at, deleted_at, user_id, title, body_text, deleted)'
        + ' VALUES(default, $1, $1, $1, $2, $3, $4, $5) RETURNING *',
        [now, params.userId, params.title, params.bodyText, false],
    );

    return newPost.rows[0];
}

export async function getById({ id }: Post): Promise<Post> {
    const client = await connect();

    const post = await client.query(
        'SELECT posts.id, posts.title, posts.body_text, users.username'
        + ' FROM posts'
        + ' INNER JOIN users ON users.id = posts.user_id'
        + ' WHERE posts.id = $1 and posts.deleted = false',
        [id],
    );

    return post.rows[0];
}

export async function list(): Promise<Post[]> {
    const client = await connect();

    const posts = await client.query(
        'SELECT posts.id, posts.title, posts.body_text, users.username'
        + ' FROM posts'
        + ' INNER JOIN users ON users.id = posts.user_id'
        + ' WHERE posts.deleted = false',
    );

    return posts.rows;
}

export async function updateById(id: number, { title, bodyText }: Post): Promise<Post> {
    const client = await connect();

    const queryParams = [];
    const updateText = [];

    if (title) {
        queryParams.push(title);
        updateText.push(`title = $${updateText.length + 1}`);
    }

    if (bodyText) {
        queryParams.push(bodyText);
        updateText.push(`body_text = $${updateText.length + 1}`);
    }

    const query = `UPDATE posts SET ${updateText.join(', ')} WHERE id = $${updateText.length + 1} and deleted = false RETURNING *`;
    queryParams.push(id);

    const result = await client.query(query, queryParams);

    return result.rows[0];
}

export async function setDeleted(id: number): Promise<Post> {
    const client = await connect();

    const result = await client.query(`UPDATE posts SET deleted = true WHERE id = $1 RETURNING *`, [id]);

    return result.rows[0];
}
