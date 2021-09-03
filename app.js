process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const logger = require('morgan');
const path = require('path');

const cookieParser = require('cookie-parser');

dotenv.config();

const { sequelize } = require('./models');
// 절대로 force를 true로 하지 마세요!
sequelize.sync({ force: true })
    .then(() => {
        console.log('데이터베이스 연결에 성공했습니다.');
    })
    .catch((err) => {
        console.error(err);
    });

const app = express();
app.set('port', process.env.PORT || 4200);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something is wrong!');
})

app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`);
})