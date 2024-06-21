import React, { useState } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
  max-height: 100%;
  background-color: #10101d;
  padding: 24px;
  overflow: auto;
`;

const AppHeader = styled.h1`
  font-size: 20px;
  line-height: 32px;
  margin: 0 0 12px 0;
  color: #fff;
`;

const AddTask = styled.div`
  height: 40px;
  font-size: 14px;
  display: flex;
`;

const TaskInput = styled.input`
  border-right: none;
  width: 100%;
  padding: 0 4px;
  outline: none;
  border: none;
  border-bottom: 1px solid #fff;
  background-color: transparent;
  margin-right: 12px;
  color: #fff;
  box-shadow: none;
  border-radius: 0;

  &::placeholder {
    color: #fff;
  }
`;

const SubmitTask = styled.input`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: none;
  background: var(--add-button);
  color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-plus'%3E%3Cline x1='12' y1='5' x2='12' y2='19'/%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E%3C/svg%3E");
  background-size: 18px;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 12px 0 var(--add-button-shadow);
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskListItem = styled.li`
  background-color: #191933;
  border-radius: 4px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  padding: 8px;
`;

const TaskLabel = styled.label`
  display: flex;
  align-items: flex-start;
  color: #fff;
  margin-right: 8px;
  font-size: 14px;
  line-height: 24px;
  position: relative;
  transition: 0.2s;
  cursor: pointer;
`;

const TaskCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check' stroke='%23fff'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0;
  transition: 0.2s;
  margin-right: 8px;
  flex-shrink: 0;
  margin-top: 4px;
  appearance: none;

  &:hover {
    border-color: var(--checkbox-color);
    box-shadow: 0 0 0 3px var(--checkbox-shadow);
  }

  &:checked {
    background-size: 10px;
    border: 1px solid var(--checkbox-color);
    background-color: var(--checkbox-color);

    + span {
      color: rgba(255, 255, 255, 0.5);
      text-decoration: line-through rgba(255, 255, 255, 0.8);
    }
  }
`;

const TaskName = styled.span`
  color: #fff;
`;

const DeleteButton = styled.span`
  margin-left: auto;
  display: block;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ff3d46' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-trash-2'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/%3E%3Cline x1='10' y1='11' x2='10' y2='17'/%3E%3Cline x1='14' y1='11' x2='14' y2='17'/%3E%3C/svg%3E");
  background-size: 16px;
  background-position: center;
  cursor: pointer;
`;

const GroupTodoList = ({ response, formattedDate, sgSeq, gpSeq, getGpSeq }) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // const [tasks, setTasks] = useState([
  //   { name: "Start a new pen" },
  //   { name: "Read a book" },
  //   { name: "Meeting with team" },
  // ]);
  // const [taskName, setTaskName] = useState("");

  useEffect(() => {
    if (response) {
      setTodos(response);
    }
  }, [response]);

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

  // const newItem = () => {
  //   if (!taskName.trim()) return;
  //   setTasks([...tasks, { name: taskName }]);
  //   setTaskName("");
  // };

  // const delItem = (task) => {
  //   const updatedTasks = tasks.filter((t) => t !== task);
  //   setTasks(updatedTasks);
  // };

  const handleDeleteTodo = async (gtSeq) => {
    await deleteTodo(gtSeq);
    const updatedTodos = todos.filter((t) => t.gtSeq !== gtSeq);
    setTodos(updatedTodos);
  };

  return (
    <AppContainer>
      <AppHeader>TO DO LIST</AppHeader>
      <AddTask>
        <TaskInput
          type="text"
          placeholder="Add New Task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SubmitTask
          type="submit"
          value=""
          onClick={handleAddTodo}
          title="Add Task"
        />
      </AddTask>
      <TaskList>
        {todos.map((todo, index) => (
          <TaskListItem key={index}>
            <TaskLabel>
              <TaskCheckbox type="checkbox" />
              <TaskName>{todo.content}</TaskName>
            </TaskLabel>
            <DeleteButton
              onClick={() => handleDeleteTodo(todo)}
              title="Delete Task"
            />
          </TaskListItem>
        ))}
      </TaskList>
    </AppContainer>
  );
};

export default GroupTodoList;
