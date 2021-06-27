import { connect } from './db';

interface User {
    id?: number,
    username?: string
}

export async function getByUsername(params: User): Promise<User> {
    const client = await connect();

    const user = await client.query('SELECT * FROM users WHERE username = $1', [params.username]);
    return user.rows[0];
}

export async function create(params: User): Promise<User> {
    const client = await connect();

    const user = await client.query('INSERT INTO users(id, username) VALUES(DEFAULT, $1) returning *', [params.username]);
    return user.rows[0];
}
