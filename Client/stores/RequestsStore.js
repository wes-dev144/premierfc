import {EventEmitter} from 'events'
import actions from '../constants/Actions';
import dispatcher from "../dispatcher";

class RequestStore extends EventEmitter {
    constructor() {
        super()
        this.store = {}
    };

    updateStore(data, event) {
        console.log('Updating RequestStore', event, data)
        this.store[event] = data
        this.emit(event);
    }

    subscribe(callback, event){
        this.on(event, callback)
    }

    unsubscribe(callback, event){
        this.removeListener(event, callback)
    }

    getData(key) {
        return this.store[key]
    }

    handleActions(action) {
        switch(action.type){
            case actions.API_RESPONSE: {
                this.updateStore(action.response, action.event);
            }
        }
    }
}

const requestStore = new RequestStore();
dispatcher.register(requestStore.handleActions.bind(requestStore))

export default requestStore;