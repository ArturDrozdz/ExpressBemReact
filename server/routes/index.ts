import express = require('express')


const router = express.Router();
const {checkAuth} = require('../middleware/checkAuth');
const checkPermissions = require('../middleware/checkApiPerm');


//router.get('/', );


/* Сбор данных */
router.get('/api/user_vacancy', checkPermissions, checkAuth, require('./api/userVacancy').get);
router.get('/api/all_vacancy', checkPermissions, require('./api/allVacancy').get);
router.get('/api/all_resume', checkPermissions, require('./api/allResume').get);
router.get('/api/get_location', checkPermissions, require('./api/allLocations').get);
router.get('/api/get_category', checkPermissions, require('./api/allCategotys').get);


router.post('/admin_panel', checkAuth, require('./pages/adminPanel').post);
router.post('/post_vacancy', checkAuth, require('./pages/user/createVacancy').post);
router.post('/post_resume', checkAuth, require('./pages/user/createResume').post);
router.post('/login', require('./pages/authorize/login').post);
router.post('/register', require('./pages/authorize/register').post);
router.post('/logout', require('./pages/authorize/logout').post);



module.exports = router;