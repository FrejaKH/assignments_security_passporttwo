const express = require('express');
const router = express.Router();
const auth = require("../controllers/authControllerOI.js");
const { forwardAuthenticated } = require('../config/auth');



router.get('/register', forwardAuthenticated, auth.register);
router.post('/register', auth.postRegister);



router.get('/openid', forwardAuthenticated, auth.login);
router.post('/openid', auth.openid);
router.get('/openid/return', forwardAuthenticated, auth.postLogin);



router.get('/logout', auth.logout);

module.exports = router;
