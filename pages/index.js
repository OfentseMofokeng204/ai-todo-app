import React, { useState } from 'react';
import axios from 'axios';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('es');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false, translation: null }]);
    setInput('');
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const translateTodo = async (index) => {
    const todo = todos[index];
    try {
      const res = await axios.post('/api/translate', {
        text: todo.text,
        targetLang: language,
      });
      const translatedText = res.data.translated;
      const newTodos = [...todos];
      newTodos[index].translation = translatedText;
      setTodos(newTodos);
    } catch (error) {
      console.error('Translation failed', error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI-Powered To-Do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new to-do"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Translate to:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
        </select>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="border p-3 mb-2 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(index)}
                  className="mr-2"
                />
                <span className={todo.done ? 'line-through' : ''}>{todo.text}</span>
              </div>
              <button
                onClick={() => translateTodo(index)}
                className="text-sm bg-green-500 text-white px-2 py-1 rounded"
              >
                Translate
              </button>
            </div>
            {todo.translation && (
              <p className="mt-2 text-sm text-gray-600">Translation: {todo.translation}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
