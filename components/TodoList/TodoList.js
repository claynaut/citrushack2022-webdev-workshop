import { useState } from 'react'
import { BiPlus, BiTrash, BiEdit } from 'react-icons/bi'
import { Accordion } from '../Accordion';
import { Task } from './Task';
import styles from '../../styles/TodoList.module.css'
import { nanoid } from 'nanoid';

export const EndOptions = ({ editAction, deleteAction }) => (
  <span className={styles.options} onClick={() => editAction()}>
    <button className={styles.edit}>
      <BiEdit />
    </button>
    <button className={styles.delete} onClick={() => deleteAction()}>
      <BiTrash />
    </button>
  </span>
)

export function TodoList({ id, list, lists, setLists }) {
  const { listName, tasks } = list
  const listIdx = lists.findIndex((list) => list.id === id)
  const [editable, setEditable] = useState(false)
  const [newName, setNewName] = useState(listName)

  const toggleComplete = (taskId) => {
    let updatedList = {...list}
    let taskToUpdate = updatedList.tasks.find((task) => task.id === taskId)
    taskToUpdate.complete = !taskToUpdate.complete

    setLists(prevLists => {
      return [
        ...prevLists.slice(0, listIdx),
        updatedList,
        ...prevLists.slice(listIdx + 1)
      ]
    })
  }

  const deleteList = () => {
    setLists(prevLists => {
      return [
        ...prevLists.slice(0, listIdx),
        ...prevLists.slice(listIdx + 1)
      ]
    })
  }

  const handleListNameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const editListName = (e) => {
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

  return (
    <Accordion 
      title={
        editable
        ? 
        <input
          type='text'
          value={newName}
          onChange={handleListNameChange}
          onKeyDown={editListName}
          className={styles.listNameInput}
        />
        : listName
      } 
      endOptions={
        editable 
        ? <></>
        :
        <EndOptions
          editAction={() => setEditable(true)}
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
            toggleComplete={toggleComplete}
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
