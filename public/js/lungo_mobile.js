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

App.carousel = {prev: null, next: null};

Lungo.Events.init({

});

Lungo.ready(function() {

    // Lungo.Aside.show();
    // Lungo.Router.section("notification");

    // Lungo.Notification.show();
    // Lungo.Notification.show("home", "Please wait...");
    // Lungo.Notification.show("magic");

    // Lungo.Notification.show("Please wait", "user", 2, function(){ alert(1); });

    // Lungo.Notification.error('Lorem ipsum dolor sit amet', "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis veritatis similique sed qui doloribus inventore doloremque temporibus ab totam...", 'remove');
    // Lungo.Notification.success('Lorem ipsum dolor sit amet', "    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis veritatis similique sed qui doloribus inventore doloremque temporibus ab totam...", 'ok');
    // Lungo.Notification.confirm({
    //     icon: 'user',
    //     title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet nulla dolorum hic eum debitis dolorem expedita? Commodi molestiae tempora totam explicabo sed deserunt cum iusto eos perspiciatis ea in.',
    //     accept: {
    //         icon: 'checkmark',
    //         label: 'Accept',
    //         callback: function(){ alert("Yes!"); }
    //     },
    //     cancel: {
    //         icon: 'close',
    //         label: 'Cancel',
    //         callback: function(){ alert("No!"); }
    //     }
    // });
    // Lungo.Notification.html("<h1 class='title'>Title</h1><article>aslkdkals</article><a href='#' class='button large anchor' >Seleccionar</a>", "Cancelar");
    // Lungo.Notification.push("Lorem ipsum dolor sit amet", "home");

});