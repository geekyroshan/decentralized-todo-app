import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import TodoList from './artifacts/contracts/TodoList.sol/TodoList.json';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchTasks() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, TodoList.abi, provider);
      try {
        const data = await contract.getTasks();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      }
    }
  }

  async function createTask() {
    if (!newTask) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, TodoList.abi, signer);
      setLoading(true);
      try {
        const transaction = await contract.createTask(newTask);
        await transaction.wait();
        setNewTask("");
        await fetchTasks();
      } catch (err) {
        console.error("Error creating task:", err);
        setLoading(false);
      }
    }
  }

  async function toggleCompleted(id) {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, TodoList.abi, signer);
      setLoading(true);
      try {
        const transaction = await contract.toggleCompleted(id);
        await transaction.wait();
        await fetchTasks();
      } catch (err) {
        console.error("Error toggling task completion:", err);
        setLoading(false);
      }
    }
  }

  return (
    <div className="App">
      <h1>Decentralized Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button onClick={createTask}>Add Task</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span className="task-content">{task.content}</span>
              <span className="task-timestamp">
                {new Date(task.timestamp * 1000).toLocaleString()}
              </span>
              <button 
                onClick={() => toggleCompleted(task.id)}
                className={task.completed ? 'btn-completed' : 'btn-complete'}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;