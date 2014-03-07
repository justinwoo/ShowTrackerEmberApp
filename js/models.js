App.Show = DS.Model.extend({
    title: DS.attr('string'),
    episode: DS.attr('number')
});

App.ApplicationAdapter = DS.LSAdapter.extend({});

App.Show.FIXTURES = [{
    id: '1',
    title: 'Dragon Bowl S',
    episode: '1'
}, {
    id: '2',
    title: 'Yu Yu Hack Show',
    episode: '3'
}, {
    episode: '7',
    title: "Yet Another Terrible VN Adaptation",
    id: '3'
}, {
    episode: '5',
    title: "Yet Another Yoko Kanno Show",
    id: '4'
}];
