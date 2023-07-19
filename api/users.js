const express = require("express")
const usersRouter = express.Router()
const {createUser, getUser, getUserByUsername} = require('../db/Users')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

usersRouter.use('*', (req, res, next) => {
    console.log("REACHING USERS ROUTER");
    next();
});

usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    console.log("WORKING")
    try{
                const user = await createUser({ username, password });
                const token = jwt.sign({ username }, JWT_SECRET);
                     res.send({
                       token: token,
                       user
                     });
                 console.log("REGISTER TEST WORKING", user)
                } catch(error) {
                    next(error);        
            }
        }
);

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await getUser({ username, password });
    //  console.log("USER!!!", user);
      if (user) {
        const token = jwt.sign({
          id: user.id,
          username
        }, JWT_SECRET);
        const verifiedUser = {
          message: "you're logged in!",
          user,
          token
        }
        res.send(verifiedUser);
      }
    } catch (error) {
      next(error)
  }
});


module.exports = usersRouter;