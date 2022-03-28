import { Accordion } from '../Accordion'
import styles from '../../styles/Home.module.css'

export function AccordionDemo() {
  return (
    <>
      <h2 className={styles.title}>
        Accordion Demo
      </h2>
      <Accordion title='This is an accordion!'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Accordion>
    </>
  )
}