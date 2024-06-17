import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import UserCompletedTodoList from "./UserCompletedTodoList";
import UserTodoListSet from "./UserTodoListSet";

const API_URL = "http://localhost:8080/api/todo"; // 백엔드 API 주소로 변경

// 스타일 컴포넌트
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

// API 함수
const getTodos = async (uSeq, pSeq) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/todo/${pSeq}`,
      {
        headers: { Authorization: `Bearer ${uSeq}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error;
  }
};

const addTodo = async (uSeq, pSeq, todo) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/api/todo/${pSeq}`,
      todo,
      {
        headers: { Authorization: `Bearer ${uSeq}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add todo:", error);
    throw error;
  }
};

const updateTodo = async (uSeq, tSeq, todo) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_SERVER}/api/todo/${tSeq}`,
      todo,
      {
        headers: { Authorization: `Bearer ${uSeq}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update todo:", error);
    throw error;
  }
};

const deleteTodo = async (uSeq, tSeq) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/api/todo/${tSeq}`,
      {
        headers: { Authorization: `Bearer ${uSeq}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete todo:", error);
    throw error;
  }
};

const UserTodoList = ({ uSeq, pSeq }) => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        console.log("Fetching todos...");
        const todos = await getTodos(uSeq, pSeq);
        console.log("Fetched todos:", todos);
        setTodos(todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, [uSeq, pSeq]);

  const handleAddTodo = async () => {
    if (inputValue.trim() === "") return;

    const newTodo = { content: inputValue };

    try {
      if (isEditing) {
        const updatedTodo = await updateTodo(
          uSeq,
          todos[editIndex].tSeq,
          newTodo
        );
        setTodos(
          todos.map((todo, index) => (index === editIndex ? updatedTodo : todo))
        );
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const addedTodo = await addTodo(uSeq, pSeq, newTodo);
        setTodos([...todos, addedTodo]);
      }
      setInputValue("");
    } catch (error) {
      console.error("Failed to add/update todo:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleCompleteTodo = async (index) => {
    const todo = todos[index];
    try {
      await deleteTodo(uSeq, todo.tSeq);
      setTodos(todos.filter((_, idx) => idx !== index));
      setCompletedTodos([...completedTodos, todo]);
    } catch (error) {
      console.error("Failed to complete todo:", error);
    }
  };

  const handleDeleteTodo = async (index) => {
    try {
      await deleteTodo(uSeq, todos[index].tSeq);
      setTodos(todos.filter((_, idx) => idx !== index));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
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
      <UserTodoListSet
        todos={todos}
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
      <UserCompletedTodoList
        completedTodos={completedTodos}
        handleDeleteCompletedTodo={handleDeleteCompletedTodo}
      />
    </TodoListContainer>
  );
};

export default UserTodoList;
