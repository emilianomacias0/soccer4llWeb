Meteor.startup(function() {
    moment.locale('es');
    T9n.setLanguage('es');
});

 validatoken = function(token){
     var data = Meteor.users.findOne({"services.resume.loginTokens.hashedToken":token});
     var client = null;
     if(data != undefined){
        client = data;
     }else{
        client = false;
     }
   return  client ;
}

userData = function(id){
    if(id){
        return Meteor.users.findOne(id);
    }
}

