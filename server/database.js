const mongo = require('mongodb');

class database {
    constructor() {
        this.url = 'mongodb://localhost:27017/translator';
        this.mongoClient = mongo.MongoClient;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.mongoClient.connect(this.url)
                .then((db) => { resolve(db) })
                .catch((err) => { reject(err) });
        })
    }

    addProject(project) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let projectsCollection = db.collection('project');
                projectsCollection.insert(project)
                    .then((result) => {
                        resolve(result);
                        db.close();
                    })
                    .catch((err) => {
                        reject(err);
                        db.close();
                    })
            })
        })
    }

    getProject(projectName) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let projectsCollection = db.collection('project');
                let results = projectsCollection.find({ "name": projectName });

                results.toArray((err, docs) => {
                    if (err) reject(err);
                    else resolve(docs[0]);

                    db.close();
                })

            })
        })
    }
}

module.exports = new database();