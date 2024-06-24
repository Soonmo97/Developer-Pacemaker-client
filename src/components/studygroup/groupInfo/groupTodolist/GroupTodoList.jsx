import axios from "axios";
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
  background-color: ${(props) => (props.$completed ? "#4CAF50" : "#F44336")};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;
const deleteTodo = async (gtSeq) => {
  try {
    console.log("======gtSeq======", gtSeq);
    const token = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/api/group-todo/${gtSeq}`,
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
const patchTodo = async (gtSeq) => {
  try {
    console.log("======gtSeq======", gtSeq);
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(
      `${process.env.REACT_APP_API_SERVER}/api/group-todo/change/${gtSeq}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("response.data;response.data;response.data;", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to patch todo:", error);
    throw error;
  }
};
const GroupTodoList = ({ response, formattedDate, sgSeq, gpSeq, getGpSeq }) => {
  const [todos, setTodos] = useState(response);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [uncompletedTodos, setUncompletedTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    console.log("========gpSeq===gpSeq", gpSeq);
    if (response) {
      console.log("===========response", response);
      // setGpSeq(response[0].gpSeq);
    }
    console.log("****** ***gpSeq, sgSeq*******", gpSeq, sgSeq);
    if (todos) {
      const filteredTodos = todos.filter((todoItem) => todoItem.isCompleted);
      setCompletedTodos(filteredTodos);
      const UncompletedTodos = todos.filter(
        (todoItem) => !todoItem.isCompleted
      );
      setUncompletedTodos(UncompletedTodos);
      console.log("======filteredTodos", filteredTodos);
      console.log("======UncompletedTodos", UncompletedTodos);
    }
  }, [todos]);
  const addTodo = async (sgSeq, gpSeq, todo, formattedDate) => {
    try {
      console.log("==addTodo=", gpSeq, todo);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Access token is missing");
      }
      if (gpSeq == null) {
        console.log("gpSeq null", sgSeq, todo);
        // 플래너가 생성되지 않은 경우
        const payload = {
          sgSeq: sgSeq,
          ...(todo ? { groupTodoCreateDTOList: [{ content: todo }] } : {}),
        };
        console.log("payloadpayload", payload);
        const response = await axios.post(
          `${process.env.REACT_APP_API_SERVER}/api/group-planner/save?date=${formattedDate}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("플래너 생성이 완료되었습니다.");
        // 추가하면 바로 미완료 목록으로 추가되게끔 설정 (임시)
        setUncompletedTodos([...uncompletedTodos, response.data]);
        getGpSeq(response.data.groupPlanner.gpSeq);
      } else {
        // 기존 플래너에 투두 추가
        const response = await axios.post(
          `${process.env.REACT_APP_API_SERVER}/api/group-todo/${gpSeq}`,
          { content: todo },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // 추가하면 바로 미완료 목록으로 추가되게끔 설정 (임시)
        setUncompletedTodos([...uncompletedTodos, response.data]);
      }
      return response.data;
    } catch (error) {
      console.error("Failed to add todo:", error);
      throw error;
    }
  };
  const handleAddTodo = async () => {
    if (inputValue.trim() === "") return;
    try {
      if (isEditing) {
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? { ...todo, content: inputValue } : todo
        );
        setTodos(updatedTodos);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const addedTodo = await addTodo(
          sgSeq,
          gpSeq,
          inputValue,
          formattedDate
        ); // gpSeq를 null로 설정
        console.log("========addedTodo==========", addedTodo);
        if (!addedTodo) {
          setInputValue("");
          return;
        }
        // 추가하면 바로 미완료 목록으로 추가되게끔 설정 (임시)
        setUncompletedTodos([...uncompletedTodos, addedTodo]);
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
  const handleCompleteTodo = async (ctodo) => {
    const response = await patchTodo(ctodo.gtSeq);
    if (response) {
      setCompletedTodos([...completedTodos, ctodo]);
      setUncompletedTodos((prevCompletedTodos) =>
        uncompletedTodos.filter((t) => t.gtSeq !== ctodo.gtSeq)
      );
    } else {
      setUncompletedTodos([...uncompletedTodos, ctodo]);
      setCompletedTodos((prevCompletedTodos) =>
        completedTodos.filter((t) => t.gtSeq !== ctodo.gtSeq)
      );
    }
  };
  // const handleDeleteTodo = (index) => {
  //   setTodos(todos.filter((_, idx) => idx !== index));
  // };
  const handleDeleteCompletedTodo = async (gtSeq) => {
    await deleteTodo(gtSeq);
    setCompletedTodos(completedTodos.filter((todo) => todo.gtSeq !== gtSeq));
    setUncompletedTodos(
      uncompletedTodos.filter((todo) => todo.gtSeq !== gtSeq)
    );
  };
  return (
    <TodoListContainer
      style={{ display: "flex", justifyContent: "center", gap: "5rem" }}
    >
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
        <TodoList
          todos={uncompletedTodos}
          handleCompleteTodo={handleCompleteTodo}
          handleDeleteTodo={handleDeleteCompletedTodo}
        />
      </div>
      <CompletedTodoList
        completedTodos={completedTodos}
        handleDeleteCompletedTodo={handleDeleteCompletedTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
    </TodoListContainer>
  );
};
export default GroupTodoList;
