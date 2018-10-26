import './login.html';

Template.app_login.onRendered(function() {


});
Template.app_login.onCreated(function() {


});
Template.app_login.helpers({

});
Template.app_login.events({
    'submit form': function(evt) {
        evt.preventDefault();
        var email = evt.target.username.value;
        var password = evt.target.password.value;
        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {

            } else {
                

            }
        });

    }

});
Template.app_login.onDestroyed({


});