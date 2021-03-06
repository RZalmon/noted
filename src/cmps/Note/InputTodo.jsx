import React, { useState } from 'react'

import { UtilService } from '../../services/UtilService'

import xMark from '../../assets/svg/x-mark.svg'
import PlusIcon from '../../assets/svg/plus.svg'
import saveIcon from '../../assets/svg/save.svg'


export default ({ setNoteHeader, setNoteData, handleSubmit, noteData }) => {
    const [currTodo, setCurrTodo] = useState('');

    const textInput = React.useRef();

    const addTodo = () => {
        setNoteData([
            ...noteData, {
                text: currTodo,
                isDone: false,
                _id: UtilService.makeId(5)
            }])
        setCurrTodo('')
        textInput.current.value = ''
        textInput.current.focus()
    };

    const handleRemoveTodo = (todoId) => {
        setNoteData(noteData.filter(todo => todo._id !== todoId))
    }

    return (
        <div className="input-todo">
            <input type="text" placeholder="Header?" className="input-header" onChange={e => setNoteHeader(e.target.value)} />
            <ul>
                {!noteData.length && <h5>No Todo's Added</h5>}
                {!!noteData.length && noteData.map(todo => {
                    return (
                        <li className="todo" key={todo._id}>
                            <span>{todo.text}</span>
                            <img src={xMark} onClick={() => handleRemoveTodo(todo._id)} className="x-mark" alt="Remove Todo" />
                        </li>
                    )
                })}
            </ul>
            <div className="add-todo-container">
                <input type="text" placeholder="task?" className="input-task" ref={textInput} onChange={e => setCurrTodo(e.target.value)} />
                <img src={PlusIcon} className="add-button" onClick={() => addTodo()} alt="Add todo" />
            </div>
            <img src={saveIcon} className="add-button" onClick={handleSubmit} alt="Save" />
        </div>
    )
}