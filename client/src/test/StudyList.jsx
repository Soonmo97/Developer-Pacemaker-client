import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const TodoItemContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 15rem;
`;

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
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

const GroupTodoList = ({ response, formattedDate, sgSeq, gpSeq, getGpSeq }) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (response) {
      setTodos(response);
    }
  }, [response]);

  const deleteTodo = async (gtSeq) => {
    try {
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
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/group-todo/change/${gtSeq}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to patch todo:", error);
      throw error;
    }
  };

  const addTodo = async (sgSeq, gpSeq, todo, formattedDate) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token is missing");
      }

      let response;
      if (gpSeq === null) {
        const payload = {
          sgSeq: sgSeq,
          ...(todo ? { groupTodoCreateDTOList: [{ content: todo }] } : {}),
        };

        response = await axios.post(
          `${process.env.REACT_APP_API_SERVER}/api/group-planner/save?date=${formattedDate}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("플래너 생성이 완료되었습니다.");
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_SERVER}/api/group-todo/${gpSeq}`,
          { content: todo },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setTodos([...todos, response.data]);
      setInputValue("");
    } catch (error) {
      console.error("Failed to add todo:", error);
      throw error;
    }
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() === "") return;
    try {
      const addedTodo = await addTodo(sgSeq, gpSeq, inputValue, formattedDate);
      console.log("Added Todo:", addedTodo);
    } catch (error) {
      console.error("Failed to add/update todo:", error);
    }
  };

  const handleCompleteTodo = async (todo) => {
    const response = await patchTodo(todo.gtSeq);
    if (response) {
      const updatedTodos = todos.map((t) =>
        t.gtSeq === todo.gtSeq ? { ...t, isCompleted: true } : t
      );
      setTodos(updatedTodos);
    } else {
      console.error("Failed to mark todo as complete:", todo);
    }
  };

  const handleDeleteTodo = async (gtSeq) => {
    await deleteTodo(gtSeq);
    const updatedTodos = todos.filter((t) => t.gtSeq !== gtSeq);
    setTodos(updatedTodos);
  };

  const handleDeleteCompletedTodo = async (gtSeq) => {
    await deleteTodo(gtSeq);
    const updatedTodos = todos.filter((t) => t.gtSeq !== gtSeq);
    setTodos(updatedTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div>
      <div style={{ fontWeight: "bold", color: "#3700ff" }}>Completed</div>
      <TodoItemContainer>
        {todos.map((todo) => (
          <TodoItem key={todo.gtSeq}>
            <span>{todo.content}</span>
            <div>
              {!todo.isCompleted && (
                <TodoButton onClick={() => handleCompleteTodo(todo)} $completed>
                  완료
                </TodoButton>
              )}
              <TodoButton onClick={() => handleDeleteTodo(todo.gtSeq)}>
                삭제
              </TodoButton>
            </div>
          </TodoItem>
        ))}
      </TodoItemContainer>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleAddTodo}>추가</button>
    </div>
  );
};

export default GroupTodoList;
