import dispatcher from "../dispatcher";
import actions from "../constants/ActionConstants";

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

export const UserStore = () => {
    const setUID = (uid) => {
        dispatcher.dispatch({
            type: actions.UPDATE_UID,
            uid: uid,
        });
    }
    
    const setName = (name) => {
        dispatcher.dispatch({
            type: actions.UPDATE_NAME,
            name: name,
        });
    }
    
    const setZip = (zip) => {
        dispatcher.dispatch({
            type: actions.UPDATE_ZIP,
            zip: zip,
        });
    }
    const setCity = (city) => {
        dispatcher.dispatch({
            type: actions.UPDATE_CITY,
            city: city,
        });
    }
    const setState = (state) => {
        dispatcher.dispatch({
            type: actions.UPDATE_STATE,
            state: state,
        });
    }
    return {
        setUID,
        setName,
        setZip,
        setCity,
        setState
    }
}

export const ClubStore = () => {
    const addClub = (club_id, club) => {
        dispatcher.dispatch({
            type: actions.ADD_CLUB,
            club_id: club_id,
            club: club
        });
    }
    return {
        addClub
    }
}