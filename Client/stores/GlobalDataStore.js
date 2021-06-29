import {EventEmitter} from 'events'
import actionType from '../constants/ActionTypes';
import dispatcher from "../dispatcher";


class GlobalDataStore extends EventEmitter {
    constructor() {
        super()
        this.data = {}
    };

    setData(dataType, data) {
        console.log('In Store Setting', data)
        this.data[dataType] = data
        console.log(this.data)
        this.emit("change");
    }

    getData(dataType) {
        return this.data[dataType]
    }

    getAllData() {
        return this.data
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

// const apiStore = new ApiStore('http://192.168.1.158:5000/');
const globalDataStore = new GlobalDataStore();
dispatcher.register(globalDataStore.handleActions.bind(globalDataStore))

export default globalDataStore;