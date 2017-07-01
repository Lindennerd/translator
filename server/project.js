const database = require('./database');
const md5 = require('md5');

class Project {
    constructor(app) {
        this.app = app;

        this.app.route('/project')
            .post((req, res) => {
                this.createProject(req.body)
                    .then((result) => { res.status(200).send(result) })
                    .catch((err) => { res.status(400).send(err) })
            })

            .get((req, res) => {
                this.getProject(req.query.name)
                    .then((project) => {
                        if(project.pwd) res.status(303).send('this project requires a password')
                        else res.status(200).send(project);
                    })
                    .catch((err) => { res.send(400).send(400); })
            });
        
        this.app.route('/password')
            .post((req, res) => {
                var project = req.body;
                this.validatePassword(project.pwd, project.name)
                    .then((isValid) => { 
                        if(isValid) {
                            this.getProject(project.name)
                                .then((project) => { res.status(200).send(project) })
                                .catch((err) => { res.status(400).send(err) })
                        } else {
                            res.status(400).send('Invalid Password');
                        }
                     })
            })
    }

    validateProject(project) {
        return project.name && project.name !== '';
    }

    createProject(project) {
        return new Promise((resolve, reject) => {
            if (this.validateProject(project)) {
                project.pwd = md5(project.pwd);

                database.addProject(project)
                    .then((result) => { resolve(result); })
                    .catch((err) => { reject(err); });
            } else {
                reject('invalid project creation attempt');
            }

        })
    }

    getProject(projectName) {
        return new Promise((resolve, reject) => {
            database.getProject(projectName)
                .then((project) => {
                    if (!project) {
                        this.createProject({ name: projectName })
                            .then((result) => { resolve(result); })
                            .catch((err) => { reject(err); })
                    } else {
                        resolve(project);
                    }
                })
        });
    }

    validatePassword(password, projectName) {
        return new Promise((resolve, reject) =>{
            database.getProject(projectName)
                .then((project) => { resolve(md5(password) === project.pwd); })
                .catch((err) => { reject(err); });
        });
    }
}

module.exports = Project;