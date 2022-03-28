import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import styles from '../../styles/Task.module.css'

export function Task({ id, taskName, complete, toggleComplete, endOptions }) {
  return (
    <ul className={complete ? `${styles.checked} ${styles.listItem}` : `${styles.listItem}`}>
      <span className={styles.task}>
        { complete 
          ? <ImCheckboxChecked className={styles.checkbox} onClick={() => toggleComplete(id)} /> 
          : <ImCheckboxUnchecked className={styles.checkbox} onClick={() => toggleComplete(id)} /> 
        }
        {taskName}
      </span>
      {endOptions}
    </ul>
  )
}
