import { useState } from 'react'
import { nanoid } from 'nanoid'
import { TodoList } from '../TodoList'
import styles from '../../styles/Home.module.css'

export function StaticListDemo() {
  const mockSampleListId = nanoid()
  const mockSampleList = {
    id: mockSampleListId,
    listName: 'Sample List',
    tasks: [
      {
        id: mockSampleListId + '-1',
        taskName: 'Task one.',
        complete: false
      },
      {
        id: mockSampleListId + '-2',
        taskName: 'Task two.',
        complete: false
      },
      {
        id: mockSampleListId + '-3',
        taskName: 'Task three.',
        complete: false
      }
    ]
  }
  const [sampleList, setSampleList] = useState(mockSampleList)

  return (
    <>
      <h2 className={styles.title}>
        Static To-Do List Demo
      </h2>
      <TodoList
        list={sampleList}
        setList={setSampleList}
      />
    </>
  )
}