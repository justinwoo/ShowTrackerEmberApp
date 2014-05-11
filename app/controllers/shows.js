export default Ember.ArrayController.extend({
    modalId: null,
    modalTitle: null,
    modalEpisode: null,
    modalSeason: null,
    rowNewTitle: '',
    rowNewEpisode: 1,
    rowNewSeason: 1,

    actions: {
        incrementEpisode: function(item) {
            var episode = parseInt(item.get('episode'));
            episode += 1;
            item.set('episode', episode);
            item.save();
        },
        decrementEpisode: function(item) {
            var episode = parseInt(item.get('episode'));
            episode -= 1;
            item.set('episode', episode);
            item.save();
        },
        incrementNewEpisode: function() {
            var episode = this.get('rowNewEpisode');
            this.set('rowNewEpisode', episode + 1);
        },
        decrementNewEpisode: function() {
            var episode = this.get('rowNewEpisode');
            this.set('rowNewEpisode', episode - 1);
        },
        incrementSeason: function(item) {
            var season = parseInt(item.get('season'));
            season += 1;
            item.set('season', season);
            item.save();
        },
        decrementSeason: function(item) {
            var season = parseInt(item.get('season'));
            season -= 1;
            item.set('season', season);
            item.save();
        },
        incrementNewSeason: function() {
            var season = this.get('rowNewSeason');
            this.set('rowNewSeason', season + 1);
        },
        decrementNewSeason: function() {
            var season = this.get('rowNewSeason');
            this.set('rowNewSeason', season - 1);
        },
        createShow: function() {
            var newTitle = this.get('rowNewTitle').trim();
            if (newTitle === '') {
                this.set('rowNewTitle', '');
                return false;
            }
            var newEpisode = this.get('rowNewEpisode');
            var newSeason = this.get('rowNewSeason');
            var newShow = this.store.createRecord('show', {
                title: newTitle,
                episode: newEpisode,
                season: newSeason
            });
            this.set('rowNewTitle', '');
            this.set('rowNewEpisode', 1);
            this.set('rowNewSeason', 1);
            this.transitionToRoute('shows', newShow.save());
        },
        edit: function() {
            var editId = this.get('modalId');
            var newTitle = this.get('modalTitle');
            var newEpisode = this.get('modalEpisode');
            var newSeason = this.get('modalSeason');
            this.store.find('show', editId).then(function(item) {
                item.setProperties({title: newTitle,
                                    episode: newEpisode,
                                    season: newSeason});
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
          this.set('modalSeason', item.get('season'));
          $('#editModal').modal("show");
        },
        cancelEdit: function(item) {
          this.set('modalId', null);
          this.set('modalTitle', null);
          this.set('modalEpisode', null);
          this.set('modalSeason', null);
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
            this.set('modalId', null);
            this.set('modalTitle', null);
            this.set('modalEpisode', null);
            this.set('modalSeason', null);
            $('#deleteModal').modal("hide");
        }
    }
});
