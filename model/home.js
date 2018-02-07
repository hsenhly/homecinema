var knex = require('./condb');
function movieModel (){

}
var method = movieModel.prototype;

method.get_all_movie = function(params, callback) {
  knex(knex.tableMovie).select('movie.id as movieId','movie.title','movie.rating','movie.visit_count','category.category_name','movie.created_at')
  .innerJoin('category', 'movie.category', 'category.id').where({'movie.is_deleted':2}).then(function(row){
    if(row){
      callback(null,row);
    }else{
      callback(null, []);
    }
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.get_slide_show_images = function(params, callback) {
  knex(knex.tableSetting).select().where({code:"SLIDE_ITEM",is_deleted:2}).then(function(row){
    if(row){
      callback(null,row);
    }else{
      callback(null, []);
    }
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.get_movie_by_category = function(params, callback){
  knex(knex.tableMovie).where({'category':params.categoryId,is_deleted:2}).orderBy('created_at', 'desc').then(function(row){
    if(row){
      callback(null,row);
    }else{
      callback(null, []);
    }
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.get_home_movie = function(params, callback) {
  var itemPerPage = 10;
  var returnData = {};
  returnData.totalPage = returnData.totalPage || 1;
  params.selectPage = params.selectPage || 1;
  var queryParam = {
    is_deleted:2
  }

  if(params.catId > 0){
    queryParam.category = params.catId
  }

  knex(knex.tableMovie).count('id as allmovie').where({is_deleted:2})
  .then(function(counter){
    returnData.totalPage = parseInt(counter[0].allmovie / itemPerPage);
  }).then(function(){
    var queryKnex = knex(knex.tableMovie).where(queryParam);
    if(params.q && params.q.length > 0){
      queryKnex.where('title','like','%'+params.q+'%');
    }
    queryKnex.limit(itemPerPage);
    queryKnex.offset(itemPerPage*(params.selectPage-1));
    queryKnex.orderBy('visit_count', 'desc');
    queryKnex.then(function(row){
      if(row){
        returnData.currentPage = params.selectPage;
        returnData.movie = row;
      }
      knex(knex.tableSetting).where({is_deleted:2, code:100}).then(function(listSlide){
        returnData.slideshow = listSlide;
        callback(null,returnData);
      });
    });
  })
  .catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.get_latest_movie = function(params, callback) {
  knex(knex.tableMovie).where({is_deleted:2}).orderBy('created_at', 'desc').then(function(row){
    if(row){
      callback(null,row);
    }else{
      callback(null, []);
    }
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.get_movie_detail = function(params, callback) {
  knex(knex.tableMovie).first().where({'id':params.id,is_deleted:2}).then(function(row){
    if(row){
      knex(knex.tableCategory).first('category_name').where({'id':row.category}).then(function(category){
        row.category = category.category_name;
        row.duration = '1h:38mn';
        callback(null, row);
        knex(knex.tableMovie).update('visit_count',row.visit_count+1).where({'id':row.id,is_deleted:2}).then(function(s){});
      });
    }else{
      callback(null, []);
    }

  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.getMovieById = function (params, callback){
  knex(knex.tableMovie).first().where({'id':params.id}).then(function(row){
    if(row){
      knex(knex.tableCategory).select('id','category_name').where({'is_deleted':2}).then(function(category){
        row.listCategory = category;
        callback(null, row);
      });
    }else{
      callback(null, {});
    }

  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.save_new_movie = function(params, callback){
   knex(knex.tableMovie).insert({
     title: params.title,
     cover_image: params.fileName,
     trailer_url: params.trailer,
     category: params.category,
     description:params.description
   }).then(function(row){
     console.log(row);
    if(row){
      callback(null,row);
    }else{
      callback(null, []);
    }
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.save_movie = function(params,callback){
  var updateData = {
    title: params.title,
    trailer_url: params.trailer,
    category: params.category,
    description:params.description
  }
  if(params.fileName){
    updateData.cover_image = params.fileName;
  }

  knex(knex.tableMovie).where({id:params.id}).update(updateData).then(function(row){
   if(row){
     callback(null,row);
   }else{
     callback(null, []);
   }
  }).catch(function(err) {
   console.log(err);
   callback(null,[]);
  });
}

method.delete_movie = function(params,callback){

}

method.create_category = function(params,callback){

  knex(knex.tableCategory).insert({
    category_name: params.cat_name
  }).then(function(row){
   if(row){
     callback(null,row);
   }else{
     callback(null, []);
   }
  }).catch(function(err) {
   console.log(err);
   callback(null,[]);
  });
}

method.update_category = function(params,callback){
  knex(knex.tableCategory).where('id', params.cat_id)
  .update({
    category_name: params.cat_name
  }).then(function(row){
    callback(null,row);
  });
}

method.get_category_by_id = function(params,callback){
  knex(knex.tableCategory).first()
  .where({is_deleted:2, id:params.id})
  .then(function(row){
    if(row){
      callback(null,row);
    }else{
      callback(null, {});
    }
  }).catch(function(err) {
    callback(null,[]);
  });
}

method.delete_category = function(params,callback){
  knex(knex.tableCategory).where('id', params.id)
  .update({
    is_deleted: 1
  }).then(function(row){
    callback(null,row);
  });
}

method.get_all_category = function(params,callback){
  knex(knex.tableCategory)
  .where({is_deleted:2})
  .then(function(row){
    if(row){
      callback(null,row);
    }else{
      callback(null, []);
    }
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.get_category = function(params,callback){
  knex(knex.tableCategory).select('id','category_name as name')
  .where({is_deleted:2})
  .orderBy('category_name', 'asc').then(function(row){
    if(row){
      callback(null,row);
    }else{
      callback(null, []);
    }
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.getAllSlideshow = function(params,callback){
  knex(knex.tableSetting)
  .then(function(row){
    if(row){
      callback(null,row);
    }else{
      callback(null, []);
    }
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.add_slide_image = function(params,callback){
  knex(knex.tableSetting)
  .insert({code:100,value:params.fileName}).then(function(updated){
    callback(null,{ok:1});
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.deleteSlideshow = function(params,callback){
  knex(knex.tableSetting)
  .where({id:params.id}).update({is_deleted:1})
  .then(function(updated){
    knex(knex.tableSetting).count('id as counter').where({is_deleted:2}).then(function(row){
      if(row[0].counter == 0){
        knex(knex.tableSetting).where({id:params.id}).update({is_deleted:2}).then(function(r){});
      }
    });
    callback(null,{ok:1});
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}

method.recoverSlideshow = function(params,callback){
  knex(knex.tableSetting)
  .where({id:params.id}).update({is_deleted:2})
  .then(function(updated){
    callback(null,{ok:1});
  }).catch(function(err) {
    console.log(err);
    callback(null,[]);
  });
}
module.exports = movieModel;
