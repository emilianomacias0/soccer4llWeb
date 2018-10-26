import './jugadores.html';

Template.Jugadores.events({
    'submit form':function(evt){
        Session.set('idimagen',null);
    }
});