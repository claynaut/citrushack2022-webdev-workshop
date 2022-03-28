import { useState } from 'react'
import { BiPlus, BiTrash, BiEdit } from 'react-icons/bi'
import { Accordion } from '../Accordion';
import { Task } from './Task';
import styles from '../../styles/TodoList.module.css'

const EndOptions = ({ editAction, deleteAction }) => (
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
  const [editable, setEditable] = useState(false)
  const [newName, setNewName] = useState(listName)

  const toggleComplete = (taskId) => {
    const listIdx = lists.findIndex((list) => list.id === id)
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
    const listIdx = lists.findIndex((list) => list.id === id)

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
      const listIdx = lists.findIndex((list) => list.id === id)
      let updatedList = {...list}
      updatedList.listName = newName
      console.log(updatedList)

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

  return (
    <Accordion 
      title={
        editable
        ? <input type='text' value={newName} onChange={handleListNameChange} onKeyDown={editListName}/>
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
            endOptions={
              <EndOptions
              />
            }
          />
        )}
        <ul>
          <button className={styles.newTaskButton}>
            <BiPlus /> Add new task
          </button>
        </ul>
      </li>
    </Accordion>
  )
}
