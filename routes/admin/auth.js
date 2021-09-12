const express = require('express');

const router = express.Router();

const authController = require('../../controllers/admin/auth');
router.get('/login', authController.renderLoginPage);

const passport = require('passport');
router.post('/login', passport.authenticate('local'), authController.saveDataInSession);
router.get('/logout', authController.signOut);

module.exports = router;