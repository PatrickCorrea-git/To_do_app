import React from "react";

const TaskItem = ({task, onToggle, onRemove}) => {
  
  return(
  <li>
    <span onClick={() => onToggle(task.id)}
    style={{textDecoration: task.concluida ? "line-through" : "none", // Linha do meio quando concluida
      color: task.concluida ? "green" : "red", // Cor do texto muda para cinza quando concluida
      cursor: "pointer" // Altera o cursor para mostrar que é clicavel
     }}
    >
    {task.texto}
    </span>
    <button onClick={() => onRemove(task.id)}>Remover</button>
  </li>
  )

}

export default TaskItem

