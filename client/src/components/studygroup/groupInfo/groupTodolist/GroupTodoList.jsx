import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CompletedTodoList from "./CompletedTodoList";
import TodoList from "./TodoList";

const TodoListContainer = styled.div`
  width: 100%;
`;

const TodoInput = styled.input`
  flex: 1;
  margin-right: 1rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TodoButton = styled.button`
  background-color: ${(props) => (props.$completed ? "#4caf50" : "#f44336")};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const GroupTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedCompletedTodos = localStorage.getItem("completedTodos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));
    if (storedCompletedTodos)
      setCompletedTodos(JSON.parse(storedCompletedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [todos, completedTodos]);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    if (isEditing) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? inputValue : todo
      );
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTodos([...todos, inputValue]);
    }

    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleCompleteTodo = (index) => {
    const todo = todos[index];
    setTodos(todos.filter((_, idx) => idx !== index));
    setCompletedTodos([...completedTodos, todo]);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, idx) => idx !== index));
  };

  const handleDeleteCompletedTodo = (index) => {
    setCompletedTodos(completedTodos.filter((_, idx) => idx !== index));
  };

  return (
    <TodoListContainer>
      <div>
        <TodoInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="할 일을 입력하세요"
        />
        <TodoButton
          onClick={handleAddTodo}
          $completed={isEditing ? true : undefined}
        >
          {isEditing ? "수정" : "추가"}
        </TodoButton>
      </div>
      <TodoList
        todos={todos}
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
      <CompletedTodoList
        completedTodos={completedTodos}
        handleDeleteCompletedTodo={handleDeleteCompletedTodo}
      />
    </TodoListContainer>
  );
};

export default GroupTodoList;
