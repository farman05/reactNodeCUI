const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const validationHelper = require("../helpers/validation");





router.post('/login',validationHelper.checkLogin, user.postLogin);
router.post('/generateBcrypt', user.generateBcrypt);

module.exports = router;