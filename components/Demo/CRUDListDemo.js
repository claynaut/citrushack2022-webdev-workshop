import { useState } from 'react'
import { nanoid } from 'nanoid'
import { BiPlus } from 'react-icons/bi'
import { TodoList } from '../TodoList'
import styles from '../../styles/Home.module.css'

export function CRUDListDemo() {
  const [lists, setLists] = useState([])

  return (
    <>
      <h2 className={styles.title}>
        CRUD To-Do List Demo
      </h2>
      <button className={styles.createListButton}>
        <BiPlus /> Create New To-Do List
      </button>
    </>
  )
}