const express = require('express');
const { signUpController, loginController, isAuthenticatedController, logOutController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router()


router.post('/signup', signUpController)
router.post('/login', loginController)
router.get('/logout', authMiddleware, logOutController)
router.get('/isAuthenticated', authMiddleware, isAuthenticatedController )


module.exports = router;