process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const {sequelize} = require('./models');
// 절대로 force를 true로 하지 마세요!
sequelize.sync({force: false})
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
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// TODO: Front-end 파트와 상의후 옵션 변경
// const corsOptions = {
//     origin: 'http://localhost:4242',
//     credentials: true,
// }
// app.use(cors(corsOptions));
app.use(cors());

const MySQLStore = require('express-mysql-session')(session);
const sessionOptions = {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

const sessionStore = new MySQLStore(sessionOptions);
app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
}));

// ====================================================
// passport 관련 부분 설정부 입니다. ========================
const passport = require('passport');
const passportConfig = require('./passport/index');
app.use(passport.initialize());
app.use(passport.session());
passportConfig();
// =====================================================

const indexRouter = require('./routes/');
app.use('/', indexRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const receiverRouter = require('./routes/receiver');
app.use('/receiver', receiverRouter);

const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json('Something is wrong!');
})

app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`);
})