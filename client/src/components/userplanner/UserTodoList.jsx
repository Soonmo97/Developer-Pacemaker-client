import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import UserCompletedTodoList from "./UserCompletedTodoList";
import UserUncompletedTodoList from "./UserUncompletedTodoList";

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

const addTodo = async (pSeq, todo) => {
  try {
    if (pSeq == null) {
      alert("플래너를 먼저 생성해주세요.");
      return false;
    }
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/api/todo/${pSeq}`,
      todo,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (tSeq) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/api/todo/${tSeq}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (tSeq, todo) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(
      `${process.env.REACT_APP_API_SERVER}/api/todo/${tSeq}`,
      todo,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const UserTodoList = ({ uSeq, pSeq, todo, onTodosChange }) => {
  const [todos, setTodos] = useState(todo);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [uncompletedTodos, setUncompletedTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (todos) {
      const filteredTodos = todos.filter((todoItem) => todoItem.isCompleted);
      setCompletedTodos(filteredTodos);
      const UncompletedTodos = todos.filter(
        (todoItem) => !todoItem.isCompleted
      );
      setUncompletedTodos(UncompletedTodos);
    }
  }, []);

  const handleInputChange = (value) => {
    setInputValue(value);
    onTodosChange(value);
  };

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
        const addedTodo = await addTodo(pSeq, newTodo);
        if (!addedTodo) {
          setInputValue("");
          return;
        }

        setUncompletedTodos([...uncompletedTodos, addedTodo]);
      }
      setInputValue("");
    } catch (error) {}
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleCompleteTodo = async (tSeq) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/todo/change/${tSeq}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTodo = uncompletedTodos.filter((todo) => todo.tseq === tSeq);
      setUncompletedTodos(
        uncompletedTodos.filter((todo) => todo.tseq !== tSeq)
      );

      setCompletedTodos([...completedTodos, ...updatedTodo]);
    } catch (error) {}
  };

  const handleDeleteTodo = async (tSeq) => {
    try {
      await deleteTodo(tSeq);
      setCompletedTodos(completedTodos.filter((todo) => todo.tseq !== tSeq));
      setUncompletedTodos(
        uncompletedTodos.filter((todo) => todo.tseq !== tSeq)
      );
    } catch (error) {}
  };

  const handleUpdateTodo = async (tSeq) => {
    try {
      await updateTodo(tSeq);
    } catch (error) {}
  };

  return (
    <TodoListContainer>
      <div>
        <TodoInput
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
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
      <UserCompletedTodoList
        completedTodos={completedTodos}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
      <UserUncompletedTodoList
        UncompletedTodos={uncompletedTodos}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
    </TodoListContainer>
  );
};

export default UserTodoList;
