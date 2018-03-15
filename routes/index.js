var express = require('express');
var router = express.Router();
var home = require('./../controller/home');

/* wrong place*/
function userAuth(req, res, next){
   if(req.session.user){
      next();   //If session exists, proceed to page
   } else {
      res.redirect('/login');
   }
}

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
router.get('/room', home.room);

router.get('/manager', userAuth, home.adminHome);
router.get('/login', home.login);
router.get('/logout', home.logout);
router.post('/login', home.checkUser);
router.get('/manager/setting', userAuth,home.setting);
router.get('/manager/movielist',userAuth, home.movieList);
router.get('/manager/new_movie', userAuth,home.addNewMovie);
router.get('/manager/edit_movie/:id', userAuth,home.editMovie);
router.post('/manager/save_new_movie', userAuth,home.saveNewMovie);
router.post('/manager/save_edit_movie', userAuth,home.saveEdit);
router.post('/manager/delete_movie', userAuth,home.deleteMovie);

router.get('/manager/category', userAuth,home.listCategory);
router.get('/manager/add_new_category', userAuth,home.addNewCategory);
router.post('/manager/save_new_category', userAuth,home.saveNewCategory);
router.get('/manager/update_category/:id', userAuth,home.updateCategory);
router.post('/manager/save_category', userAuth,home.saveCategory);
router.get('/manager/delete_categorys/:id', userAuth,home.deleteCategory);

router.get('/manager/list_slideshow',userAuth, home.listSlideshow);
router.get('/manager/new_slideshow',userAuth, home.newSlideShow);
router.post('/manager/save_newslideshow', userAuth,home.saveNewSlideshow);
router.get('/manager/delete_slideshow/:id', userAuth,home.deleteSlideshow);
router.get('/manager/recover_slideshow/:id', userAuth,home.recoverSlideshow);

router.get('/manager/room',userAuth, home.listRoom);
router.get('/manager/new_room',userAuth, home.newRoom);
router.post('/manager/save_newroom', userAuth,home.saveRoom);
router.get('/manager/delete_room/:id', userAuth,home.deleteRoom);
router.get('/manager/recover_room/:id', userAuth,home.recoverRoom);

module.exports = router;
