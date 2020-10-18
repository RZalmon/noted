import { HttpService } from './HttpService';

function query(critirea) {
    const params = new URLSearchParams(critirea);
    return HttpService.get(`room?${params}`);
}


function getById(filterBy) {
    const queryParams = new URLSearchParams();
    if (filterBy) {
        for (const property in filterBy) {
            if (filterBy[property]) {
                queryParams.set(property, filterBy[property])
            }
        }
        return HttpService.get(`room?${queryParams}`);
    }
}



// function getById(filterBy) {
//     console.log(id);
//     return HttpService.get(`room/${id}`);
// }




function remove(id) {
    return HttpService.delete(`room/${id}`);
}

async function save(room) {
    let prm;

    if (room._id) prm = HttpService.put(`room/${room._id}`, room);
    else {
        prm = HttpService.post('room', room);
    }
    const res = await prm;
    return res;
}

async function removeNote(roomId, noteId) {
    return HttpService.delete(`room/${roomId}/removeNote`, { roomId, noteId })
}

async function changeNoteColor(roomId, noteId, color) {
    return HttpService.put(`room/${roomId}/changeNoteColor`, { roomId, noteId, color })
}

async function toggleNotePin(roomId, noteId) {
    return HttpService.put(`room/${roomId}/toggleNotePin`, { roomId, noteId })
}

async function updateNote(roomId, note) {
    return HttpService.put(`room/${roomId}/updateNote`, { roomId, note })
}

async function checkIsValidUser(userId, roomId) {
    return HttpService.post(`room/${roomId}/validate`, { userId, roomId })
}

async function getStarredNotes(userId){
    const params = new URLSearchParams(userId);
    return HttpService.get(`room/starredNotes/?${params}`);
}

export const RoomService = {
    query,
    getById,
    save,
    remove,
    checkIsValidUser,
    removeNote,
    changeNoteColor,
    toggleNotePin,
    updateNote,
    getStarredNotes
}



