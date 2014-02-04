'use strict';

module.exports = (function(){
    var socket;

    return {
        emit: function emitEventWithData(eventName, data){
            socket.emit(eventName, data);
        },

        setSocket: function setSocket(socket){
            socket = socket;
        }
    };
})();