import {EventEmitter} from 'events'
import actions from '../constants/Actions';
import dispatcher from "../dispatcher";

class InputStore extends EventEmitter {
    constructor() {
        super()
        this.store = {}
    };

    updateStore(dataType, data) {
        this.store[dataType] = data
    }

    get(input) {
        return this.store[input]
    }

    handleActions(action) {
        switch(action.type){
            case actions.UPDATE_INPUT: {
                this.updateStore(action.field, action.data);
            }
        }
    }
}

const inputStore = new InputStore();
dispatcher.register(inputStore.handleActions.bind(inputStore))

export default inputStore;