App.Router.map(function () {
  this.resource('about');  
  this.resource('shows');
});

App.ShowsRoute = Ember.Route.extend({  
  model: function() {
    return this.store.findAll('show');
  }
});
