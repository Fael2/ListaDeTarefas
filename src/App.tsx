import React, { useState } from 'react';


// components
import Header from './Components/Header';
import Footer from './Components/Footer';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskLista';
import Modal from './Components/Modal';

// CSS
import style from './App.module.css'

// Interface
import { ITask } from './Interfaces/Task';


function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  //retorna a lista toda menos o item que vai remover 
  const deleteTask = (id: number) => {

    // Com banco de dados aqui teria uma chamada de ajax e depois a exclusão visual

    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {

    const updateTask: ITask = { id, title, difficulty }

    const updatedItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task
    })

    setTaskList(updatedItems);

    hideOrShowModal(false)

  }
  return (
    <div>
      <Modal
        children={<TaskForm
          btnText="Editar Tarefa"
          taskList={taskList}
          task={taskToUpdate}
          handleUpdate={updateTask}
        />}
      />
      <Header />
      <main className={style.main}>
        <div>
          <h2>O que você precisa fazer?</h2>
          <TaskForm
            btnText="Criar Tarefa"
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Suas tarefas</h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
