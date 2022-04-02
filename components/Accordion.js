import { useState } from 'react'
import { BiRightArrow } from 'react-icons/bi'
import styles from '../styles/Accordion.module.css'

export function Accordion({ title, options, children }) {
  const [open, setOpen] = useState(true)

  // code here

  return (
    <div className={open ? `${styles.open} ${styles.accordion}` : `${styles.accordion}`}>
      <span className={styles.header}>
        <h3>
          <BiRightArrow className={styles.arrow} onClick={() => toggleOpen()} /> {title}
        </h3>
        {options}
      </span>
      <div className={styles.content}>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
