import { useState } from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { EndOptions } from './TodoList'
import styles from '../../styles/Task.module.css'

export function Task({ id, taskName, complete, toggleComplete, list, lists, setLists }) {
  const listIdx = lists.findIndex((l) => l.id === list.id)
  const taskIdx = list.tasks.findIndex((task) => task.id === id)
  const [editable, setEditable] = useState(false)
  const [newName, setNewName] = useState(taskName)
  
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

  const handleTaskNameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const editTaskName = (e) => {
    if (e.key === 'Enter') {
      let updatedList = {...list}
      updatedList.tasks[taskIdx].taskName = newName
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
    <ul className={complete ? `${styles.checked} ${styles.listItem}` : `${styles.listItem}`}>
      <span className={styles.task}>
        { complete 
          ? <ImCheckboxChecked className={styles.checkbox} onClick={() => toggleComplete(id)} /> 
          : <ImCheckboxUnchecked className={styles.checkbox} onClick={() => toggleComplete(id)} /> 
        }
        {
          editable
          ?
          <input
            type='text'
            value={newName}
            onChange={handleTaskNameChange}
            onKeyDown={editTaskName}
            className={styles.taskNameInput}
          />
          : taskName
        }
      </span>
      <EndOptions
        editAction={() => setEditable(true)}
        deleteAction={() => deleteTask(id)}
      />
    </ul>
  )
}
