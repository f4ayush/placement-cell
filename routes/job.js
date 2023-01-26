const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs_controller');
router.get('/job-list', jobsController.getJobs);

module.exports = router;