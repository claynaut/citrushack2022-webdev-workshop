import { useState } from 'react'
import { BiRightArrow } from 'react-icons/bi'
import styles from '../styles/Accordion.module.css'

export function Accordion({ title, endOptions, children }) {
  const [open, setOpen] = useState(true)

  const toggleOpen = () => { setOpen(!open) }

  return (
    <div className={open ? `${styles.open} ${styles.accordion}` : `${styles.accordion}`}>
      <span className={styles.header}>
        <h3 onClick={() => toggleOpen()}>
          <BiRightArrow className={styles.arrow} /> {title}
        </h3>
        {endOptions}
      </span>
      <div>
        {children}
      </div>
    </div>
  )
}
