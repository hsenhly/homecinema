var express = require('express');
var router = express.Router();
var home = require('./../controller/home');

/* wrong place*/

router.get('/images',home.pageNotfound);
router.get('/javascripts',home.pageNotfound);
router.get('/stylesheets',home.pageNotfound);

/* GET home page. */
router.post('/search', home.searchHome);
router.get('/', home.homePage);
router.get('/:category/page/:id', home.homePage);
router.get('/watch/:id', home.moviePreview);
router.get('/about', home.aboutUs);
router.get('/contact', home.contactUs);

router.get('/manager', home.adminHome);
router.get('/manager/setting', home.setting);
router.get('/manager/movielist', home.movieList);
router.get('/manager/new_movie', home.addNewMovie);
router.get('/manager/edit_movie/:id', home.editMovie);
router.post('/manager/save_new_movie', home.saveNewMovie);
router.post('/manager/save_edit_movie', home.saveEdit);
router.post('/manager/delete_movie', home.deleteMovie);

router.get('/manager/category', home.listCategory);
router.get('/manager/add_new_category', home.addNewCategory);
router.post('/manager/save_new_category', home.saveNewCategory);
router.get('/manager/update_category/:id', home.updateCategory);
router.post('/manager/save_category', home.saveCategory);
router.get('/manager/delete_categorys/:id', home.deleteCategory);

router.get('/manager/list_slideshow', home.listSlideshow);
router.get('/manager/new_slideshow', home.newSlideShow);
router.post('/manager/save_newslideshow', home.saveNewSlideshow);
router.get('/manager/delete_slideshow/:id', home.deleteSlideshow);
router.get('/manager/recover_slideshow/:id', home.recoverSlideshow);

module.exports = router;
