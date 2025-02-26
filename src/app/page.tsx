"use client";

import { faArrowRight, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";


interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  // Carregar tarefas do localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
    setTasks(savedTasks);
  }, []);

  // Salvar tarefas no localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (): void => {
    if (task.trim() === "") return;
    const newTasks: Task[] = [...tasks, { id: Date.now(), text: task, completed: false }];
    setTasks(newTasks);
    setTask("");
  };

  const toggleTask = (id: number): void => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number): void => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  };

  return (
    <div className="h-full w-full bg-black bg-cover bg-center relative" style={{ backgroundImage: `url('/bg.png')` }}>
      <div className="bg-blue-700/30 absolute top-0 left-0 w-full h-full"></div>
      <div className="bg-opacity-60 backdrop-blur-3xl bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  mx-auto max-w-screen-lg p-10 rounded-lg max-h-96 w-11/12 " >
        <h1 className="text-3xl text-white text-center pb-6">Lista de Tarefas</h1>
        <div className="relative w-full">
          <input
            className="w-full border p-3 rounded-lg shadow-2xl border-black text-black"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Nova tarefa..."
          />
          <button
            className="absolute right-[1px] top-1/2 -translate-y-1/2 h-full w-10 bg-blue-300 rounded-r-lg"
            style={{ height: "calc(100% - 2px)" }}
            onClick={addTask}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <ul className="my-10 overflow-y-auto md:max-h-40 max-h-40 ">
          {tasks.map((t) => (
            <li className="flex justify-between border-b border-white mb-3 pb-1" key={t.id} >
              <p className="text-xl text-white capitalize" style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                {t.text}
              </p>
              <div className="text-xl flex gap-4">
                <button onClick={() => toggleTask(t.id)} className="text-white">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={() => deleteTask(t.id)} className="text-red-700">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
