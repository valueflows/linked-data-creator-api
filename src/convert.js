var
    fs = require('fs'),
    path = require('path');

function createPath(type) {
    var p = path.join(__dirname, '/json/' + type + '.json');
    return p;
}

module.exports = {
    convertAttrsToJSONLD: function (attrs, callback) {
        fs.readFile(createPath(attrs.type), 'utf8', function (err, json) {
            if (err) return callback(err);
            json = JSON.parse(json);
            Object.keys(attrs).forEach(function (key) {
                if (json[key] === '') {
                    json[key] = attrs[key];
                }
            });
            callback(null, json);
        });
    }  
};