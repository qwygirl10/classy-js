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
		
		var recursiveSuperClass = parent;
		child.prototype.super = function() {
	      var args = Array.prototype.splice.call(arguments, 1);
	      var method = recursiveSuperClass.prototype[arguments[0]];
	      recursiveSuperClass = recursiveSuperClass.__super__;
	      if(!recursiveSuperClass.prototype[arguments[0]]) {
	         recursiveSuperClass = parent;
	      }
	      return method && method.apply(this, args);
		};
	}else {
		child.__super__ = Object;
	}

	

	return child;

};

module.exports = Class;

