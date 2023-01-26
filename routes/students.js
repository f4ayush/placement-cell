const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controllers/students_controller');

router.post('/create', passport.checkAuthentication, studentsController.create);
router.post('/interview-create', passport.checkAuthentication, studentsController.createInterview);
router.post('/interview-result', passport.checkAuthentication, studentsController.updateResult);
router.get('/download-data', passport.checkAuthentication, studentsController.downloadData);
router.get('/interview/:id', passport.checkAuthentication, studentsController.interview);

module.exports = router;