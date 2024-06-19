import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import UserCompletedTodoList from "./UserCompletedTodoList";
import UserUncompletedTodoList from "./UserUncompletedTodoList";
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
// const getTodos = async (uSeq, pSeq) => {
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_API_SERVER}/api/todo/${pSeq}`,
//       {
//         headers: { Authorization: `Bearer ${uSeq}` },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch todos:", error);
//     throw error;
//   }
// };

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
    console.error("Failed to add todo:", error);
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
    console.error("Failed to delete todo:", error);
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
    console.error("Failed to update todo:", error);
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

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       console.log("====투두리스트===", todos);
  //       console.log("Fetching todos...");
  //       const todos = await getTodos(uSeq, pSeq);
  //       console.log("Fetched todos:", todos);
  //       setTodos(todos);
  //     } catch (error) {
  //       console.error("Failed to fetch todos:", error);
  //     }
  //   };

  //   fetchTodos();
  // }, [uSeq, pSeq]);

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
        // 추가하면 바로 미완료 목록으로 추가되게끔 설정 (임시)
        setUncompletedTodos([...uncompletedTodos, newTodo]);
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
      await deleteTodo(todo.tSeq);
      setTodos(todos.filter((_, idx) => idx !== index));
      setCompletedTodos([...completedTodos, todo]);
    } catch (error) {
      console.error("Failed to complete todo:", error);
    }
  };

  const handleDeleteTodo = async (tSeq) => {
    try {
      await deleteTodo(tSeq);
      setCompletedTodos(completedTodos.filter((todo) => todo.tseq !== tSeq));
      setUncompletedTodos(
        uncompletedTodos.filter((todo) => todo.tseq !== tSeq)
      );
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleUpdateTodo = async (tSeq) => {
    try {
      await updateTodo(tSeq);
      // setCompletedTodos(completedTodos.filter((todo) => todo.tseq !== tSeq));
      // setUncompletedTodos(
      //   uncompletedTodos.filter((todo) => todo.tseq !== tSeq)
      // );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  // const handleDeleteCompletedTodo = (index) => {
  //   setCompletedTodos(completedTodos.filter((_, idx) => idx !== index));
  // };

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
      {/*
      <UserTodoListSet
        todos={todos}
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
      />*/}
      <UserCompletedTodoList
        completedTodos={completedTodos}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
      <UserUncompletedTodoList
        UncompletedTodos={uncompletedTodos}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
    </TodoListContainer>
  );
};

export default UserTodoList;
