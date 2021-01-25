import * as express from 'express';

const PORT = process.env.PORT || 3000;
import * as morgan from 'morgan';

import {join} from 'path';

const app = express();
app.use(morgan('combined'));

app.set('views', join(__dirname, '/views'));
app.use('/public', express.static(join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen(PORT, () => {
  console.log('Listening');
});
