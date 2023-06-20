

import "./App.css"
import { useState, useEffect } from "react"

export default function App(){

const [inputInfo, setInputInfo] = useState("") 
const [tasks, setTasks] = useState<string[]>([])
// const [tasks, setTasks] = useState([
// 'Estudar hebraico',
// 'Comprar verduras',
// 'Limpar a cozinha'
// ])
const [editTask, setEditTask] = useState({
  enabled: false,
  task: ''
})

function handleAdd(){
  if(!inputInfo){
    alert("Preencha o nome da sua tarefa!");
    return;
  }

  if(editTask.enabled){
    handleSaveEdit();
    return;
  }

  setTasks(tarefas => [...tarefas, inputInfo])
  setInputInfo("")
  localStorage.setItem("@cursoreact", JSON.stringify([...tasks, inputInfo]))
}

function handleSaveEdit(){
  const findIndexTask = tasks.findIndex(task => task === editTask.task)
  const allTasks = [...tasks]
  allTasks[findIndexTask] = inputInfo
  setTasks(allTasks)
  setEditTask({
    enabled: false,
    task: ''
  })
  setInputInfo('')
  localStorage.setItem("@cursoreact", JSON.stringify(allTasks))
}

function handleDelete(item: string){
   const removeTask = tasks.filter(task => task !== item)
   setTasks(removeTask)
   localStorage.setItem("@cursoreact", JSON.stringify(removeTask))
}

function handleEdit(item: string){
  setInputInfo(item)
  setEditTask({
    enabled: true,
    task: item
  })
}
return(
  <section> 
  <h1>Lista de Tarefas</h1>  
  <hr />
  <br />
  <input 
  type="text" 
  placeholder="Digite o nome da terefa..." 
  value={inputInfo}
  onChange={(e => setInputInfo(e.target.value))}
  />
  <button onClick={handleAdd}>{editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
  {tasks.map((item, index) => (
   
      <ul key={index}>
        <li>{item} 
        <span onClick={ () => handleDelete(item)}>Excluir</span>
        <span onClick={() => handleEdit(item)}>Editar</span>
        </li>
      </ul>
   
  ))}
  </section>
)

  }
 