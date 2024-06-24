import React, { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

const PlannerModal = ({ onClose, onSave }) => {
  const [todos, setTodos] = useState([
    { content: "", duration: 0, isCompleted: false },
  ]);

  const handleTodoChange = (index, event) => {
    const { name, value } = event.target;
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], [name]: value };
    setTodos(newTodos);
  };

  const addTodo = () => {
    setTodos([...todos, { content: "", duration: 0, isCompleted: false }]);
  };

  const handleSave = () => {
    onSave(todos);
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>플래너 작성</h2>
        <div>
          {todos.map((todo, index) => (
            <div key={index}>
              <input
                type="text"
                name="content"
                value={todo.content}
                onChange={(e) => handleTodoChange(index, e)}
                placeholder="할 일을 입력하세요"
              />
              <input
                type="number"
                name="duration"
                value={todo.duration}
                onChange={(e) => handleTodoChange(index, e)}
                placeholder="소요 시간"
              />
              <label>
                완료 여부:
                <input
                  type="checkbox"
                  name="isCompleted"
                  checked={todo.isCompleted}
                  onChange={(e) => handleTodoChange(index, e)}
                />
              </label>
            </div>
          ))}
        </div>
        <button onClick={addTodo}>할 일 추가</button>
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default PlannerModal;
