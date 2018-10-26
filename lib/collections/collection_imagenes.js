import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

Images = new FilesCollection({
    collectionName: 'Images',
    allowClientCode: true, // Disallow remove files from Client
    onBeforeUpload(file, data) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        file.idCliente = Meteor.user().profile.cliente;
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
    }
});

if (Meteor.isServer) {
    Meteor.publish('files.images.all', function() {
        // return Images.find({ idCliente: Meteor.user().profile.cliente }).cursor;
        return Images.find().cursor;
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('files.images.all');
}