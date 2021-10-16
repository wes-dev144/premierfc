import dispatcher from "../dispatcher";
import actions from "../constants/Actions";

export const InputStore = () => {
    const update = (field, data) => {
        dispatcher.dispatch({
            type: actions.UPDATE_INPUT,
            field: field,
            data: data
        });
    }
    return {update};
}

export const RequestStore = () => {
    const update = (response, event) => {
        dispatcher.dispatch({
            type: actions.API_RESPONSE,
            response: response,
            event: event
        });
    }
    return {
        update
    }
}