// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import CompletedTodoList from "./CompletedTodoList";
// import TodoList from "./TodoList";

// const TodoListContainer = styled.div`
//   width: 100%;
// `;

// const TodoInput = styled.input`
//   flex: 1;
//   margin-right: 1rem;
//   padding: 0.5rem;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const TodoButton = styled.button`
//   background-color: ${(props) => (props.$completed ? "#4caf50" : "#f44336")};
//   color: white;
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const deleteTodo = async (gtSeq) => {
//   try {
//     console.log("======gtSeq======", gtSeq);
//     const token = localStorage.getItem("accessToken");
//     const response = await axios.delete(
//       `${process.env.REACT_APP_API_SERVER}/api/group-todo/${gtSeq}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to delete todo:", error);
//     throw error;
//   }
// };

// const patchTodo = async (gtSeq) => {
//   try {
//     console.log("======gtSeq======", gtSeq);
//     const token = localStorage.getItem("accessToken");
//     const response = await axios.patch(
//       `${process.env.REACT_APP_API_SERVER}/api/group-todo/change/${gtSeq}`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     console.log("response.data;response.data;response.data;", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to patch todo:", error);
//     throw error;
//   }
// };

// const GroupTodoList = ({ response, formattedDate, sgSeq, gpSeq, getGpSeq }) => {
//   const [todos, setTodos] = useState(response);
//   const [completedTodos, setCompletedTodos] = useState([]);
//   const [uncompletedTodos, setUncompletedTodos] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     console.log("========gpSeq===gpSeq", gpSeq);
//     if (response) {
//       console.log("===========response", response);
//       // setGpSeq(response[0].gpSeq);
//     }
//     console.log("****** ***gpSeq, sgSeq*******", gpSeq, sgSeq);
//     if (todos) {
//       const filteredTodos = todos.filter((todoItem) => todoItem.isCompleted);
//       setCompletedTodos(filteredTodos);
//       const UncompletedTodos = todos.filter(
//         (todoItem) => !todoItem.isCompleted
//       );
//       setUncompletedTodos(UncompletedTodos);
//       console.log("======filteredTodos", filteredTodos);
//       console.log("======UncompletedTodos", UncompletedTodos);
//     }
//   }, [todos]);

//   const addTodo = async (sgSeq, gpSeq, todo, formattedDate) => {
//     try {
//       console.log("==addTodo=", gpSeq, todo);
//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         throw new Error("Access token is missing");
//       }

//       if (gpSeq == null) {
//         console.log("gpSeq null", sgSeq, todo);
//         // 플래너가 생성되지 않은 경우
//         const payload = {
//           sgSeq: sgSeq,
//           ...(todo ? { groupTodoCreateDTOList: [{ content: todo }] } : {}),
//         };

//         console.log("payloadpayload", payload);

//         const response = await axios.post(
//           `${process.env.REACT_APP_API_SERVER}/api/group-planner/save?date=${formattedDate}`,
//           payload,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         alert("플래너 생성이 완료되었습니다.");
//         // 추가하면 바로 미완료 목록으로 추가되게끔 설정 (임시)
//         setUncompletedTodos([...uncompletedTodos, response.data]);

//         getGpSeq(response.data.groupPlanner.gpSeq);
//       } else {
//         // 기존 플래너에 투두 추가
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_SERVER}/api/group-todo/${gpSeq}`,
//           { content: todo },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         // 추가하면 바로 미완료 목록으로 추가되게끔 설정 (임시)
//         setUncompletedTodos([...uncompletedTodos, response.data]);
//       }

//       return response.data;
//     } catch (error) {
//       console.error("Failed to add todo:", error);
//       throw error;
//     }
//   };

//   const handleAddTodo = async () => {
//     if (inputValue.trim() === "") return;
//     try {
//       if (isEditing) {
//         const updatedTodos = todos.map((todo, index) =>
//           index === editIndex ? { ...todo, content: inputValue } : todo
//         );
//         setTodos(updatedTodos);
//         setIsEditing(false);
//         setEditIndex(null);
//       } else {
//         const addedTodo = await addTodo(
//           sgSeq,
//           gpSeq,
//           inputValue,
//           formattedDate
//         ); // gpSeq를 null로 설정
//         console.log("========addedTodo==========", addedTodo);
//         if (!addedTodo) {
//           setInputValue("");
//           return;
//         }
//         // 추가하면 바로 미완료 목록으로 추가되게끔 설정 (임시)
//         setUncompletedTodos([...uncompletedTodos, addedTodo]);
//       }
//       setInputValue("");
//     } catch (error) {
//       console.error("Failed to add/update todo:", error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleAddTodo();
//     }
//   };

//   const handleCompleteTodo = async (ctodo) => {
//     const response = await patchTodo(ctodo.gtSeq);
//     if (response) {
//       setCompletedTodos([...completedTodos, ctodo]);
//       setUncompletedTodos((prevCompletedTodos) =>
//         uncompletedTodos.filter((t) => t.gtSeq !== ctodo.gtSeq)
//       );
//     } else {
//       setUncompletedTodos([...uncompletedTodos, ctodo]);
//       setCompletedTodos((prevCompletedTodos) =>
//         completedTodos.filter((t) => t.gtSeq !== ctodo.gtSeq)
//       );
//     }
//   };

//   // const handleDeleteTodo = (index) => {
//   //   setTodos(todos.filter((_, idx) => idx !== index));
//   // };

//   const handleDeleteCompletedTodo = async (gtSeq) => {
//     await deleteTodo(gtSeq);
//     setCompletedTodos(completedTodos.filter((todo) => todo.gtSeq !== gtSeq));
//     setUncompletedTodos(
//       uncompletedTodos.filter((todo) => todo.gtSeq !== gtSeq)
//     );
//   };

//   return (
//     <TodoListContainer
//       style={{ display: "flex", justifyContent: "center", gap: "5rem" }}
//     >
//       <div>
//         <TodoInput
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="할 일을 입력하세요"
//         />
//         <TodoButton
//           onClick={handleAddTodo}
//           $completed={isEditing ? true : undefined}
//         >
//           {isEditing ? "수정" : "추가"}
//         </TodoButton>

//         <TodoList
//           todos={uncompletedTodos}
//           handleCompleteTodo={handleCompleteTodo}
//           handleDeleteTodo={handleDeleteCompletedTodo}
//         />
//       </div>
//       <CompletedTodoList
//         completedTodos={completedTodos}
//         handleDeleteCompletedTodo={handleDeleteCompletedTodo}
//         handleCompleteTodo={handleCompleteTodo}
//       />
//     </TodoListContainer>
//   );
// };

// export default GroupTodoList;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import axios from "axios";

// const TodoItemContainer = styled.div`
//   overflow-y: auto;
//   overflow-x: hidden;
//   max-height: 15rem;
// `;

