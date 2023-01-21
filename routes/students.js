const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controllers/students_controller');

router.post('/create', passport.checkAuthentication, studentsController.create);
router.post('/interview', passport.checkAuthentication, studentsController.interview);
/* router.get('/destroy/:id', passport.checkAuthentication, studentsController.destroy); */

module.exports = router;