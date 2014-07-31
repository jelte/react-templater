
function Templater() {
    this.templates = {};
};

Templater.prototype.register = function(name, template) {
    this.templates[name] = template;
};
Templater.prototype.render = function(name, component) {
    if ( typeof this.templates[name] != 'function') {
        if ( this.templates[name].substr(0,1) == '<' ) {
            this.templates[name] = window.JSXTransformer.transform("/** @jsx React.DOM */\n"+this.templates[name]).code
        } else {
            if ((this.templates[name].match(/\n/g)||[]).length == 0 ) {
                var code = '';
                $.ajax(this.templates[name], {
                    method: 'GET',
                    async: false,
                    complete: function(jqXHR) {
                        code = jqXHR.responseText;
                    }
                });
                this.templates[name] = window.JSXTransformer.transform("/** @jsx React.DOM */\n"+code).code;
            }
        }
        return eval(this.templates[name]);
    }
    return this.templates[name](component);
};

var templater = new Templater();