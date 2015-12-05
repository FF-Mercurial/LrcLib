exports.trim = function (str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
};

exports.formatDatetime = function (str) {
    return moment(str).format('YYYY-MM-DD HH:mm');
};

exports.parallel = function (tasks, cb) {
    if (tasks.length === 0) cb();

    var finished = 0,
        done = false;

    tasks.forEach(function (task) {
        task(foo);
    });

    function foo(err) {
        if (done) return;
        if (err) {
            cb && cb(err);
            done = true;
            return;
        }
        if (++finished === tasks.length) cb && cb(err);
    }
};

exports.series = function (tasks, cb) {
    (function foo(err) {
        if (err) return cb(err);
        else if (tasks.length === 0) return cb();
        else (tasks.shift())(foo);
    })();
};

exports.deepCopy = deepCopy;

function deepCopy(obj) {
    var res, i;
    if (obj instanceof Array) {
        res = [];
        for (i = 0; i < obj.length; i++) res.push(deepCopy(obj[i]));
    } else if (typeof obj === 'object' && obj !== null ) {
        res = {};
        for (i in obj) {
            if (obj.hasOwnProperty(i)) res[i] = deepCopy(obj[i]);
        }
    } else {
        res = obj;
    }
    return res;
}

exports.jsonCopy = function (obj) {
    if (typeof obj === 'undefined') return undefined;
    else return JSON.parse(JSON.stringify(obj));
};

exports.jsonEqual = function (obj0, obj1) {
    if (typeof obj0 === 'undefined' || typeof obj1 === 'undefined') {
        return typeof obj0 === 'undefined' && typeof obj1 === 'undefined'
    } else {
        return JSON.stringify(obj0) === JSON.stringify(obj1);
    }
};

exports.deepEqual = function deepEqual(obj0, obj1) {
    var i;
    if (obj0 instanceof Array || obj1 instanceof Array) {
        if (!(obj0 instanceof Array && obj1 instanceof Array)) return false;
        if (obj0.length !== obj1.length) return false;
        for (i = 0; i < obj0.length; i++) {
            if (!deepEqual(obj0[i], obj1[i])) return false;
        }
    } else if (typeof obj0 === 'object') {
        if (!(typeof obj1 === 'object')) return false;
        if (obj0 === null || obj1 === null && obj0 !== obj1) return false;
        for (i in obj0) {
            if (obj0.hasOwnProperty(i) && !deepEqual(obj0[i], obj1[i])) return false;
        }
        for (i in obj1) {
            if (obj1.hasOwnProperty(i) && !deepEqual(obj0[i], obj1[i])) return false;
        }
    } else {
        return obj0 === obj1;
    }
    return true;
};

exports.union = function (obj1, obj2) {
    var res = {},
        key;

    for (key in obj1) res[key] = obj1[key];
    for (key in obj2) res[key] = obj2[key];

    return res;
};

exports.obj2arr = function (obj) {
    return getKeys(obj).sort(function (a, b) {
        if (a[0] === '_' && b[0] !== '_') return 1;
        if (a[0] !== '_' && b[0] === '_') return -1;
        return a.localeCompare(b);
    }).map(function (key) {
        return obj[key];
    });
};

exports.pushArray = function (master, another) {
    another.forEach(function (item) {
        master.push(item);
    });

    return master;
};

exports.eachKey = eachKey;

function eachKey(obj, cb) {
    var key;

    for (key in obj) {
        cb(key, obj[key]);
    }
}

exports.has = function (arr, cb) {
    var i;

    for (i = 0; i < arr.length; i++) {
        if (cb(arr[i])) return true;
    }

    return false;
};

exports.findIndex = function (arr, cb) {
    var i;

    for (i = 0; i < arr.length; i++) {
        if (cb(arr[i])) return i;
    }

    return -1;
};

exports.find = function (arr, cb) {
    var i;

    for (i = 0; i < arr.length; i++) {
        if (cb(arr[i])) return arr[i];
    }

    return;
};

exports.getKeys = getKeys;

function getKeys(obj) {
    var keys = [],
        key;

    for (key in obj) keys.push(key);

    return keys;
}

exports.mapObj = function (obj, cb) {
    return getKeys(obj).map(function (key) {
        return cb(key, obj[key]);
    });
};

exports.patch = function (to, from, excludeList) {
    eachKey(from, function (key, value) {
        if (!excludeList || excludeList.indexOf(key) === -1) to[key] = value;
    });

    return to;
};

exports.deepPatch = function (to, from) {
    eachKey(from, function (key, value) {
        to[key] = deepCopy(value);
    });

    return to;
};

exports.range = function (fromOrTo, to) {
    var res = [],
        from, i;
    
    if (typeof to === 'undefined') {
        from = 0;
        to = fromOrTo;
    } else {
        from = fromOrTo;
    }

    for (i = from; i < to; i++) res.push(i);

    return res;
};

exports.unknownErrMsg = function (err) {
    return i18n('未知错误') + ' [' + err.code + ']: ' + err.message;
};

exports.asyncComponent = function (path) {
    return function (resolve) {
        require.async([path], resolve);
    };
};

exports.copy = function (text) {
    var textarea = document.createElement('textarea');

    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('Copy', false, null);

    document.body.removeChild(textarea);
};