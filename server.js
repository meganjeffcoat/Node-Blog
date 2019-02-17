const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
const postRouter = require('./router/postsRouter');
const userRouter = require('./router/userRouter');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.use('/api/users', userRouter);

module.exports = server;