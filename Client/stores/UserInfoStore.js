import {EventEmitter} from 'events'
import actionType from '../constants/ActionTypes';
import dispatcher from "../dispatcher";


const CHANGE_EVENT = 'change'

class UserInfoStore extends EventEmitter {
    constructor() {
        super()
    };

    setData(dataType, data) {
        let key = dataType
        this[key] = data
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback)
    }

    getData(dataType) {
        return this[dataType]
    }

    handleActions(action) {
        switch(action.type){
            case actionType.GET: {
                return this.getData(action.storeKey);
            }
            case actionType.SET: {
                this.setData(action.storeKey, action.data);
            }
        }
    }
}

const userInfoStore = new UserInfoStore();
dispatcher.register(userInfoStore.handleActions.bind(userInfoStore))

export default userInfoStore;