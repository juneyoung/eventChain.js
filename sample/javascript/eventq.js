var EventQueue = function() {
    this.eventQ = [];
    this.messageBox = {
        actions : {
            add_failure : 'Event queue add failed > '
            , close_failure : 'Event queue close failed > '
            , chain_failure : 'Event queue chain failed > '
        }
    }
}

EventQueue.prototype.addQueue = function (target, eventname, passedEvent) {
    try {
        this.eventQ.push({target : target, eventname : eventname, action : passedEvent });
    } catch (addQueueException) {
        console.error(this.messageBox.actions.add_failure, addChainException);
    }
    return this;
}

EventQueue.prototype.closeQueue = function () {
    try {
        this.chianEvents();
    } catch (closeQueueException) {
        console.error(this.messageBox.actions.close_failure, closeQueueException);
    }
    return this;
}

EventQueue.prototype.chianEvents = function() {
    try {
        console.log('Chain Event Queue > ', this);
        var me = this;
        for(var i  = 0; i < this.eventQ.length; i++) {
            /*
            CAUTION CLOSURE
            */
            (function(idx){
                var currentActor = me.eventQ[idx].target;
                var currentEventName = me.eventQ[idx].eventname;
                var currentEventAction = me.eventQ[idx].action;
                var nextActor = (idx < me.eventQ.length - 1) ? me.eventQ[idx + 1].target : null;         
                currentActor.addEventListener(currentEventName, function(){ // DOM Add Event 
                    if(typeof currentEventAction == 'function') {
                        currentEventAction(currentActor, nextActor);
                    }
                }, false);
            }(i));

        }
    } catch (chainQueueException) {
        console.error(this.messageBox.actions.chain_failure, chainQueueException);
    }
}

var EQ = new EventQueue();