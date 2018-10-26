import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
SimpleSchema.extendOptions(['autoform']);
require('moment/locale/es.js');
Jugadores = new Mongo.Collection("jugadores");

Jugadores.attachSchema(new SimpleSchema({
    nombre: {
        type: String,
        label: "Nombre",
        max: 50
    },
    apaterno: {
        type: String,
        label: "Apellido P"
    },
    amaterno: {
        type: String,
        label: "Apellido M"
    },
    numero: {
        type: Number,
        label: "Número",
        optional: true
    },
    equipo: {
        type: String,
        optional: false,
        autoform: {
            options: function() {
                var obj = [];
                var datos = Equipos.find({}, { activo: true }).fetch();
                for (var i = 0; i < datos.length; i++) {
                    var cat = Categorias.findOne({ _id: datos[i].categoria }).categoria
                    var car = { "label": datos[i].equipo + " - " + cat, "value": datos[i]._id };
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

Jugadores.allow({
    insert: function(userId, doc) {
        return true
    }
});


new Tabular.Table({
    name: "Jugadores",
    collection: Jugadores,
    autoWidth: false,
    responsive: false,
    selector(userId) {
        return { idCliente: Meteor.user().profile.cliente }
    },
    extraFields: ['imagen', 'amaterno'],
    columns: [
        { data: "nombre", title: "Nombre" },
        {
            data: "apaterno",
            title: "Apellidos",
            render(val, doc, val2) {
                if (val) {
                    console.log(doc);
                    console.log(val2);
                    return val + " " + val2.amaterno
                }
            }
        },
        {
            data: "equipo",
            title: "Equipo",
            render: function(val) {
                if (val) {
                    return Equipos.findOne({ _id: val }).equipo
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
    Meteor.publish('Jugadores.all', function() {
        return Jugadores.find({ idCliente: Meteor.user().profile.cliente });
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('Jugadores.all');
}