function PageBuilder(configuration) {
        this.configuration = $.extend({
            container: '#main',
            templateUrl: null,
            data: null
        }, configuration, true);
}

PageBuilder.prototype.render = function(callback) {
    if(this.configuration.templateUrl){
        $.get(this.configuration.templateUrl, function(templateText){
            var hbTemplate = Handlebars.compile(templateText);
            var compiled = hbTemplate(this.configuration.data);
            $(this.configuration.container).children().remove();
            $(this.configuration.container).html(compiled);

            if(callback) callback();
        }.bind(this));
    }
}