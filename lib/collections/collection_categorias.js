import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
SimpleSchema.extendOptions(['autoform']);
Categorias = new Mongo.Collection("categorias");

Categorias.attachSchema(new SimpleSchema({
    categoria: {
        type: String,
        label: "Categoria",
        max: 50
    },
    imagen: {
        type: String,
        label: "Imagen",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    activo: {
        type: Boolean,
        label: "Activo",
        autoValue: function() {
            return true
        }
    },
    creadoEl: {
        type: Date,
        autoform: {
            type: "hidden"
        },
        optional:true
    },
    idCliente: {
        type: String,
        autoform: {
            type: "hidden"
        },
        optional:true
        // autoValue: function() {
        //     //if(Meteor.isClient){
        //         console.log("cliente",Meteor.user().profile.cliente);
        //         return Meteor.user().profile.cliente;
        //    // }
            
        // }
    }
}));

Categorias.allow({
    insert: function(userId, doc) {
        return true
    },
    update: function(userId, doc) {
        return true
    }
});


new Tabular.Table({
    name: "Categorias",
    collection: Categorias,
    autoWidth: false,
    responsive: false,
    selector(userId) {
        return { idCliente: Meteor.user().profile.cliente }
    },
    extraFields: ['imagen', 'activo'],
    columns: [
        { data: "categoria", title: "Categoria" },
        {
            data: "creadoEl",
            title: "Registro",
            render: function(val) {
                if (val instanceof Date) {
                    return moment(val).calendar();
                }
            }
        },
        {
            title: "Logo",
            tmpl: Meteor.isClient && Template.showImagen
        },
        {
            tmpl: Meteor.isClient && Template.editCategoria
        }
    ]
});

Categorias.helpers({
    link() {
        return Images.findOne(this.imagen).link();
    }
});


if (Meteor.isServer) {
    Meteor.publish('categorias.all', function() {
      var idCliente = Meteor.user().profile.cliente;
        return Categorias.find({ idCliente: idCliente });
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('categorias.all');
}