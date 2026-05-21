import { useState, useEffect } from "react";
import TaskItem from "./Components/TaskItem";
import "./App.css";

function App() {
  // Estado para lista de Tarefas e função para apenas a primeira render
  const [task, setTask] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefa");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  // Texto do input
  const [text, setText] = useState("");

  // Estado do filtro
  const [filter, setFilter] = useState("todas");

  // Lista Filtrada
  const taskFilter = task.filter((tarefa) => {
    if (filter === "concluidas") return tarefa.concluida;
    if (filter === "pendentes") return !tarefa.concluida;
    return true; // todas
  });

  // Salvar tarefas sempre que mudar
  useEffect(() => {
    localStorage.setItem("tarefa", JSON.stringify(task));
  }, [task]);


  // Função de adicionar
  const addTask = () => {
    if (text.trim() === "") {
      return;
    };
    
    const newTask = {
      id: Date.now(), // id único para cada tarefa
      texto: text, // texto da tarefa
      concluida: false, // status da tarefa
    };

    setTask((previousTask) => [...previousTask, newTask]);
    setText("");
  }

  // Função para alterar concluída 
  const toggleConcluida = (id) => {
    const novasTarefas = task.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });

    setTask(novasTarefas);
  }

  // Função remover
  const removerTarefa = (id) => {
    const novasTarefas = task.filter((tarefa) => tarefa.id !== id)
    setTask(novasTarefas);
  }

  // Adicionar tarefa com enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  }

  const pendentes = task.filter((t) => !t.concluida).length;
  const concluidas = task.filter((t) => t.concluida).length;

  return (
    <div className="container">
      <h1>Lista de tarefas: </h1>

      <div className="input-group">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyPress} placeholder="Digite uma tarefa..."/>
      <button onClick={addTask}>Adicionar</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("todas")}>Todas</button>
        <button onClick={() => setFilter("concluidas")}>Concluidas</button>
        <button onClick={() => setFilter("pendentes")}>Pendentes</button>
      </div>

      <p className="task-count">
        {pendentes} pendente(s) | {concluidas} concluída(s)
      </p>

      <ul>
        {taskFilter.map((taskItem) => (
          <TaskItem
            key={taskItem.id}
            task={taskItem}   // envia os dados da tarefa
            onToggle={toggleConcluida}  // envia a função de alternar concluída
            onRemove={removerTarefa}  // envia a função de remover
          />
        ))}
      </ul>
    </div>
  );
}
export default App