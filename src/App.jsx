import './App.css'
import { useEffect, useState } from "react"

function App() {

  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState(

    JSON.parse(localStorage.getItem("tasks")) || []

  )
  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    )

  }, [tasks])

  return (

    <div className="app">
      <h1>Todo App</h1>

      <p>Total Tasks: {tasks.length}</p>

      <p>
        Completed Tasks:

        {
          tasks.filter((task) => task.completed).length
        }

      </p>

      <input
        type="text"
        placeholder="Enter task"
        value={input}

        onChange={(event) => setInput(event.target.value)}

        onKeyDown={(event) => {

          if (event.key === "Enter" && input !== "") {

            setTasks([...tasks, {

              text: input,

              completed: false

            }])
            setInput("")
          }

        }}
      />

      <button onClick={() => {

        if (input !== "") {

          setTasks([...tasks, {

            text: input,

            completed: false

          }])
          setInput("")
        }

      }}>

        Add
      </button>

      {
        tasks.map((task, index) => (

          <div className="task">            <h2
            onClick={() => {

              let updatedTasks = [...tasks]

              updatedTasks[index].completed =
                !updatedTasks[index].completed

              setTasks(updatedTasks)

            }}

            style={{

              textDecoration:
                task.completed ? "line-through" : "none",

              opacity: task.completed ? "0.5" : "1"

            }}

          >

            {task.text}

          </h2>

            <button onClick={() => {

              let updatedTasks = tasks.filter((_, i) => i !== index)

              setTasks(updatedTasks)

            }}>

              Delete

            </button>

          </div>

        ))
      }

    </div>

  )

}

export default App