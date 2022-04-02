# 🍊 Citrus Hack 2022 - Intro to Next.js Workshop

> Author: J.S. Pescasio
> 

## Introduction

### **Purpose**

Introduce Next.js app development, implementing features like CRUD using useState and persistent state using useEffect and localStorage.

### **Goals**

- Create an accordion-style to-do list, built on Next.js
- **Bonus:** Deploy on [Vercel](https://vercel.com/)
    - **Demo site:** [https://nextjs-citrushack2022-workshop.vercel.app/](https://nextjs-citrushack2022-workshop.vercel.app/)

### **Tech Stack**

- [Next.js](https://nextjs.org/docs/getting-started)
- Additional packages
    - [React icons](https://react-icons.github.io/react-icons/)
    - [nanoid](https://github.com/ai/nanoid)

### **Pre-requisites**

- Terminal set up
- Following packages installed
    - [Node.js](https://nodejs.org/en/download/)
    - npm
    - yarn (installed via npm)
        - `npm install -g yarn`
- [GitHub](https://github.com/) account
    - [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repository: [https://github.com/claynaut/intro-to-nextjs-workshop](https://github.com/claynaut/intro-to-nextjs-workshop)
    - Clone **your forked repository** into your local environment
        - `git clone https://github.com/<GITHUB_USER>/intro-to-nextjs-workshop`
            - Replace <GITHUB_USER> with your GitHub username
- **Bonus:** [Vercel](https://vercel.com/) account (can log-in with GitHub)

## **Outline**

- What is Next.js?
    - React vs. Next.js (Simplified)
    - How to Create a Next.js App
- Working With the Workshop Code
    - File Structure
    - Setting Up
    - Introducing Imports/Exports + Functional Components
- Creating an Accordion Component
    - Basic Schema
    - Introducing useState
    - Introducing Conditional Styling
- Creating a To-Do List With Task Components
    - Basic Schema
    - Modifying the Schema for CRUD Functionality
    - Generating a Unique ID
- Implementing CRUD Features
    - Creating Lists + Tasks
    - Creating the Options Component
    - Extending the Accordion Component
    - Updating Lists + Tasks
    - Deleting Lists + Tasks
- Introducing useEffect With Persistent State
- Deploying on Vercel
- Possible Features to Add/Expand

## What is Next.js?

Next.js is an open-source web development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static websites. ([Wikipedia](https://en.wikipedia.org/wiki/Next.js))

Essentially, Next.js is a React framework that extends the features of a basic React app to improve performance and provide a seamless setup.

### React vs. Next.js (Simplified)

Out of the box, React and Next.js are very similar — they’re both easy to learn, well-documented, and quick to write code for.

The main differences are that:

- Next.js
    - is incredibly fast due to static site creation and SSR (server-side rendering),
    - has the ability to use API routes without any extra setup,
    - and is easy to work with overall as it provides an intuitive file structure, while
- React
    - is easily extensible to include features like routing and state management patterns (using libraries like [Redux](https://redux.js.org/introduction/getting-started)),
    - may result in poor performance due to the lack of code splitting results,
    - and is more recognizable with a larger community and broader talent pool.

### How to Create a Next.js App

Creating a Next.js app is very similar to creating a React app. All you need is npx (installed via npm with `npm install -g npx`), assuming you already installed the packages cited in the pre-requisites for this workshop.

With all the packages installed, you can run the following commands to create a Next.js app:

- `npx create-next-app my-app`
- `cd my-app`
- `yarn dev`

However, in this workshop, we’ll work with the provided code to focus on the goals of this workshop.

## Working With the Workshop Code

### File Structure

```
├── components
│   ├── Demo
│   │   ├── AccordionDemo.js
│   │   ├── index.js
│   │   ├── MultipleListsDemo.js
│   │   ├── SingleListDemo.js
│   ├── TodoList
│   │   ├── index.js
│   │   ├── Options.js
│   │   ├── Task.js
│   │   ├── TodoList.js
│   └── Accordion.js
├── pages
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── public
├── styles
│   ├── Accordion.module.css
│   ├── globals.js
│   └── ...
└── README.md
```

For this workshop, we’ll mainly work in the `components` folder, where we’ll start with making an Accordion and expand from it to create a To-Do List that uses sub-components.

### Setting Up

- [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repository: [https://github.com/claynaut/intro-to-nextjs-workshop](https://github.com/claynaut/intro-to-nextjs-workshop)
- Clone **your forked repository** into your local environment
    - `git clone https://github.com/<GITHUB_USER>/intro-to-nextjs-workshop`
        - Replace <GITHUB_USER> with your GitHub username
    - `cd intro-to-nextjs-workshop`
    - `yarn install` (installs dependencies)
    - `yarn dev` (runs development server + localhost)
    - Go to [localhost:3000](http://localhost:3000) in your browser

The main branch of this repository is the `template` branch which has all the HTML/CSS set up for simplicity’s sake so we can focus on coding in JavaScript for this workshop. From the `template` branch, we’ll follow a tutorial below with the end goal of replicating the [demo site](https://nextjs-citrushack2022-workshop.vercel.app/) for this workshop. Though, if you’d prefer viewing the completed code, you can switch to the `demo` branch (via `git checkout demo`).

### Introducing Imports/Exports + Functional Components

In a Next.js app, we often work with imports/exports and functional components. 

If you’re familiar with any other language like C++ or Python, imports/exports are similar to importing and exporting libraries that you would use in your code. In the case of Next.js, we use imports/exports to import and export a range of things from libraries to components and CSS.

And in a similar sense, functional components in other languages like C++ or Python would be similar to a typical function that can declare its own variables inside and return some value. In the case of Next.js, the return value is often a combination of HTML elements and JavaScript.

## Creating an Accordion Component

**Files we’re working with:** `Accordion.js`

### Basic Schema

```
Accordion {
	title: string
	children: React.ReactNode
}
```

### Introducing useState

A basic feature of an accordion is that it toggles open and closed. How do we do this in our app? We use useState, a [React hook](https://reactjs.org/docs/hooks-overview.html), which preserves the state between re-renders. Then, we can create another function that can easily toggle the state from open to closed.

```jsx
/** Accordion.js */
const [open, setOpen] = useState(true)

const toggleOpen = () => { setOpen(!open) }

```

### Introducing Conditional Styling

You may noticed an expression used for the `className` for the parent div element in `Accordion.js`. In the `className`, we use the open state to determine how to style the Accordion component (whether to appear open or closed):

```jsx
/** Accordion.js */
<div className={open ? `${styles.open} ${styles.accordion}` : `${styles.accordion}`}>
	...
</div>
```

## Creating a To-Do List With Task Components

### Basic Schema

```
TodoList {
  id: string
  listName: string
  tasks: Task[]
}

Task {
  id: string
  task: string
  complete: boolean
}
```

### Modifying the Schema for CRUD Functionality

Since we’re simply using state management instead of a database, we’ll need to modify the basic schema slightly in order to fully implement the CRUD features. You’ll see why later.

```
TodoList {
  id: string
  listName: string
  ~~tasks: Task[]~~
	lists: TodoList[] // master list
	setLists: () => void // setState
}

Task {
  id: string
  task: string
  complete: boolean
	toggleComplete: () => void // setState
	list: TodoList // parent list
	lists: TodoList[] // master list
	setLists: () => void // setState
}
```

### Generating a Unique ID

As seen in the schemas for the To-Do List and Task components, there’s an id prop/attribute. This id needs to be a unique string in order to properly implement the CRUD features. So, how do we generate a unique ID? We can simple use the [nanoid](https://github.com/ai/nanoid) library cited earlier in the introduction.

An example can be seen in `SingleListDemo.js`:

```jsx
/** SingleListDemo.js */
const mockSampleListId = nanoid()
```

## Implementing CRUD Features

**Files we’re working with:** `MultipleListsDemo.js`,  `TodoList.js`,  `Task.js`

Now, it’s time to fully implement CRUD (mainly creating, updating, and deleting)!

### **Creating Lists + Tasks**

**Creating Lists**

We first need to have a master list that contains all our to-do lists to display on the page. So, we simply create a state for that:

```jsx
/** MultipleListDemo.js */
const [lists, setLists] = useState([])
```

Then, we can create a function that creates a new list for us and adds it to this master list. We simply follow the basic schema established earlier when creating:

```jsx
/** MultipleListDemo.js */
const createList = () => {
  const newList = {
    id: nanoid(),
    listName: 'Lorem Ipsum',
    tasks: []
  }
  setLists(prevLists => [...prevLists, newList])
}
```

Note that we use an arrow function (`=>`) and the spread operator (`...`) in our setState function to copy the items in the list’s previous state so we can create a new state with the newly-created list.

**Creating Tasks**

Now, we can create more to-do lists. But we also want to create more tasks within a to-do list, so we will follow a similar logic for creating a list when we create a task:

```jsx
/** TodoList.js */
const { listName, tasks } = list
const listIdx = lists.findIndex((list) => list.id === id)

const createTask = () => {
  const newTask = {
    id: nanoid(),
    taskName: 'Lorem ipsum',
    complete: false
  }
  let updatedList = {...list}
  updatedList.tasks.push(newTask)
  setLists(prevLists => {
    return [
      ...prevLists.slice(0, listIdx),
      updatedList,
      ...prevLists.slice(listIdx + 1)
    ]
  })
}
```

We follow a similar structure of creating a new task object, but creating a task is more complicated than creating a list. Since a task is a nested attribute in the master list, we need to go through more steps to create a task:

- Find the index of the parent list in the master  list
- Create a copy of the parent list
- Add the new task to the copied list
- Update the state by slicing the original list out and replace it with the copied list

### Creating the Options Component

Before we work on the update and delete features, we’ll look into the Options component first, which has the following schema:

```
Options {
	editAction: () => void
	deleteAction: () => void
}
```

This Options component is simple a row of user action buttons to edit/update or delete a particular to-do list or task, which is why we have the respective functions as props.

### Extending the Accordion Component

We extend the props of the Accordion component to access the buttons used for the CRUD features on a to-do list (which uses the accordion):

```
Accordion {
	title: string
	options: React.ReactNode
	children: React.ReactNode
}
```

### **Updating Lists + Tasks**

**Updating Lists**

When we update a list, there’s just two things we need to do: update the name and update the tasks (which has its own sub-section).

A simple thing we can do to update the name is replacing the name with an input field in which you can enter a new name to overwrite the previous name. To do this, we need to keep track of the following:

- When you enable editing for a list name (so the app know when to display the input field)
    - Easily done with an `editable` state which we can just toggle to true when the user clicks the update button
- What the new name is
    - Done with a `newName` state which we update with the live input through `handleListNameChange` which is passed directly into the input field’s `onChange` prop so that whenever the input is updated, that input is captured in `newName`

With all this in mind, we can update the name of list with the following block of code:

```jsx
/** TodoList.js */
const [editable, setEditable] = useState(false)
const [newName, setNewName] = useState(listName)

const handleListNameChange = (e) => {
  e.preventDefault()
  setNewName(e.target.value)
}

const updateListName = (e) => {
  if (e.key === 'Enter') {
    let updatedList = {...list}
    updatedList.listName = newName

    setLists(prevLists => {
      return [
        ...prevLists.slice(0, listIdx),
        updatedList,
        ...prevLists.slice(listIdx + 1)
      ]
    })
    setEditable(false)
  }
}
```

As you can see, we use the same slicing method to update the master list. And you’ll see this method frequently used in later sections to update the master list.

**Updating Tasks**

Now, when we update the task, we want to do two things: toggle the task as complete/incomplete and update the name. Like the to-do list, we also need to find the task’s parent list’s index in the master list. And since the task is a nested attribute, we also need to get the task’s index in its parent list.

To toggle a task as complete/incomplete, we simply do the following:

- Copy the parent list
- Get the task from the copied list
- Toggle the task’s complete state
- Update the master list with the copied list

```jsx
/** Task.js */
const listIdx = lists.findIndex((l) => l.id === list.id)
const taskIdx = list.tasks.findIndex((task) => task.id === id)

const toggleComplete = (taskId) => {
  let updatedList = {...list}
  let taskToUpdate = updatedList.tasks[taskIdx]
  taskToUpdate.complete = !taskToUpdate.complete

  setLists(prevLists => {
    return [
      ...prevLists.slice(0, listIdx),
      updatedList,
      ...prevLists.slice(listIdx + 1)
    ]
  })
}
```

Then, we update the name of the task by following the same steps we did for updating the name of a list:

```jsx
/** Task.js */
const [editable, setEditable] = useState(false)
const [newName, setNewName] = useState(taskName)

const handleTaskNameChange = (e) => {
  e.preventDefault()
  setNewName(e.target.value)
}

const updateTaskName = (e) => {
  if (e.key === 'Enter') {
    let updatedList = {...list}
    updatedList.tasks[taskIdx].taskName = newName

    setLists(prevLists => {
      return [
        ...prevLists.slice(0, listIdx),
        updatedList,
        ...prevLists.slice(listIdx + 1)
      ]
    })
    setEditable(false)
  }
}
```

### Deleting Lists **+** Tasks

**Deleting Lists**

Deleting a list is pretty straightforward, as we can simply slice the specified list out:

```jsx
/** TodoList.js */
const deleteList = () => {
  setLists(prevLists => {
    return [
      ...prevLists.slice(0, listIdx),
      ...prevLists.slice(listIdx + 1)
    ]
  })
}
```

**Deleting Tasks**

Deleting a task is slightly more complicated, but follows the same slicing method.

- Create a copy of the parent list
- Slice the task out of the copied list
- Update the master list with the copied list

```jsx
/** Task.js */
const deleteTask = () => {
  let updatedList = {...list}
  updatedList.tasks = [
    ...(updatedList.tasks).slice(0, taskIdx),
    ...(updatedList.tasks).slice(taskIdx + 1)
  ]

  setLists(prevLists => {
    return [
      ...prevLists.slice(0, listIdx),
      updatedList,
      ...prevLists.slice(listIdx + 1)
    ]
  })
}
```

With all these features complete, we now have CRUD functionality!

Note we don’t have to modify `Accordion.js` as the prop was already added. Though, it’s just important to point out this additional prop.

## Introducing useEffect With Persistent State

Now, we want to be able to make the state persist on a hard refresh. How do we do this? We use useEffect, another [React hook](https://reactjs.org/docs/hooks-overview.html), which allows us to perform “side effects” from data fetching to subscriptions. In this case, the “side effect” we will use is localStorage which allows as to store the state in the browser. So, when there’s a hard refresh, the state persists.

How do we use localStorage to save/load state?

- Saving state
    - `localStorage.setItem(keyName, keyValue)`
- Loading state
    - `localStorage.getItem(keyName)`

```jsx
/** MultipleListsDemo.js */
const [mounted, setMounted] = useState(false)

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
```

### **Deploying on Vercel**

- Link GitHub account
- Create a new project
- Import forked repository
- After a minute or so, your website should be deployed
    - Domain name is changeable

### **Possible Features to Add/Expand**

- Nested to-do lists
- Confirmation dialogs/prompts to delete
- Custom colors
- Drag and drop to reorder
    - Reference: [https://react-dnd.github.io/react-dnd/about](https://react-dnd.github.io/react-dnd/about)
- Connecting to a database to save data
    - User authentication to create users: [https://next-auth.js.org/](https://next-auth.js.org/)
    - (Example) MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)