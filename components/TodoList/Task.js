import { useState } from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { Options } from './Options'
import styles from '../../styles/Task.module.css'

export function Task({ id, taskName, complete, list, lists, setLists }) {
  const listIdx = lists.findIndex((l) => l.id === list.id)
  const taskIdx = list.tasks.findIndex((task) => task.id === id)
  const [editable, setEditable] = useState(false)
  const [newName, setNewName] = useState(taskName)

  const toggleComplete = () => {
    let updatedList = {...list}
    let taskToUpdate = updatedList.tasks[taskIdx]
    taskToUpdate.complete = !taskToUpdate.complete

    setLists(prevLists => {
      return [
        ...prevLists.slice(0, listIdx),
        updatedList,
        ...prevLists.slice(listIdx + 1)
      ]
    })
  }

  const handleTaskNameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const updateTaskName = (e) => {
    if (e.key === 'Enter') {
      let updatedList = {...list}
      updatedList.tasks[taskIdx].taskName = newName

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
  
  const deleteTask = () => {
    let updatedList = {...list}
    updatedList.tasks = [
      ...(updatedList.tasks).slice(0, taskIdx),
      ...(updatedList.tasks).slice(taskIdx + 1)
    ]

    setLists(prevLists => {
      return [
        ...prevLists.slice(0, listIdx),
        updatedList,
        ...prevLists.slice(listIdx + 1)
      ]
    })
  }

  return (
    <ul className={complete ? `${styles.checked} ${styles.listItem}` : `${styles.listItem}`}>
      <span className={styles.task}>
        { complete 
          ? <ImCheckboxChecked className={styles.checkbox} onClick={() => toggleComplete()} /> 
          : <ImCheckboxUnchecked className={styles.checkbox} onClick={() => toggleComplete()} /> 
        }
        {
          editable
          ?
          <input
            type='text'
            value={newName}
            onChange={handleTaskNameChange}
            onKeyDown={updateTaskName}
            className={styles.taskNameInput}
          />
          : taskName
        }
      </span>
      <Options
        updateAction={() => setEditable(true)}
        deleteAction={() => deleteTask(id)}
      />
    </ul>
  )
}
