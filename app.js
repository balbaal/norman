const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const verifyToken = require("./middlewares/verifyToken");

// Routing
const indexRouter = require('./routes/index');
const mediaRouter = require('./routes/media');
const membersRouter = require('./routes/members');
const coursesRouter = require('./routes/courses');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const refreshTokenRouter = require('./routes/refreshToken');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/media', mediaRouter);
app.use('/users', membersRouter);
app.use('/courses', verifyToken, coursesRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentsRouter);
app.use('/refresh-token', refreshTokenRouter);

module.exports = app;
