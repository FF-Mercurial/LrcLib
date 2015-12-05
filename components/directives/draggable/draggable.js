module.exports = {
    bind: function () {
        let handle = this._checkParam('handle')
        let cancel = this._checkParam('cancel')
        let options = {
            cursor: 'move'
        }

        if (handle) options.handle = handle
        if (cancel) options.cancel = cancel
        
        $(this.el).draggable(options)
    }
};