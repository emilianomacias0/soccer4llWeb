if(Meteor.isClient){
    Categorias.before.insert(function (userId, doc) {
        console.log(userId);
        doc.idCliente = Meteor.user().profile.cliente;
        doc.creadoEl = new Date();
      });
  }