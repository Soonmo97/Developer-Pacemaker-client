// UnCompletedTodoList.js
import React from 'react';
import styled from 'styled-components';

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
// #4caf50
const TodoButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const TodoButton2 = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const UserUncompletedTodoList = ({ UncompletedTodos, handleDeleteTodo }) => (
  <div>
    <h3>Uncompleted</h3>
    <TodoItemContainer>
      {UncompletedTodos.map((todo) => (
        <TodoItem key={todo.tseq}>
          <span>
            <li>{todo.content}</li>
          </span>
          <TodoButton2>완료</TodoButton2>
          <TodoButton
            onClick={() => {
              handleDeleteTodo(todo.tseq);
            }}
          >
            삭제
          </TodoButton>
        </TodoItem>
      ))}
    </TodoItemContainer>
  </div>
);

export default UserUncompletedTodoList;
