const express = require('express');
const { protect } = require('../utils/auth.middleware');
const { profile, getProfile, createWork, getWorks, editWork, deleteWork, createExpertise, getExpertises, deleteExpertise, createExperience, getExperience, editExperience, createEducation, getEducation, createCertificate, getCertificate, deleteData, createOrEditServices, getServices, createBlog, getBlogs, createMiniProject, getMiniProjects, editMiniProject, deleteMiniProject } = require('../controllers/user.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/profile', protect, upload.single('profilePhoto'), profile);
router.get('/profile', getProfile);
router.post('/work', protect, upload.single('photo'), createWork);
router.get('/work', getWorks);
router.patch('/work/:workId', protect, upload.single('photo'), editWork);
router.delete('/work/:workId', protect, deleteWork);
router.post('/expertise', protect, upload.any(), createExpertise);
router.post('/miniproject', protect, createMiniProject);
router.get('/miniproject', getMiniProjects);
router.patch('/miniproject/:miniProjectId', protect, editMiniProject);
router.delete('/miniproject/:miniProjectId', protect, deleteMiniProject);
router.post('/expertise', protect, upload.any(), createExpertise);
router.get('/expertise', getExpertises);
router.delete('/expertise/:skillId', protect, deleteExpertise);
router.post('/experience', protect, upload.single('logo'), createExperience);
router.get('/experience', getExperience);
router.patch('/experience/:experienceId', protect, upload.single('logo'), editExperience);
router.post('/education', protect, createEducation);
router.get('/education', getEducation);
router.post('/certificate', protect, createCertificate);
router.get('/certificate', getCertificate);
router.post('/service', protect, upload.single('photo'), createOrEditServices)
router.get('/service', getServices);
router.post('/blog', protect, upload.single('photo'), createBlog)
router.get('/blog', getBlogs);
router.delete('/data/:id', protect, deleteData); // experience, education, certificate, service, blog


module.exports = router