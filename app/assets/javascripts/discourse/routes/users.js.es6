export default Discourse.Route.extend({
  queryParams: {
    period: { refreshModel: true },
    order: { refreshModel: true },
    asc: { refreshModel: true },
    name: { refreshModel: true, replace: true }
  },

  refreshQueryWithoutTransition: true,

  titleToken() {
    return I18n.t('directory.title');
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.setProperties({
        period: 'weekly',
        order: 'likes_received',
        asc: null,
        name: ''
      });
    }
  },

  model(params) {
    // If we refresh via `refreshModel` set the old model to loading
    this._params = params;
    return this.store.find('directoryItem', params);
  },

  setupController(controller, model) {
    const params = this._params;
    controller.setProperties({ model, period: params.period, nameInput: params.name });
  }
});
