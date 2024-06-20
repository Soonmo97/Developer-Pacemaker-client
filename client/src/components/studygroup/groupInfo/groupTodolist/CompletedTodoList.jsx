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

const CompletedTodoList = ({
  completedTodos,
  handleDeleteCompletedTodo,
  handleCompleteTodo,
}) => (
  <div>
    <div style={{ fontWeight: "bold", color: "#3700ff" }}>Completed</div>
    <TodoItemContainer>
      {completedTodos.map((todo) => (
        <TodoItem key={todo.gtSeq}>
          <span>
            <li>{todo.content}</li>
          </span>
          <TodoButton onClick={() => handleCompleteTodo(todo)} $completed>
            미완료
          </TodoButton>
          <TodoButton
            onClick={() => {
              handleDeleteCompletedTodo(todo.gtSeq);
            }}
          >
            삭제
          </TodoButton>
        </TodoItem>
      ))}
    </TodoItemContainer>
  </div>
);

export default CompletedTodoList;
