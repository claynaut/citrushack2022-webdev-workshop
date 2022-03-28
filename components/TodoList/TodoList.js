import { BiPlus, BiTrash, BiEdit } from 'react-icons/bi'
import { Accordion } from '../Accordion';
import { Task } from './Task';
import styles from '../../styles/TodoList.module.css'

const EndOptions = () => (
  <span className={styles.options}>
    <button className={styles.edit}>
      <BiEdit />
    </button>
    <button className={styles.delete}>
      <BiTrash />
    </button>
  </span>
)

export function TodoList({ id, list, lists, setLists }) {
  const { listName, tasks } = list

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

  return (
    <Accordion 
      title={listName} 
      endOptions={<EndOptions />}
    >
      <li className={styles.list}>
        { tasks.map(({ id, taskName, complete }) =>
          <Task
            key={id}
            id={id}
            taskName={taskName}
            complete={complete}
            toggleComplete={toggleComplete}
            endOptions={<EndOptions />}
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
