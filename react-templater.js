
function Templater() {
    this.templates = {};
};

Templater.prototype.register = function(name, template) {
    this.templates[name] = template;
};

Templater.prototype.render = function(name, component) {
    return this.templates[name](component);
};

var templater = new Templater();