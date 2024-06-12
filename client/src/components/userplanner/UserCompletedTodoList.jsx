// CompletedTodoList.js
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

const UserCompletedTodoList = ({
  completedTodos,
  handleDeleteCompletedTodo,
}) => (
  <div>
    <h3>Completed</h3>
    <TodoItemContainer>
      {completedTodos.map((todo, index) => (
        <TodoItem key={index}>
          <span>
            <li>{todo}</li>
          </span>
          <TodoButton
            onClick={() => {
              handleDeleteCompletedTodo(index);
            }}
          >
            삭제
          </TodoButton>
        </TodoItem>
      ))}
    </TodoItemContainer>
  </div>
);

export default UserCompletedTodoList;
