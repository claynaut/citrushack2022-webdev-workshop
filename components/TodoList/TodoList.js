import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Accordion } from '../Accordion';
import { Task } from './Task';
import { Options } from './Options';
import styles from '../../styles/TodoList.module.css'
import { nanoid } from 'nanoid';

export function TodoList({ id, list, lists, setLists }) {
  const { listName, tasks } = list
  const listIdx = lists.findIndex((list) => list.id === id)
  const [editable, setEditable] = useState(false)
  const [newName, setNewName] = useState(listName)
  
  const createTask = () => {
    // code here
  }

  const handleListNameChange = (e) => {
    e.preventDefault()
    // code here
  }

  const updateListName = (e) => {
    // code here
  }

  const deleteList = () => {
    // code here
  }

  return (
    <Accordion 
      title={
        editable
        ? 
        <input
          type='text'
          value={newName}
          onChange={handleListNameChange}
          onKeyDown={updateListName}
          className={styles.listNameInput}
        />
        : listName
      } 
      options={
        editable 
        ? <></>
        :
        <Options
          updateAction={() => setEditable(true)}
          deleteAction={deleteList}
        />
      }
    >
      <li className={styles.list}>
        { tasks.map(({ id, taskName, complete }) =>
          <Task
            key={id}
            id={id}
            taskName={taskName}
            complete={complete}
            list={list}
            lists={lists}
            setLists={setLists}
          />
        )}
        <ul>
          <button className={styles.newTaskButton} onClick={() => createTask()}>
            <BiPlus /> Add new task
          </button>
        </ul>
      </li>
    </Accordion>
  )
}
