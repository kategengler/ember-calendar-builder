// Right now events have to be ember objects with a beginTime and an endTimeKey
// This is because we have to access times on the event
// The solution we should move to is to have that be the default accessor,
// but allow a beginTimeAccessor and endTimeAccessor in the options


import Ember from 'ember';

export default Ember.Component.extend({
  eventCount: 0,

  defaultOptions: {
    hasNewEventButton: false
  },

  init: function () {
    this.applyOptions();
    this.get('calendar').component = this; // this is probably bad :(
    this._super();
  },

  applyOptions: function () {
    var _this = this;
    var givenOptions = this.get('options');
    var defs = this.get('defaultOptions');
    var options = $.extend(defs, givenOptions);
    Object.keys(options).forEach(function (optionKey) {
      _this[optionKey] = options[optionKey];
    });
  },

  currentMonth: function () {
    return moment(this.get('date')).startOf('month');
  }.property('date'),

  currentMonthKey: function () {
    return moment(this.get('currentMonth')).format('YYYY-MM');
  }.property('currentMonth'),

  currentMonthFormatted: function () {
    return moment(this.get('currentMonth')).format('MMMM YYYY');
  }.property('currentMonth'),

  month: function () {
    return this.get('calendar').showMe(this.get("currentMonthKey"));
  }.property('currentMonthKey', 'eventCount'),

  actions: {
    makeDayActive: function (day) {
      this.calendar.makeActive(day.dateKey); 
      this.set('month', this.calendar.showMe(this.get('currentMonthKey')));
    },

    newEvent: function (day) {
      this.sendAction('newEvent', day);
    }
  }

});
