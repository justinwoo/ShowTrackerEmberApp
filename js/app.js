App = Ember.Application.create();
App.Store = DS.Store.extend({
    // adapter: DS.FixtureAdapter
});

App.ShowsController = Ember.ArrayController.extend({
    modalId: null,
    modalTitle: null,
    modalEpisode: null,
    rowNewTitle: null,
    rowNewEpisode: 1,

    actions: {
        increment: function(item) {
            var episode = parseInt(item.get('episode'));
            episode += 1;
            item.set('episode', episode);
            item.save();
        },
        decrement: function(item) {
            var episode = parseInt(item.get('episode'));
            episode -= 1;
            item.set('episode', episode);
            item.save();
        },
        createShow: function() {
            var newTitle = this.get('rowNewTitle');
            var newEpisode = this.get('rowNewEpisode');
            var newShow = this.store.createRecord('show', {
                title: newTitle,
                episode: newEpisode
            });
            this.transitionTo('shows', newShow.save());
        },
        edit: function() {
            var editId = this.get('modalId');
            var newTitle = this.get('modalTitle');
            var newEpisode = this.get('modalEpisode');
            this.store.find('show', editId).then(function(item) {
                item.setProperties({title: newTitle,
                                    episode: newEpisode});
                item.save();
                $('#editModal').modal("hide");
            }, function(err) {
                console.error(err);
            });
        },
        confirmEdit: function(item) {
          this.set('modalId', item.get('id'));
          this.set('modalTitle', item.get('title'));
          this.set('modalEpisode', item.get('episode'));          
          $('#editModal').modal("show");
        },
        cancelEdit: function(item) {
          modalId = null;
          modalTitle = null;
          modalEpisode = null;
          $('#editModal').modal("hide");
        },
        delete: function() {
            var deleteId = this.get('modalId');
            this.store.find('show', deleteId).then(function(item) {
                item.deleteRecord();
                item.save();
                $('#deleteModal').modal("hide");
            }, function(err) {
                console.error(err);
            });
        },
        confirmDelete: function(item) {
            $('#deleteModal').modal("show");
            this.set('modalId', item.get('id'));
            this.set('modalTitle', item.get('title'));
        },
        cancelDelete: function() {
            modalId = null;
            modalTitle = null;
            $('#deleteModal').modal("hide");
        }
    }
});

App.EditshowController = Ember.ObjectController.extend({
    newTitle: null,
    newEpisode: null,
    actions: {
        doneEditing: function(item) {
            var newTitle = this.get('newTitle');
            var newEpisode = this.get('newEpisode');
            if (newTitle != null) {
                item.set('title', newTitle);
            }
            if (newEpisode != null) {
                item.set('episode', newEpisode);
            }
            item.save();
        }
    }
});
