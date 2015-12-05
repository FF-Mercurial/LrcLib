var popAlert = require('ui/pop-alert');

module.exports = function (err) {
    popAlert({
        title: i18n('未知错误'),
        content: JSON.stringify(err)
    });
};