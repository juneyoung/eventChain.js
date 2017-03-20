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

EventQueue.prototype.addQueue = function (target, eventname, passedEvent, defaultValue) {
    try {
        this.eventQ.push({target : target, eventname : eventname, action : passedEvent, defaultValue : defaultValue });
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
                if(currentEventName) {        
                    currentActor.addEventListener(currentEventName, function(){ // DOM Add Event 
                        if(typeof currentEventAction == 'function') {
                            currentEventAction(currentActor, nextActor);
                        }
                    }, false);   
                } else {
                    if(typeof currentEventAction == 'function') {
                        currentEventAction(currentActor, nextActor);
                    }
                }
            }(i));
        }
        me.eventQ[0].target.value = me.eventQ[0].defaultValue || '';
    } catch (chainQueueException) {
        console.error(this.messageBox.actions.chain_failure, chainQueueException);
    }
}

EventQueue.prototype.clearTargetValue = function(i){
    //i for 'index', if null target will be all targets 
    //It will clear target values 
    if (i) {
        var target = this.eventQ[i];
        if(target) {
            try {
                target.value = target.defaultValue || ''
            } catch (valueSettingException) {
                console.error('failed to setting eventQ index ', i);
            }
        }
    }  else {
        for(i = 0; i < this.eventQ.length; i++) {
            var target = this.eventQ[i];
            if(target) {
                try {
                    target.value = target.defaultValue || ''
                } catch (valueSettingException) {
                    console.error('failed to setting eventQ index ', i);
                }
            }
        }
    }
}

var EQ = new EventQueue();