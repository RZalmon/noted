import { RoomService } from '../services/RoomService'

// LIST
export function loadRooms(filterBy) {
    return async dispatch => {
        try {
            const rooms = await RoomService.query(filterBy);
            dispatch({ type: 'SET_ROOMS', rooms })
        } catch (err) {
            console.log('ERROR', err)
        }
    }
}

// READ
export function loadRoomById(id) {
    console.log('$$$$loaded room@@@');
    
    return async dispatch => {
        try {
            const room = await RoomService.getById(id);
            console.log('room in actions', room);
            
            dispatch({ type: 'SET_CURR_ROOM', room })
        } catch (err) {
            console.log('ERROR', err)
        }
    }
}

//RESET
export function resetCurrRoom() {
    console.log('made it');
    
    return async dispatch => {
        try {
            const room = null
            dispatch({ type: 'SET_CURR_ROOM', room })
        } catch (err) {
            console.log('ERROR:', err)
        }
    }
}

// UPDATE + CREATE
export function saveRoom(room) {
    
    return async dispatch => {
        const isEdit = !!room._id
        console.log('room inside actions', room);
        
        room = await RoomService.save(room);        
        console.log(room);
        if (isEdit) dispatch({ type: 'UPDATE_ROOM', room })
        else dispatch({ type: 'ADD_ROOM', room })
        return room;
    }
}

// REMOVE

export function deleteRoom(id) {
    return async dispatch => {
        await RoomService.remove(id);
        dispatch({ type: 'DELETE_ROOM', id })
    }
}