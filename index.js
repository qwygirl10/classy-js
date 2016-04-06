function Class(options) {
	var A = function() {};
	for (var key in options) {
		if(key === 'initialize') {
			A = options[key];
		}else {
			A.prototype[key] = options[key];
		}
	}
	return A;
};

module.exports = Class;

