import {EventEmitter} from 'events'
import actions from '../constants/ActionConstants';
import dispatcher from "../dispatcher";

class UserInfoStore extends EventEmitter {
    constructor() {
        super()
        this.uid = null
        this.name = null
        this.zipcode = null
        this.city = null
        this.state = null
    };

    setUID(uid) {
        this.uid = uid
    }

    getUID() {
        return this.uid
    }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setZip(zipcode) {
        this.zipcode = zipcode
    }

    getZip() {
        return this.zipcode
    }
    setCity(city) {
        this.city = city
    }

    getCity() {
        return this.city
    }

    setState(state) {
        this.state = state
    }

    getState() {
        return this.state
    }

    addChangeListener(callback){
        this.on(actions.CHANGE_EVENT, callback)
    }

    removeChangeListener(callback){
        this.removeListener(actions.CHANGE_EVENT, callback)
    }

    handleActions(action) {
        console.log("Updating User Store", action)
        switch(action.type){
            case actions.UPDATE_UID: {
                this.setUID(action.uid);
            }
            case actions.UPDATE_NAME: {
                this.setName(action.name);
            }
            case actions.UPDATE_ZIP: {
                this.setZip(action.zip);
            }
            case actions.UPDATE_CITY: {
                this.setZip(action.city);
            }
            case actions.UPDATE_STATE: {
                this.setZip(action.state);
            }
        }
    }
}

const userInfoStore = new UserInfoStore();
dispatcher.register(userInfoStore.handleActions.bind(userInfoStore))

export default userInfoStore;