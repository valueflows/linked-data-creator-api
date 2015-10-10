var
    async = require('async'),
    Entity = require('./entity'),
    mongoose = require('mongoose'),
    db,
    convertAttrsToJSONLD = require('./convert').convertAttrsToJSONLD,
    githubEntityCreate = require('./github').createEntity,
    githubEntityGet = require('./github').getEntity,
    config = {};
    
var entitySchema = mongoose.Schema({
    name: String,
    type: String,
    endpoint: String
});
var mEntity = mongoose.model('Entity', entitySchema);
    
function urlOrId (id) {
    return 'url'; //todo
}

function saveEntityToDB (entity, callback) {
    var
      e = new mEntity({
          endpoint: entity.get('id'),
          type: entity.get('type'),
          name: entity.get('displayName') // todo: adapt this for different types
      });
      
      e.save(function (err) {
         callback(err); 
      });
}

module.exports = {
    configure: function (opts, callback) {
        config.token = opts.token;
        config.dbUrl = opts.dbUrl;
        config.username = opts.username;
        
        mongoose.connect(opts.dbUrl);
        db = mongoose.connection;
        db.on('error', function () { callback(new Error('error connecting to db')) });
        db.once('open', function () {
           callback(); 
        });
    },
    disconnect: function () {
        // disconnect from the database
        mongoose.disconnect();
    },
    search: function (options, callback) {
        mEntity.find(options, function (err, results) {
            if (err) return callback(err);
            //results = results.map(function (r) { return new Entity(r) });
            callback(null, results);
        });
    },
    create: function (options, callback) {
        async.waterfall([
            async.apply(convertAttrsToJSONLD, options.attrs),
            function (json, next) {
                githubEntityCreate({
                    isSelf: options.isSelf,
                    json: json,
                    token: config.token,
                    username: config.username
                }, next);
            },
            function (entity, next) {
                saveEntityToDB(entity, function (err) {
                    next(err, entity);
                });
            }
        ], callback);
    },
    get: function (id, callback) {
        function proceed (url) {
            githubEntityGet({
                url: url,
                token: config.token,
            }, callback);
        }
        if (urlOrId === 'url') proceed(id);
        else {
            mEntity.findOne({ _id: id }, function (err, local) {
                if (err || !local) return callback(err || new Error('no entity found'));
                proceed(local.url);
            });
        }
    },
    update: function (entity, attributes, callback) {
        
    },
    delete: function (entity, callback) {
    
    }
};