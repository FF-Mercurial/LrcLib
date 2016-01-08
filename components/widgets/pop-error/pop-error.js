var popAlert = require('ui/pop-alert');

module.exports = function (err) {
    popAlert({
        title: '未知错误',
        content: JSON.stringify(err)
    });
};