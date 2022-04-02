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
    // code here
  }

  const handleTaskNameChange = (e) => {
    e.preventDefault()
    // code here
  }

  const updateTaskName = (e) => {
    // code here
  }
  
  const deleteTask = () => {
    // code here
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
