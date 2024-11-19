import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Todo from './components/todo/Todo.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Todo />
);

reportWebVitals();
