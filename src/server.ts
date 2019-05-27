import 'dotenv/config';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import app from './app';

import { config } from './config';
import './routes';

createConnection({
    cli: {
        migrationsDir: 'migration',
    },
    database: 'test.sqlite',
    entities: [
        __dirname + '/entity/*',
    ],
    logging: false,
    migrations: ['migration/*.js'],
    synchronize: true,
    type: 'sqlite',
}).then((connection) => {
    app.listen(config.PORT, () => console.log('Example app listening on port 3000!'));
}).catch((error) => console.log(error));
