function Class(obj) {
	var A = function() {};
	for (var prop in obj) {
		if( obj.hasOwnProperty( prop ) ) {
			if(prop === 'initialize') {
				A = obj[prop];
			}else {
				A.prototype[prop] = obj[prop];
			}
		}
	}
	return A;
};

module.exports = Class;

