var createClass = function(obj) {
	var fun = function() {};
	for (var prop in obj) {
		if( obj.hasOwnProperty( prop ) ) {
			if(prop === 'initialize') {
				fun = obj[prop];
			}else {
				fun.prototype[prop] = obj[prop];
			}
		}
	}

	return fun;
}


var Class = function(child, parent) {
	parent = parent || Object;
	child = createClass(child);

	if(parent) {
		child.prototype.__proto__ = new parent();
		child.prototype.constructor  = child;

		child.__super__ = parent;
		var recursiveSuperClass = child;
		child.prototype.super = function() {
			var args = Array.prototype.splice.call(arguments, 1);
			if(recursiveSuperClass.__super__ !== Object) {
				recursiveSuperClass = recursiveSuperClass.__super__;
			}else {
				recursiveSuperClass = parent;
			}
			return recursiveSuperClass.prototype[arguments[0]].apply(this, args);
		};
	}else {
		child.__super__ = Object;
	}

	

	return child;

};

module.exports = Class;

