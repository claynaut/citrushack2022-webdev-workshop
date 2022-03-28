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

export function TodoList({ list, setList }) {
  const { listName, tasks } = list

  const toggleComplete = (id) => {
    let listCopy = {...list}
    let taskToUpdate = listCopy.tasks.find((task) => task.id === id)
    taskToUpdate.complete = !taskToUpdate.complete
    setList(listCopy)
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
