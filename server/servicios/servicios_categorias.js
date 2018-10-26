// Obtiene categorias
JsonRoutes.add("get", "/api/getCategorias", function (req, res, next) {
    //var id = req.params.id;
    var login = validatoken(req.headers.token );
    var obj = {};
    if(login){
    var obj = Categorias.find({idCliente:login.profile.cliente }).fetch();
    for(var i = 0; i < obj.length; i++){
        if(obj[i].imagen){
        var image = Images.findOne({_id:obj[i].imagen}).link();
        obj[i].idImagen =  obj[i].imagen;
        obj[i].imagen = image.replace("localhost","192.168.2.112");
        }
    }
}else{
    obj.mensaje = "Error usuario no existe o inactivo"
}
    JsonRoutes.sendResult(res, {
      data: obj
    });
  });


//   Obtiene categoria individual recibiendo el id
  JsonRoutes.add("get", "/api/getCategoria/:_id", function (req, res, next) {
    var id = req.params._id;
  
    JsonRoutes.sendResult(res, {
      data: Categorias.find({_id:id}).fetch()
    });
  });

//   Guarda la categoria 
  JsonRoutes.add("POST", "/api/guardaCategoria", function (req, res, next) {
    var login = validatoken(req.headers.token);
    var obj = {};
    if(login){
        var datos = req.body
        var obj = {};
        obj.categoria = datos.categoria;
        if(datos.url != ""){
          obj.imagen = datos.url;
        }
        obj.creadoEl = new Date();
        obj.idCliente = login.profile.cliente ;
       var result = Categorias.find({categoria:obj.categoria,idCLiente:login.profile.cliente}).count();
        if(result == 0){
            Categorias.insert(obj);
            obj = {"mensaje":"La categoria fue insertada","status":1};
        }else{
            obj = {"mensaje":"La categoria ya existe","status":0};
        }
    }else{
        obj = {"mensaje":"Error usuario no existe o inactivo","status":0};
    }   
    JsonRoutes.sendResult(res, {        
      data:obj ,
      code: 200
    });
  });

  // Actualiza categoria
JsonRoutes.add("POST", "/api/updateCategoria", function (req, res, next) {
  var login = validatoken(req.headers.token);
  var obj = {};
  if(login){
      var datos = req.body
      var id = datos._id;
      var obj = {};
      obj.categoria = datos.categoria;
      if(datos.url != ""){
        obj.imagen = datos.url;
      }
      if(datos.idImagenAnterior != ""){
        Images.remove({_id:datos.idImagenAnterior});
      }
     var result = Categorias.update({_id:id},{$set:obj});
     if(result){
      obj = {"mensaje":"Categoria actualizada exitosamente","status":1};
     }
  }else{
      obj = {"mensaje":"Error usuario no existe o inactivo","status":0};
  }   
  JsonRoutes.sendResult(res, {        
    data:obj ,
    code: 200
  });
});
// Elimina categoria
JsonRoutes.add("POST", "/api/removeCategoria", function (req, res, next) {
  var login = validatoken(req.headers.token);
  var obj = {};
  if(login){
      var datos = req.body
      var id = datos._id;
      if(datos.url != ""){
        Images.remove({_id: datos.url});
      }
     var result = Categorias.remove({_id:id});
     if(result){
      obj = {"mensaje":"Categoria eliminada exitosamente","status":1};
     }
  }else{
      obj = {"mensaje":"Error usuario no existe o inactivo","status":0};
  }   
  JsonRoutes.sendResult(res, {        
    data:obj ,
    code: 200
  });
});


  
global.atob = require("atob");


  JsonRoutes.add("POST", "/api/guardaImagen", function (req, res, next) {
    var login = validatoken(req.headers.token );
    var obj = {};
    if(login){
      var datos = req.body
      var obj = {};
      obj.imagen = datos.imagen;
      obj.nombre = datos.nombre;
      obj.creadoEl = moment().format();
  const buffer = getFile(obj.nombre,obj.imagen);
  Images.write(buffer, {
      fileName: obj.nombre,
      userId:login._id,
      fielId:login.profile.cliente,
      idCliente:login.profile.cliente,
     // fielId: 'abc123myId', //optional
      type: 'image/png'
    }, function (writeError, fileRef) {
      if (writeError) {
        throw writeError;
      } else {
          fileRef.name + ' is successfully saved to FS. _id: ' + fileRef._id;
          obj  =   {"url":fileRef._id};
      }
    });
    }else{
      obj.mensaje = "Error usuario no existe o inactivo"
  } 

setTimeout(function(){
    JsonRoutes.sendResult(res, {        
      data: obj,
      code: 200
    });
},100);
  });

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

import FileAPI from 'file-api';
const { File } = FileAPI;

 getFile = function(name,image){
  const i = image.indexOf('base64,');
  const buffer = Buffer.from(image.slice(i + 7), 'base64');
  //const file = new File({buffer: buffer, name, type: 'image/jpeg'});
 // return {"file":file,"buffer":buffer};
 return buffer;
}