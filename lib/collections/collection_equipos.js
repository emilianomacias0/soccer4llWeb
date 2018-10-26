import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
SimpleSchema.extendOptions(['autoform']);


Equipos = new Mongo.Collection("equipos");

Equipos.attachSchema(new SimpleSchema({
    equipo: {
        type: String,
        label: "Equipo",
        max: 50
    },
    categoria: {
        type: String,
        optional: true,
        autoform: {
            options: function() {
                var obj = [];
                var datos = Categorias.find().fetch();
                for (var i = 0; i < datos.length; i++) {
                    var car = { "label": datos[i].categoria, "value": datos[i]._id };
                    obj.push(car);
                }
                return obj;
            }
        }
    },
    imagen: {
        type: String,
        label: "imagen",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    activo: {
        type: Boolean,
        label: "Activo"
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
    }
}));

Equipos.allow({
    insert: function(userId, doc) {
        return true
    },
    update: function(userId, doc) {
        return true
    }
});


new Tabular.Table({
    name: "Equipos",
    collection: Equipos,
    autoWidth: false,
    responsive: false,
    selector(userId) {
        return { idCliente: Meteor.user().profile.cliente }
    },
    extraFields: ['imagen'],
    columns: [
        { data: "equipo", title: "Equipo" },
        {
            data: "categoria",
            title: "Categoria",
            render: function(val) {
                if (val) {
                    return Categorias.findOne({ _id: val }).categoria
                }
            }
        },
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
        //   {
        //     tmpl: Meteor.isClient && Template.editCategoria
        //   }
    ]
});


if (Meteor.isServer) {
    Meteor.publish('Equipos.all', function() {
        return Equipos.find({ idCliente: Meteor.user().profile.cliente });
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('Equipos.all');
}