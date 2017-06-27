function CreateProject() {

    this.saveProject = function (project) {
        $.ajax({
            url: 'http://localhost:8080/project/',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(project),
            success: function (msg) {
                console.log(msg);
                window.location.href = '/#project/' + project.name;
            },
            failure: function (data) {
                console.log(data);
                console.log('ERROR');
            }
        });
    }

    this.render = function () {
        var pb = new PageBuilder({
            container: '#main',
            templateUrl: './Pages/CreateProject/CreateProject.html'
        });

        pb.render(function () {
            $('input[name="projectName"]').val(makeid());

            $('form').submit(function (ev) {
                ev.preventDefault();
                var project = {
                    name: $('input[name="projectName"]').val(),
                    pwd: $('input[name="projectPwd"]').val(),
                    text: $('textarea').val()
                };

                this.saveProject(project);

            }.bind(this));
        }.bind(this));
    }
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}