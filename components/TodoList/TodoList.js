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
    const newTask = {
      id: nanoid(),
      taskName: 'Lorem ipsum',
      complete: false
    }
    let updatedList = {...list}
    updatedList.tasks.push(newTask)
    setLists(prevLists => {
      return [
        ...prevLists.slice(0, listIdx),
        updatedList,
        ...prevLists.slice(listIdx + 1)
      ]
    })
  }

  const handleListNameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const updateListName = (e) => {
    if (e.key === 'Enter') {
      let updatedList = {...list}
      updatedList.listName = newName

      setLists(prevLists => {
        return [
          ...prevLists.slice(0, listIdx),
          updatedList,
          ...prevLists.slice(listIdx + 1)
        ]
      })
      setEditable(false)
    }
  }

  const deleteList = () => {
    setLists(prevLists => {
      return [
        ...prevLists.slice(0, listIdx),
        ...prevLists.slice(listIdx + 1)
      ]
    })
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
