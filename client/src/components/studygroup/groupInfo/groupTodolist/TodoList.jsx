// TodoList.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const TodoList = ({ todos, handleCompleteTodo, handleDeleteTodo }) => {
  useEffect(() => {}, []);

  return (
    <TodoItemContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.gtSeq}>
          <span>{todo.content}</span>
          <div>
            <TodoButton onClick={() => handleCompleteTodo(todo)} $completed>
              완료
            </TodoButton>
            <TodoButton onClick={() => handleDeleteTodo(todo.gtSeq)}>
              삭제
            </TodoButton>
          </div>
        </TodoItem>
      ))}
    </TodoItemContainer>
  );
};
export default TodoList;
