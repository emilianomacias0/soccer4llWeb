import './categorias.html';

Template.Categorias.onRendered(function() {
    Session.set("edit", "");
});
Template.Categorias.events({
    'submit form': function(evt) {
       // evt.target.reset();
        Session.set('idimagen', null);
        Session.set("edit", "");
    }
});

Template.Categorias.helpers({
    'estado': function() {
        if (Session.get("edit") != "") {
            return false;
        } else {
            return true
        }
    },
    'doc': function() {
        if (Session.get("edit") != "") {
            var imagen = Session.get("edit");
            if (Images.findOne({ _id: imagen.imagen })) {
                Session.set('idimagen', imagen.imagen);
            }
            return Session.get("edit")
        }
    }
});

Tracker.autorun(function() {
    var sessionVal = Session.get('idimagen');
    $("input[data-schema-key='imagen']").val(sessionVal);
});