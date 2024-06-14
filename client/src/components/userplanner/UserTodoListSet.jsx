// TodoList.js
import React from "react";
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

const UserTodoListSet = ({ todos, handleCompleteTodo, handleDeleteTodo }) => (
  <TodoItemContainer>
    {todos.map((todo, index) => (
      <TodoItem key={index}>
        <span>{todo}</span>
        <div>
          <TodoButton onClick={() => handleCompleteTodo(index)} $completed>
            완료
          </TodoButton>
          <TodoButton onClick={() => handleDeleteTodo(index)}>삭제</TodoButton>
        </div>
      </TodoItem>
    ))}
  </TodoItemContainer>
);

export default UserTodoListSet;
