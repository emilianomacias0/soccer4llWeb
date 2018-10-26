if(Meteor.isClient){
    Equipos.before.insert(function (userId, doc) {
        
         doc.idCliente = Meteor.user().profile.cliente;
         doc.creadoEl = new Date();
      });
  }