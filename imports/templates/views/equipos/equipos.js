import './equipos.html';


Template.Equipos.events({
    'submit form':function(evt){
        Session.set('idimagen',null);
    }
});