import { BiTrash, BiEdit } from 'react-icons/bi'
import styles from '../../styles/Options.module.css'

export function Options({ updateAction, deleteAction }) {
  return (
    <span className={styles.options} onClick={() => updateAction()}>
      <button className={styles.edit}>
        <BiEdit />
      </button>
      <button className={styles.delete} onClick={() => deleteAction()}>
        <BiTrash />
      </button>
    </span>
  )
}