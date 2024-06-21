// import React, { useState } from "react";
// import styled from "styled-components";

// const AppWrapper = styled.div`
//   background-image: linear-gradient(
//     102.7deg,
//     rgba(253, 218, 255, 1) 8.2%,
//     rgba(223, 173, 252, 1) 19.6%,
//     rgba(173, 205, 252, 1) 36.8%,
//     rgba(173, 252, 244, 1) 73.2%,
//     rgba(202, 248, 208, 1) 90.9%
//   );
//   background-attachment: fixed;
//   display: flex;
//   flex-direction: column;
//   background-repeat: no-repeat;
//   background-size: cover;
//   padding: 20px;
//   height: 100vh;
//   overflow: hidden;
//   max-width: 400px;
//   width: 100%;
//   margin: auto;
//   background-color: #fff;
//   font-family: "DM Sans", sans-serif;
//   border-radius: 16px;
//   font-size: 15px;
//   color: #455963;
//   box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
// `;

// const TaskList = styled.div`
//   max-height: 60vh;
//   overflow: auto;
// `;

// const TaskHeader = styled.div`
//   padding: 20px 20px 6px 20px;
// `;

// const TaskHeaderTitle = styled.h1`
//   margin: 0;
//   font-size: 20px;
//   font-weight: 600;
// `;

// const TaskTools = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   flex-wrap: wrap;
//   padding: 0 20px;
// `;

// const TaskFilter = styled.button`
//   border: 0;
//   padding: 3px 8px;
//   background: 0;
//   font-size: 14px;
//   line-height: 1;
//   cursor: pointer;
//   color: #8a9ca5;
//   border-radius: 20px;
//   &.is-active {
//     background-color: #7996a5;
//     color: #fff;
//   }
// `;

// const TaskCount = styled.div`
//   color: #8a9ca5;
//   font-size: 14px;
// `;

// const TaskForm = styled.form`
//   display: flex;
//   margin-top: 10px;
// `;

// const TaskInput = styled.input`
//   flex: 1;
//   font-size: 16px;
//   padding: 10px 20px;
//   border: 0;
//   box-shadow: 0 -1px 0 #e2e4ea inset;
//   color: #455963;
//   &::placeholder {
//     color: #a8b5bb;
//   }
//   &:focus {
//     box-shadow: 0 -1px 0 #bdcdd6 inset;
//   }
// `;

// const TaskButton = styled.button`
//   display: none;
// `;

// const TaskDelete = styled.button`
//   border: 0;
//   width: 18px;
//   height: 18px;
//   padding: 0;
//   overflow: hidden;
//   background-color: transparent;
//   background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23dc4771' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 174.239 174.239'%3e%3cpath d='M87.12 0C39.082 0 0 39.082 0 87.12s39.082 87.12 87.12 87.12 87.12-39.082 87.12-87.12S135.157 0 87.12 0zm0 159.305c-39.802 0-72.185-32.383-72.185-72.185S47.318 14.935 87.12 14.935s72.185 32.383 72.185 72.185-32.384 72.185-72.185 72.185z'/%3e%3cpath d='M120.83 53.414c-2.917-2.917-7.647-2.917-10.559 0L87.12 76.568 63.969 53.414c-2.917-2.917-7.642-2.917-10.559 0s-2.917 7.642 0 10.559l23.151 23.153-23.152 23.154a7.464 7.464 0 000 10.559 7.445 7.445 0 005.28 2.188 7.437 7.437 0 005.28-2.188L87.12 97.686l23.151 23.153a7.445 7.445 0 005.28 2.188 7.442 7.442 0 005.28-2.188 7.464 7.464 0 000-10.559L97.679 87.127l23.151-23.153a7.465 7.465 0 000-10.56z'/%3e%3c/svg%3e");
//   background-repeat: no-repeat;
//   background-size: cover;
//   cursor: pointer;
//   display: none;
// `;

// const TaskItem = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   padding: 12px 20px;
//   &:hover {
//     background-color: #f6fbff;
//   }
//   &.is-completed {
//     background-color: rgba(74, 206, 163, 0.1);
//   }
// `;

