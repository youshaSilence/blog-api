const production = {};

const local : any = {};
local.db = {
    user: 'node_blog',
    password: '12345',
    host: 'localhost',
    database: 'blog',
    port: 5432,
};

local.port = 3000;

export default function config() {
    switch (process.env.NODE_ENV) {
    case 'prod': return production;
    default: return local;
    }
}
