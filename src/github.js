var
    Entity = require('./entity'),
    githubAPI = require('github'),
    async = require('async'),
    github = new githubAPI({
        version: '3.0.0'
    });

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    createEntity: function (opts, callback) {
        github.authenticate({
            type: "token",
            token: opts.token,
        });
        // todo: not this vvv
        var repoName = 'open-data-' + (opts.isSelf ? 'self' : getRandomInt(1, 50));
        
        async.waterfall([
            async.apply(github.repos.create, { name: repoName }),
            function (githubRepo, next) {
                opts.json['@id'] = 'https://raw.githubusercontent.com/' +
                                 opts.username + '/' + repoName +
                                 '/master/data.json';
                var content = new Buffer(JSON.stringify(opts.json)).toString('base64');
                github.repos.createFile({
                     user: opts.username,
                     repo: repoName,
                     path: 'data.json',
                     message: 'create data.json',
                     content: content
                }, next);
            },
            function (githubFile, next) {
                next(null, new Entity(opts.json));
            }
        ], callback)
    },
    getEntity: function () {}
};