import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PlannerModal from "./PlannerModal";

const CalendarBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCalendarWrapper = styled.div`
  font-weight: 800;
  width: 50%;
  height: auto;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: white;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  /* 기타 스타일 생략 */
`;

const StyledCalendarComponent = styled(Calendar)``;

const StyledDate = styled.div`
  position: absolute;
  right: 7%;
  top: 6%;
  background-color: ${(props) => props.theme.primary_3};
  color: ${(props) => props.theme.yellow_2};
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 800;
`;

const StyledToday = styled.div`
  font-size: x-small;
  color: ${(props) => props.theme.br_2};
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

const UserCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(today);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [todos, setTodos] = useState([]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };

  const handlePlannerSave = (newTodos) => {
    // 여기서 newTodos를 처리하면 됩니다. 예를 들어 API 호출 등의 작업을 수행할 수 있습니다.
    setModalOpen(false); // 모달을 닫습니다.
    setTodos(newTodos); // 필요하다면 state에 저장할 수 있습니다.
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>내 학습일지</h2>
      </div>
      <CalendarBody>
        <StyledCalendarWrapper>
          <StyledCalendarComponent
            onClickDay={handleDateClick}
            value={date}
            onChange={handleDateChange}
            formatDay={(locale, date) => moment(date).format("D")}
            formatYear={(locale, date) => moment(date).format("YYYY")}
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
            calendarType="gregory"
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate)
            }
            tileContent={({ date, view }) => {
              let html = [];
              if (
                view === "month" &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate()
              ) {
                html.push(<StyledToday key={"today"}>오늘</StyledToday>);
              }

              return <>{html}</>;
            }}
          />
          <StyledDate onClick={handleTodayClick}>오늘</StyledDate>
        </StyledCalendarWrapper>
      </CalendarBody>
      <button onClick={() => setModalOpen(true)}>플래너 글쓰기</button>
      {modalOpen && (
        <PlannerModal onClose={handleModalClose} onSave={handlePlannerSave} />
      )}
    </div>
  );
};

export default UserCalendar;
