const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/Auth');
const jwt = require('express-jwt');
var auth = jwt({
    secret:process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

router.get('/test',auth,(req,res)=>{
    res.json({
        messsage:`Hello, ${req.payload.email}`
    });
});

router.post('/register',ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;