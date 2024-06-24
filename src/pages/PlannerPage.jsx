import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const PlannerPage = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [studyHours, setStudyHours] = useState(0);
  const [personalNote, setPersonalNote] = useState("");

  useEffect(() => {
    fetchPlanner();
  }, [date]);

  const fetchPlanner = async () => {
    try {
      const response = await axios.get("/api/planner", { params: { date } });
      setTodos(response.data);
    } catch (error) {}
  };

  const addTodo = async () => {
    try {
      await axios.post("/api/todo", {
        content: newTodo,
        duration: studyHours,
        isCompleted: false,
      });
      setNewTodo("");
      setStudyHours(0);
      fetchPlanner();
    } catch (error) {}
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todo/${id}`);
      fetchPlanner();
    } catch (error) {}
  };

  const savePersonalNote = async () => {
    try {
      await axios.post("/api/report", {
        content: personalNote,
      });
      setPersonalNote("");
    } catch (error) {}
  };

  return (
    <PlannerContainer>
      <Header>
        <DateInput
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Header>
      <TodoSection>
        <TodoList>
          <h2>할 일 목록</h2>
          <ul>
            {todos.map((todo) => (
              <TodoItem key={todo.id}>
                <span>{todo.content}</span>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </TodoItem>
            ))}
          </ul>
        </TodoList>
        <TodoForm>
          <h2>새 할 일 추가</h2>
          <input
            type="text"
            placeholder="할 일 입력"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <input
            type="number"
            placeholder="공부 시간 (시간 단위)"
            value={studyHours}
            onChange={(e) => setStudyHours(e.target.value)}
          />
          <button onClick={addTodo}>추가</button>
        </TodoForm>
        <NoteSection>
          <h2>개인 메모</h2>
          <textarea
            placeholder="메모 작성"
            value={personalNote}
            onChange={(e) => setPersonalNote(e.target.value)}
          />
          <button onClick={savePersonalNote}>저장</button>
        </NoteSection>
      </TodoSection>
    </PlannerContainer>
  );
};

export default PlannerPage;

const PlannerContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DateInput = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
`;

const TodoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TodoList = styled.div`
  margin-bottom: 20px;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
`;

const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  span {
    flex-grow: 1;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
  }
`;

const TodoForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  h2 {
    margin-bottom: 10px;
  }

  input {
    margin-bottom: 10px;
    padding: 5px;
  }

  button {
    padding: 5px 10px;
  }
`;

const NoteSection = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 10px;
  }

  textarea {
    margin-bottom: 10px;
    padding: 10px;
    height: 100px;
    resize: none;
  }

  button {
    padding: 5px 10px;
  }
`;
