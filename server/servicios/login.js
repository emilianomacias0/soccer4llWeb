
 T9n.setLanguage('es_ES_formal');

JsonRoutes.add("POST", "/api/login", function (req, res, next) {
    //var id = req.params.id;
    var datos = req.body
    var obj = {};
    obj.email = datos.email;
    obj.password = datos.password;
    var result = loginUser(obj);
    JsonRoutes.sendResult(res, {
        data: result,
        code: 200
    });
});

loginUser = function (data) {
    var res ;
    var user = Meteor.users.findOne({
        'emails.address': data.email
    });

    //if user is found
    if (user) {
        //get paramter password
        var password = data.password;
        // Creates a stamped login token

        //authenticate user
        var result = Accounts._checkPassword(user, password);
        if (result.error) {
            var resultado = result.error;
            if(resultado.reason = "Incorrect password"){
                res = {"mensaje":"Contraseña incorrecta","status":0};
            }
            return res;
        } else {
            // cutoff = (new Date()) - 1000// (24*60*60)*1000
            // var query = Meteor.users.update(result.userId, {
            //   $pull:{
            //     'services.resume.loginTokens':{
            //       when: {$lt: new Date(cutoff)}}}
            // },
            // {multi : true});
            // console.log(query);
            // var stampedLoginToken = Accounts._generateStampedLoginToken();
            // Accounts._insertLoginToken(result.userId, stampedLoginToken);
            var user = Meteor.users.findOne({_id: result.userId});
            if(user.services.resume){
                res = user;
            }else{
                var stampedLoginToken = Accounts._generateStampedLoginToken();
                 Accounts._insertLoginToken(result.userId, stampedLoginToken);
                 res = Meteor.users.findOne({_id: result.userId});
            }
            
            return res;
        }
    } else {
        //if user is not found
        return {
            "mensaje":"Usuario no encontrado","status":0
        }
    }
}