// const TaskStatus = styled.input`
//   appearance: none;
//   width: 18px;
//   height: 18px;
//   cursor: pointer;
//   border: 2px solid #bbbdc7;
//   border-radius: 50%;
//   background-color: #fff;
//   margin-right: 10px;
//   position: relative;
//   &:checked {
//     background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='405.272' height='405.272'%3e%3cpath d='M393.401 124.425L179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z' fill='%23fff'/%3e%3c/svg%3e");
//     background-size: 10px;
//     background-color: #4acea3;
//     border-color: #38bb90;
//     background-repeat: no-repeat;
//     background-position: center;
//   }
// `;

// const TaskName = styled.label`
//   margin-right: auto;
//   flex: 1;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   &.is-completed {
//     text-decoration: line-through wavy rgba(0, 0, 0, 0.3);
//   }
// `;

// const TaskEmpty = styled.div`
//   height: 120px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23f4f4f4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 486.463 486.463'%3e%3cpath d='M243.225 333.382c-13.6 0-25 11.4-25 25s11.4 25 25 25c13.1 0 25-11.4 24.4-24.4.6-14.3-10.7-25.6-24.4-25.6z'/%3e%3cpath d='M474.625 421.982c15.7-27.1 15.8-59.4.2-86.4l-156.6-271.2c-15.5-27.3-43.5-43.5-74.9-43.5s-59.4 16.3-74.9 43.4l-156.8 271.3c-15.6 27-15.5 59.3.2 86.4 15.7 27.1 43.7 43.5 74.9 43.5H399c31.4 0 59.5-16.3 75.1-43.6zM243.225 426.782c-35.4 0-64.2-29.7-64.2-64.2 0-35.4 29.7-64.2 64.2-64.2 35.4 0 64.2 29.7 64.2 64.2s-28.8 64.2-64.2 64.2z'/%3e%3c/svg%3e");
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: 80px;
//   border-radius: 10px;
//   color: #aab8c2;
//   text-align: center;
//   font-size: 16px;
// `;

// const TestPost = ({ title, data }) => {
//   // data가 undefined일 경우 빈 배열로 초기화
//   const [tasks, setTasks] = useState(data || []);

//   const addTask = () => {
//     const newTask = {
//       id: tasks.length + 1,
//       name: "새로운 작업",
//       completed: false,
//     };
//     setTasks([...tasks, newTask]);
//   };

//   const deleteTask = (id) => {
//     const updatedTasks = tasks.filter((task) => task.id !== id);
//     setTasks(updatedTasks);
//   };

//   const toggleStatus = (id) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//   };

//   const filterTasks = (filterType) => {
//     switch (filterType) {
//       case "모든 작업":
//         return tasks;
//       case "진행 중":
//         return tasks.filter((task) => !task.completed);
//       case "완료된 작업":
//         return tasks.filter((task) => task.completed);
//       default:
//         return tasks;
//     }
//   };

//   return (
//     <AppWrapper>
//       <TaskHeader>
//         <TaskHeaderTitle>{title}</TaskHeaderTitle>
//         <TaskForm onSubmit={(e) => e.preventDefault()}>
//           <TaskInput
//             type="text"
//             placeholder="새로운 작업 추가..."
//             onChange={() => {}}
//           />
//           <TaskButton onClick={addTask}>작업 추가</TaskButton>
//         </TaskForm>
//       </TaskHeader>

//       <TaskList>
//         {tasks.length === 0 ? (
//           <TaskEmpty>작업이 없습니다.</TaskEmpty>
//         ) : (
//           tasks.map((task) => (
//             <TaskItem
//               key={task.id}
//               className={task.completed ? "is-completed" : ""}
//             >
//               <TaskStatus
//                 type="checkbox"
//                 checked={task.completed}
//                 onChange={() => toggleStatus(task.id)}
//               />
//               <TaskName className={task.completed ? "is-completed" : ""}>
//                 {task.name}
//               </TaskName>
//               <TaskDelete onClick={() => deleteTask(task.id)} />
//             </TaskItem>
//           ))
//         )}
//       </TaskList>

//       <TaskTools>
//         <TaskCount>{tasks.length}개의 작업</TaskCount>
//         <div>
//           {["모든 작업", "진행 중", "완료된 작업"].map((filter) => (
//             <TaskFilter
//               key={filter}
//               className={filter === "모든 작업" ? "is-active" : ""}
//               onClick={() => filterTasks(filter)}
//             >
//               {filter}
//             </TaskFilter>
//           ))}
//         </div>
//       </TaskTools>
//     </AppWrapper>
//   );
// };

// export default TestPost;
