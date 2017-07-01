function PwdPage(projectName) {

    this.render = function () {
        var pb = new PageBuilder({
            container: '#main',
            templateUrl: './Pages/Project/PwdPage.html',
        });

        pb.render().then(function() {
            $('#passwordInput').submit(function (ev) {
                ev.preventDefault();
                var request = $.ajax({
                    url: 'http://localhost:8080/password/',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ name: projectName, pwd: $('input[type="password"]').val() })
                })
                    .done(function (project) {
                        var project = new Project();
                        project.createProjectPage(project);
                        
                    }.bind(this))
                    .fail(function () {
                        $('input[name="password"]').notify("Wrong Password", "error");
                    });

            }.bind(this))
        }.bind(this));
    }
}