var express = require('express');
var model = require('../model/index');
var formData = require("formidable");
var fs = require('fs');
var mmm = require('mmmagic'), Magic = mmm.Magic;
var magic = new Magic(mmm.MAGIC_MIME_TYPE);
var path = require('path');

module.exports.pageNotfound = function(req, res, next){
  res.writeHead(302,{
    'Location': "/"
  });
  res.end();
}

module.exports.homePage = function(req, res, next){
  var page = parseInt(req.params.id) || 1;
  model.movieModel.get_top_movie({selectPage:page},function(err, data){
    var returnData= {
      title : 'Home Cinema',
      listMovie : data
    }
    res.render('home', returnData);

  });
}

module.exports.moviePreview = function(req, res, next){
  var id = parseInt(req.params.id) || 1;
  model.movieModel.get_movie_detail({id:id},function(err, data){

    var returnData= {
      title : data.title,
      movie : data
    }

    if(!err){
      res.render('preview', returnData);
    }else{
      res.writeHead(302,{
        'Location': "/"
      });
      res.end();
    }
  });
}

module.exports.adminHome = function(req, res, next){
  res.render('manager', { title: 'Movie Title', data:['hello world','hello everyone']});
}

module.exports.addNewMovie = function(req, res, next){
  model.movieModel.get_category({},function(err, data){
    var returnData = {
      title:"Add movie",
      category:data
    }
    res.render('add_movie', returnData);
  });
}

module.exports.editMovie = function(req, res, next){
  model.movieModel.getMovieById(req.params,function(err, data){
    var returnData = {
      title:"update movie",
      movie: data
    }

    res.render('edit_movie', returnData);
  });
}

module.exports.saveNewMovie = function(req, res, next){

  var form = new formData.IncomingForm();
  form.multiples = true;
  form.parse(req, function(err, fields, file) {

      form.uploadDir = './public/images/';

      if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(form.uploadDir);
      }
      if (file && file.cover) {
        fs.rename(file.cover.path, path.join(form.uploadDir, file.cover.name));
        magic.detectFile(path.join(form.uploadDir, file.cover.name), function(err, result) {
          if (!err && result.indexOf('image') > -1) {
            if(file && file.cover) fields.fileName = file.cover.name;
            model.movieModel.save_new_movie(fields,function(err, data){
              res.writeHead(302, {
                'Location': "/manager/movielist"
              });
              res.end();
            });
          } else {
            res.writeHead(302, {
              'Location': "/manager/movielist"
            });
            res.end();
          }
        });
    }
  });
}

module.exports.setting = function(req, res, next){
  res.render('setting', { title: 'Movie Title', data:['hello world','hello everyone']});
}

module.exports.movieList = function(req, res, next){
  model.movieModel.get_all_movie({},function(err, data){
    var returnData = {
      title:"List movie",
      movies:data
    }
    res.render('movie_list', returnData);
  });
}

module.exports.saveEdit = function(req, res, next){

    var form = new formData.IncomingForm();
    form.multiples = true;
    form.parse(req, function(err, fields, file) {
        if (file && file.cover && file.cover.name) {
          form.uploadDir = './public/images/';

          if (!fs.existsSync(form.uploadDir)) {
            fs.mkdirSync(form.uploadDir);
          }
          fs.rename(file.cover.path, path.join(form.uploadDir, file.cover.name));
          magic.detectFile(path.join(form.uploadDir, file.cover.name), function(err, result) {
            if (!err && result.indexOf('image') > -1) {
              if(file && file.cover) fields.fileName = file.cover.name;
              model.movieModel.save_movie(fields,function(err, data){
                res.writeHead(302, {
                  'Location': "/manager/movielist"
                });
                res.end();
              });
            } else {
              res.writeHead(302, {
                'Location': "/manager/movielist"
              });
              res.end();
            }
          });
      }else{
        model.movieModel.save_movie(fields,function(err, data){
          res.writeHead(302, {
            'Location': "/manager/movielist"
          });
          res.end();
        });
      }
    });
}

module.exports.deleteMovie = function(req, res, next){
  res.render('movie_list', { title: 'Movie Title', data:['hello world','hello everyone']});
}

module.exports.aboutUs = function(req, res, next){
  res.render('about', { title: 'Movie Title', data:['hello world','hello everyone']});
}

module.exports.contactUs = function(req, res, next){
  res.render('contact', { title: 'Movie Title', data:['hello world','hello everyone']});
}

module.exports.listCategory = function(req, res, next){
  model.movieModel.get_all_category({},function(err, data){
    var returnData = {
      title:"List category",
      category:data
    }
    res.render('category', returnData);
  });
}

module.exports.addNewCategory = function(req, res, next){
  res.render('add_category', { title: 'Add category', data:[]});
}

module.exports.updateCategory = function(req, res, next){

  model.movieModel.get_category_by_id(req.params, function(err, data){
      var restData = {
        title: 'Edit category',
        category:data
      }
      res.render('update_category', restData);
  });

}

module.exports.saveNewCategory = function(req, res, next){

  var form = new formData.IncomingForm();
  form.multiples = true;

  form.parse(req, function(err, fields, file) {
    model.movieModel.create_category(fields, function(err, data){
      res.writeHead(302, {
        'Location': "/manager/category"
      });
      res.end();
    });
  });
}

module.exports.saveCategory = function(req, res, next){

  var form = new formData.IncomingForm();
  form.multiples = true;

  form.parse(req, function(err, fields, file) {
    model.movieModel.update_category(fields, function(err, data){
      res.writeHead(302, {
        'Location': "/manager/category"
      });
      res.end();
    });
  });
}

module.exports.deleteCategory = function(req, res, next){

  model.movieModel.delete_category(req.params, function(err, data){
    res.writeHead(302, {
      'Location': "/manager/category"
    });
    res.end();
  });
}

module.exports.listSlideshow = function(req, res, next){

  model.movieModel.getAllSlideshow(req.params, function(err, data){
    var returnData = {
      title:"List slide show",
      slideshow:data
    }
    res.render('list_slideshow', returnData);
  });
}

module.exports.deleteSlideshow = function(req, res, next){

  model.movieModel.deleteSlideshow(req.params, function(err, data){
    res.writeHead(302, {
      'Location': "/manager/list_slideshow"
    });
    res.end();
  });
}

module.exports.recoverSlideshow = function(req, res, next){

  model.movieModel.recoverSlideshow(req.params, function(err, data){
    res.writeHead(302, {
      'Location': "/manager/list_slideshow"
    });
    res.end();
  });
}

module.exports.newSlideShow = function(req, res, next){
  res.render('add_slideshow', { title: 'Add slideshow', data:[]});
}

module.exports.saveNewSlideshow = function(req, res, next){
  var form = new formData.IncomingForm();
  form.multiples = true;
  form.parse(req, function(err, fields, file) {

      form.uploadDir = './public/images/';

      if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(form.uploadDir);
      }
      if (file && file.slideshow) {
        fs.rename(file.slideshow.path, path.join(form.uploadDir, file.slideshow.name));
        magic.detectFile(path.join(form.uploadDir, file.cover.name), function(err, result) {
          if (!err && result.indexOf('image') > -1) {
            if(file && file.slideshow) fields.fileName = file.slideshow.name;
            model.movieModel.add_slide_image(fields,function(err, data){
              res.writeHead(302, {
                'Location': "/manager/list_slideshow"
              });
              res.end();
            });
          } else {
            res.writeHead(302, {
              'Location': "/manager/list_slideshow"
            });
            res.end();
          }
        });
    }
  });
}
