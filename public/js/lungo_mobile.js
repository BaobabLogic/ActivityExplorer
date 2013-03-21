Lungo.init({
  name: 'Activity Explorer',
  resources: ['/partials/mobile.jade']
});

var App = (function(lng, undefined) {

  sectionTrigger = function(event) {
    event.stopPropagation();
    setTimeout(function() {
      lng.Notification.success("Event: " + event.type, "Layout events manager", "info", 2);
    }, 500);
  };

  articleTrigger = function(event) {
    event.stopPropagation();
    console.error(event);
  };

  environment = function(event) {
    var environment = lng.Core.environment();
    var el = lng.dom("section > article#environment");

    if (environment.os) {
      el.find("#os > strong").html(environment.os.name);
      el.find("#os > small").html(environment.os.version);
    }
    el.find("#resolution > strong").html(environment.screen.height + "p x " + environment.screen.width + "p");
    el.find("#navigator > strong").html(environment.browser);
    el.find("#navigator > small").html("Mobile: " + environment.isMobile);
  };

  return {
    sectionTrigger: sectionTrigger,
    articleTrigger: articleTrigger,
    environment: environment
  };

})(Lungo);
