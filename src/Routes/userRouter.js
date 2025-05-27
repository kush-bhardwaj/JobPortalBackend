const express = require('express');
const { registerUser, login, verifyUser} = require('../Controllers/userController');
const userRouter = express.Router();
userRouter.post('/register',registerUser);
userRouter.post('/login',login);
userRouter.get('/verify/:id',verifyUser)
module.exports = userRouter;