// const TodoItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 0.5rem;
//   padding: 0.5rem;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const TodoButton = styled.button`
//   background-color: ${(props) => (props.$completed ? "#4caf50" : "#f44336")};
//   color: white;
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const GroupTodoList = ({ response, formattedDate, sgSeq, gpSeq, getGpSeq }) => {
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState("");

//   useEffect(() => {
//     if (response) {
//       setTodos(response);
//     }
//   }, [response]);

//   const deleteTodo = async (gtSeq) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.delete(
//         `${process.env.REACT_APP_API_SERVER}/api/group-todo/${gtSeq}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Failed to delete todo:", error);
//       throw error;
//     }
//   };

//   const patchTodo = async (gtSeq) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.patch(
//         `${process.env.REACT_APP_API_SERVER}/api/group-todo/change/${gtSeq}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Failed to patch todo:", error);
//       throw error;
//     }
//   };

//   const addTodo = async (sgSeq, gpSeq, todo, formattedDate) => {
//     try {
//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         throw new Error("Access token is missing");
//       }

//       let response;
//       if (gpSeq === null) {
//         const payload = {
//           sgSeq: sgSeq,
//           ...(todo ? { groupTodoCreateDTOList: [{ content: todo }] } : {}),
//         };

//         response = await axios.post(
//           `${process.env.REACT_APP_API_SERVER}/api/group-planner/save?date=${formattedDate}`,
//           payload,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         alert("플래너 생성이 완료되었습니다.");
//       } else {
//         response = await axios.post(
//           `${process.env.REACT_APP_API_SERVER}/api/group-todo/${gpSeq}`,
//           { content: todo },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       }

//       setTodos([...todos, response.data]);
//       setInputValue("");
//     } catch (error) {
//       console.error("Failed to add todo:", error);
//       throw error;
//     }
//   };

//   const handleAddTodo = async () => {
//     if (inputValue.trim() === "") return;
//     try {
//       const addedTodo = await addTodo(sgSeq, gpSeq, inputValue, formattedDate);
//       console.log("Added Todo:", addedTodo);
//     } catch (error) {
//       console.error("Failed to add/update todo:", error);
//     }
//   };

//   const handleCompleteTodo = async (todo) => {
//     const response = await patchTodo(todo.gtSeq);
//     if (response) {
//       const updatedTodos = todos.map((t) =>
//         t.gtSeq === todo.gtSeq ? { ...t, isCompleted: true } : t
//       );
//       setTodos(updatedTodos);
//     } else {
//       console.error("Failed to mark todo as complete:", todo);
//     }
//   };

//   const handleDeleteTodo = async (gtSeq) => {
//     await deleteTodo(gtSeq);
//     const updatedTodos = todos.filter((t) => t.gtSeq !== gtSeq);
//     setTodos(updatedTodos);
//   };

//   const handleDeleteCompletedTodo = async (gtSeq) => {
//     await deleteTodo(gtSeq);
//     const updatedTodos = todos.filter((t) => t.gtSeq !== gtSeq);
//     setTodos(updatedTodos);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleAddTodo();
//     }
//   };

//   return (
//     <div>
//       <div style={{ fontWeight: "bold", color: "#3700ff" }}>Completed</div>
//       <TodoItemContainer>
//         {todos.map((todo) => (
//           <TodoItem key={todo.gtSeq}>
//             <span>{todo.content}</span>
//             <div>
//               {!todo.isCompleted && (
//                 <TodoButton onClick={() => handleCompleteTodo(todo)} $completed>
//                   완료
//                 </TodoButton>
//               )}
//               <TodoButton onClick={() => handleDeleteTodo(todo.gtSeq)}>
//                 삭제
//               </TodoButton>
//             </div>
//           </TodoItem>
//         ))}
//       </TodoItemContainer>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         onKeyPress={handleKeyPress}
//       />
//       <button onClick={handleAddTodo}>추가</button>
//     </div>
//   );
// };

// export default GroupTodoList;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const AppContainer = styled.div`
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
  max-height: 100%;
  background-color: #dbf3b5;
  padding: 24px;
  overflow: auto;
`;

const AppHeader = styled.h1`
  font-size: 20px;
  line-height: 32px;
  margin: 0 0 12px 0;
  /* color: #fff; */
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
  border-bottom: 1px solid black;
  background-color: transparent;
  margin-right: 12px;
  /* color: #fff; */
  box-shadow: none;
  border-radius: 0;

  &::placeholder {
    /* color: #fff; */
  }
`;

const SubmitTask = styled.input`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: none;
  background: var(--add-button);
  background-color: #0d3d15;
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
  background-color: #cfe9af;
  border-radius: 4px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  padding: 8px;
`;

const TaskLabel = styled.label`
  display: flex;
  align-items: flex-start;
  /* color: #fff; */
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
  border: 1.5px solid #fff;
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
    border-color: white;
    box-shadow: 0 0 0 3px var(--checkbox-shadow);
  }

  &:checked {
    background-size: 10px;
    border: 1px solid var(--checkbox-color);
    background-color: black;

    + span {
      color: rgba(255, 255, 255, 0.5);
      text-decoration: line-through rgba(236, 47, 47, 0.8);
    }
  }
`;

const TaskName = styled.span`
  /* color: #fff; */
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
  const [isActive, setIsActive] = useState(false);

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

  const handleCompleteTodo = async (todo) => {
    const response = await patchTodo(todo.gtSeq);
    if (response) {
      const updatedTodos = todos.map((t) =>
        t.gtSeq === todo.gtSeq ? { ...t, isCompleted: true } : t
      );
      setTodos(updatedTodos);
      console.log("할일완료!");
    } else {
      console.error("Failed to mark todo as complete:", todo);
    }
  };

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
              <TaskCheckbox
                type="checkbox"
                onClick={() => handleCompleteTodo(todo)}
              />
              <TaskName>{todo.content}</TaskName>
            </TaskLabel>
            <DeleteButton
              onClick={() => handleDeleteTodo(todo.gtSeq)}
              title="Delete Task"
            />
          </TaskListItem>
        ))}
      </TaskList>
    </AppContainer>
  );
};

export default GroupTodoList;
