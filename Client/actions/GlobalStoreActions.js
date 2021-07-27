import dispatcher from "../dispatcher";
import actionType from "../constants/ActionTypes";

export function getData(key) {
    console.log('GET Action Called', key)
    dispatcher.dispatch({
        type: actionType.GET,
        storeKey: key
    });
}

export function setData(key, data) {
    console.log("Set Action called", data)
    dispatcher.dispatch({
        type: actionType.SET,
        storeKey: key,
        data: data
    });
}