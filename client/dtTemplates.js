Template.editCategoria.events({
    'click .btn': function(evt) {
        Session.set('idimagen', this.imagen);
        Session.set("edit", this);
    }
});

Template.showImagen.helpers({
    'urlImagen': function() {
        if (this.imagen != null) {
            return Images.findOne({ _id: this.imagen });
        }

    }
});