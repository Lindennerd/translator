function PageBuilder(configuration) {
    this.configuration = $.extend({
        container: '#main',
        templateUrl: null,
        data: null
    }, configuration, true);
}

PageBuilder.prototype.render = function () {
    return new Promise(function (resolve, reject) {
        if (!this.configuration.templateUrl) reject('the template url ir required');

        $.get(this.configuration.templateUrl)
            
            .done(function (templateText) {
                var hbTemplate = Handlebars.compile(templateText);
                var compiled = hbTemplate(this.configuration.data);
                $(this.configuration.container).children().remove();
                $(this.configuration.container).html(compiled);

                resolve();
            }.bind(this))

            .fail(function(err){
                throw err;
            }) 
    }.bind(this))
}
