var mongo = require('mongodb');

function database () {

    this.url = 'mongodb://localhost:27017/translator';
    this.connect = function(callback) {
        mongo.MongoClient.connect(this.url, function(err, db){
            if(err) {
                throw err;
            } else {
                callback(db);
            }
        })
    };

    this.addProject = function(project, callback) {
        this.connect(function(db){
            var projectsCol = db.collection('project');
            projectsCol.insert(project, function(err, result){
                callback(err, result);
            });

            db.close();
        });
    }

    this.getProject = function(projectName, callback){
        
        this.connect(function(db){
            var projectsCol = db.collection('project');
            var results = projectsCol.find({"name": projectName});

            results.toArray(function(err, docs){
                callback(err, docs);
            });         

            db.close();
        });
    }

}

module.exports = new database();