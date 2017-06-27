var database = require('./database');
var md5 = require('md5');

function Project(app) {

    this.validateProject = function (project) {
        return project.name && project.name !== '';
    }

    this.createProject = function (project, callback) {
        if (!this.validateProject(project)) {
            callback('invalid project creation attempt');
            return;
        } else {
            if (project.pwd) { 
                project.pwd = md5(project.pwd); 
            }

            database.addProject(project, function (err, result) {
                callback(err, result);
            });
        }
    }

    this.getProject = function (projectName, callback) {
        database.getProject(projectName, function (err, results) {
            if (err) {
                callback(err);
            } else {
                if (results.length <= 0) {
                    this.createProject({name: projectName}, callback)
                } else {
                    callback(err, results[0]);
                }
            }

        }.bind(this));
    }

    this.validatePassword = function (projectPwd, projectName, callback) {
        database.getProject(projectName, function (err, result) {
            if (err) {
                callback(err);
            } else {
                var isValid = result.length > 0 && md5(projectPwd) === result[0].pwd;
                callback(err, isValid);
            }
        })
    }

    app.route('/project')

        .post(function (req, res) {
            this.createProject(req.body, function (err, result) {
                if (!err) {
                    res.status(200).send(result);
                } else {
                    res.status(400).send(err);
                }
            })
        }.bind(this))

        .get(function (req, res) {
            this.getProject(req.query.name, function (err, result) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    if (result.pwd) {
                        res.status(400).send('this project require a password');
                    } else {
                        res.status(200).send(result);
                    }
                }
            });
        }.bind(this));

    app.route('/password')
        .post(function (req, res) {
            this.validatePassword(req.body.pwd, req.body.name, function (err, isValid) {
                if (err) {
                    res.status(400).send(err)
                } else if (isValid) {
                    this.getProject(req.body.name, function (err, result) {
                        if (err) {
                            res.status(400).send(err)
                        } else {
                            res.status(200).send(result);
                        }
                    })

                } else {
                    res.status(400).send('Invalid Password')
                }

            }.bind(this))
        }.bind(this))

}

module.exports = Project;