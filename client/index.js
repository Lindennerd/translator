$(function() {

    var questionnaires = null;

    $(document).ready(function(){
        $(window).trigger('hashchange');    

    });

    $(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});

    function render(url){
        var map = {
            '': function(){
                var createProject = new CreateProject();
                createProject.render();
            },

            '#project': function() {
                if(url.match(/#project\.*/)) {
                    var projectName = url.substr(url.indexOf('/')+1);
                    
                    var project = new Project(projectName);
                    project.render();
                }
            },

            '#erro': function() {

            }
        };

        var temp = url.split('/')[0];
        if(map[temp]){
            map[temp]();
        } else{
            // error pages
        }
    }
});