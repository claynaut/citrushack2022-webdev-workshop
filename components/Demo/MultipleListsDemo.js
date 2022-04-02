import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { BiPlus } from 'react-icons/bi'
import { TodoList } from '../TodoList'
import styles from '../../styles/Home.module.css'

export function MultipleListsDemo() {
  const [mounted, setMounted] = useState(false)
  const [lists, setLists] = useState([])

  const createList = () => {
    const newList = {
      id: nanoid(),
      listName: 'Lorem Ipsum',
      tasks: []
    }
    setLists(prevLists => [...prevLists, newList])
  }

  useEffect(() => {
    // we check that the component hasn't mounted yet so we don't continuously load the saved state
    if (!mounted) { 
      if (localStorage.getItem('lists')) {
        const savedLists = JSON.parse(localStorage.getItem('lists'))
        setLists(savedLists)
      }
    }
    setMounted(true)
    localStorage.setItem('lists', JSON.stringify(lists))
  }, [lists, mounted])

  return (
    <>
      <h2 className={styles.title}>
        Multiple To-Do Lists Demo
      </h2>
      <button className={styles.createListButton} onClick={() => createList()}>
        <BiPlus /> Create New To-Do List
      </button>
      <div className={styles.grid}>
        { lists.map((list) =>
          <TodoList
            key={list.id}
            id={list.id}
            list={list}
            lists={lists}
            setLists={setLists}
          />
        )}
      </div>
    </>
  )
}
