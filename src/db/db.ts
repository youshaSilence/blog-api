import { Client } from 'pg';

import Config from '../config';

const config = Config();

export async function connect(): Promise<Client> {
    const client = new Client({
        user: config.db.user,
        host: config.db.host,
        database: config.db.database,
        password: config.db.password,
        port: config.db.port,
    });
    await client.connect();
    // console.log(`Connected to postgres ${config.db.host}:${config.db.port} database ${config.db.database}`);

    // const test = await client.query('SELECT NOW()');

    // console.log(test);

    return client;
}
