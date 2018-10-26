import './upload.html'
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
Template.uploadForm.onCreated(function() {
    this.currentUpload = new ReactiveVar(false);
    Session.set('idimagen', null);
});

Template.uploadForm.helpers({
    currentUpload() {
        return Template.instance().currentUpload.get();
    }
});

Template.uploadForm.events({
    'change #fileInput' (e, template) {
        if (Session.get('idimagen') != null) {
            Meteor.call('eliminaFoto', Session.get('idimagen'));
            Session.set('idimagen', null);
        }
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case
            // multiple files were selected
            const upload = Images.insert({
                file: e.currentTarget.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);

            upload.on('start', function() {
                template.currentUpload.set(this);
            });

            upload.on('end', function(error, fileObj) {
                if (error) {
                    console.log('Error during upload: ' + error);
                } else {
                    console.log('File "' + fileObj.name + '" successfully uploaded');
                    Session.set('idimagen', fileObj._id);
                }
                template.currentUpload.set(false);
            });

            upload.start();
        }
    }
});


Template.file.helpers({
    imageFile() {
        console.log(Images.findOne({ _id: Session.get('idimagen') }));
        return Images.findOne({ _id: Session.get('idimagen') });
    },
    // videoFile() {
    //   return Videos.findOne();
    // }
});

Template.image.helpers({
    imageFile() {
        return Images.findOne({ _id: Session.get('idimagen') });
    }
});