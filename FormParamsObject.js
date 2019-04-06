function FormParamsObject(objectParams) {
    this.objectParams = objectParams;

    this.__paramsSeparator = '.';

    this.getFullObject = function(){
        return this.objectParams;
    };

    this.getObjectProperty = function(propPath){
        this.__checkIsString(propPath);
        var path = propPath.split(this.__paramsSeparator);
        var result = this.objectParams;
        for (var i in path) {
            if (result.hasOwnProperty(path[i])) {
                result = result[path[i]];
            } else {
                return null;
            }
        }
        return result;
    };

    this.setObjectProperty = function(propPath, value){
        this.__checkIsString(propPath);
        var path = propPath.split(this.__paramsSeparator);
        var i = -1;
        var setVal = function(obj, val){
            i++;
            var key = path[i],
                isLast = i === path.length - 1;

            if (!obj.hasOwnProperty(key) || ( typeof obj[key] !== 'object' || Array.isArray(obj[key]) )) {
                obj[key] = {};
            }

            if (isLast) {
                obj[key] = val;
            } else {
                obj = setVal(obj[key], val);
            }
            return obj;
        };
        setVal(this.objectParams, value);
        return value;
    };


    this.convertObjectToArray = function(propPath){
        this.__checkIsString(propPath);
        var property = this.getObjectProperty(propPath),
            keys = Object.keys(property),
            result = [];

        keys.reduce(function(obj,key) {
            for (var i =0; i < property[key].length; i++) {
                if (result[i] === undefined) result[i] = {};
                result[i][key] = property[key][i];
            }
        }, []);
        return result;
    };


    this.__checkIsString = function(o){
        if (typeof o !== 'string') {
            throw new SyntaxError('Invalid data type: (' + typeof o + '). String expected.');
        }
    };

    this.__isObject = function(o){
        return typeof o === 'object' && !Array.isArray(o)
    };
}

var params = new FormParamsObject(
    {
        param1: 'test1',
        param2: {
            param21: 'test2',
            param22: {
                number: ["123", "456"],
                text: ["text1", "text2"],
            }
        }
    }
);