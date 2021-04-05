import express from 'express';
import routes from './routes';

import './database';
import uploadConfig from './config/upload';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(process.env.PORT || 3333);
