import {EventEmitter} from 'events'
import actions from '../constants/ActionConstants';
import dispatcher from "../dispatcher";

class ClubStore extends EventEmitter {
    constructor() {
        super()
        this.clubs = {}
    };

    addClub(club_id, club) {
        console.log('Updating ClubStore', club_id, club)
        this.clubs[club_id] = club
        this.emit(actions.CHANGE_EVENT);
    }

    addChangeListener(callback){
        this.on(actions.CHANGE_EVENT, callback)
    }

    removeChangeListener(callback){
        this.removeListener(actions.CHANGE_EVENT, callback)
    }

    getClub(club_id) {
        console.log('Getting Club', club_id)
        return this.clubs[club_id]
    }

    getClubs() {
        return this.clubs
    }

    handleActions(action) {
        switch(action.type){
            case actions.ADD_CLUB: {
                this.addClub(action.club_id, action.club);
            }
        }
    }
}

const clubStore = new ClubStore();
dispatcher.register(clubStore.handleActions.bind(clubStore))

export default clubStore;