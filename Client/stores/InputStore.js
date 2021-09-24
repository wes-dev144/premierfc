import {EventEmitter} from 'events'
import actions from '../constants/ActionConstants';
import field from '../constants/InputStoreFields'
import dispatcher from "../dispatcher";

class InputStore extends EventEmitter {
    constructor() {
        super()
        this[field.USER_CLUBS] = []
    };

    setData(dataType, data) {
        let key = dataType
        this[key] = data
        this.emit(actions.CHANGE_EVENT);
    }

    addChangeListener(callback){
        this.on(actions.CHANGE_EVENT, callback)
    }

    removeChangeListener(callback){
        this.removeListener(actions.CHANGE_EVENT, callback)
    }

    get(field) {
        console.log('Returning InputStoreData', typeof(this[field]), this[field])
        return this[field]
    }

    handleActions(action) {
        switch(action.type){
            case actions.UPDATE_INPUT: {
                this.setData(action.field, action.data);
            }
        }
    }
}

const inputStore = new InputStore();
dispatcher.register(inputStore.handleActions.bind(inputStore))

export default inputStore;