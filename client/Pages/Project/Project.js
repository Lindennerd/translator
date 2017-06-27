function Project(projectName) {

    this.socket = null;

    this.setSocket = function () {
        this.socket = io();
    }

    this.createProjectPage = function (project) {
        var pb = new PageBuilder({
            container: '#main',
            templateUrl: './Pages/Project/Project.html',
            data: project
        });

        pb.render(function () {
            this.setSocket();
            $('#editor').on('blur keyup paste input', function (ev) {
                var text = $(ev.target).text();
                this.socket.emit('text changed', { text: text, user: '' });
                this.socket.on('text changed', function (text) {
                    $('#editor').text(text);
                })


            }.bind(this));
        }.bind(this));
    }

    this.createPwdPage = function () {
        var pb = new PageBuilder({
            container: '#main',
            templateUrl: './Pages/Project/PwdPage.html',
        });

        pb.render(function () {
            $('#passwordInput').submit(function (ev) {
                ev.preventDefault();
                var request = $.ajax({
                    url: 'http://localhost:8080/password/',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ name: projectName, pwd: $('input[type="password"]').val() })
                })
                    .done(function (project) {
                        this.createProjectPage(project)
                    }.bind(this))
                    .fail(function(){
                        $('input[name="password"]').notify("Wrong Password", "error");
                    });

            }.bind(this))
        }.bind(this));
    }

    this.render = function () {
        var request = $.ajax({
            url: 'http://localhost:8080/project/',
            type: 'GET',
            contentType: 'application/json',
            data: { name: projectName },
        })
            .done(function (project) {
                this.createProjectPage(project);
            }.bind(this))
            .fail(function (msg, resp) {
                this.createPwdPage();
            }.bind(this));



    }

}