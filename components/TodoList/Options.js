import { BiTrash, BiEdit } from 'react-icons/bi'
import styles from '../../styles/Options.module.css'

export function Options({ editAction, deleteAction }) {
  return (
    <span className={styles.options} onClick={() => editAction()}>
      <button className={styles.edit}>
        <BiEdit />
      </button>
      <button className={styles.delete} onClick={() => deleteAction()}>
        <BiTrash />
      </button>
    </span>
  )
}