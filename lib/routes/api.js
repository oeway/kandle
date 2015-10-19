newKandleController = RouteController.extend({
  name:'newKandle',
  template: 'newTopic',
  onBeforeAction: function () {
    this.next();
  },
  onRun: function () {
    this.next();
  },
  action: function () {
    if (this.ready()) {
      this.render('nav', { to: 'nav' });
      this.render();
    }
  },
  fastRender: true
});

Router.route('/api/new_kandle', {
  controller: newKandleController,
});