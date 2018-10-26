Meteor.methods({
    'userData': function() {
        return Meteor.users.findOne(this.userId);
    },
    'eliminaFoto': function(id) {
        Images.remove(id);
    }
});