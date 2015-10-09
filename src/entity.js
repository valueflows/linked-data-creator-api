function Entity(json) {
    this.json = json;
}

Entity.prototype.get = function (key) {
    if (key === 'type' ||
        key === 'context' ||
        key === 'id') return this.json['@' + key];
    else return this.json[key];
};

Entity.prototype.set = function () {};

module.exports = Entity;