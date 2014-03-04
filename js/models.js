App.Show = DS.Model.extend({
    title: DS.attr('string'),
    episode: DS.attr('number')
});

// App.ApplicationAdapter = DS.RESTAdapter.extend({
//     namespace: 'service'
// });

App.Show.FIXTURES = [{
    id: '1',
    title: '俺のお嫁さんと一心同体',
    episode: '1'
}, {
    id: '2',
    title: '俺のお嫁さんと一心同体2',
    episode: '3'
}, {
    episode: '7',
    title: "世界征服 (正解制服)",
    id: '3'
}, {
    episode: '5',
    title: "いなり、くんくん",
    id: '4'
}];
