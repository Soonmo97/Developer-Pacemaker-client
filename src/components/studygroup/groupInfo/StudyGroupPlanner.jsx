import React, { useEffect, useState } from "react";
import moment from "moment";

import styled from "styled-components";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import StudyGroupPlannerModal from "./StudyGroupPlannerModal";
import axios from "axios";

const CalendarBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCalendarWrapper = styled.div`
  font-weight: 800;
  width: 80%;
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

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.gray_1};
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: #eacea8;
    color: ${(props) => props.theme.darkBlack};
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: ${(props) => props.theme.red_1};
  }

  /* 토요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: ${(props) => props.theme.blue_1};
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: ${(props) => props.theme.primary_2};
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: ${(props) => props.theme.gray_5};
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: ${(props) => props.theme.primary_2};
    abbr {
      color: #f4efe9;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 0.1rem 0rem 1rem;
    position: relative;

    @media (max-width: 480px) {
      padding: 0.05rem 0rem 0.7rem;
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.gray_1};
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.yellow_2};
    border-radius: 0.3rem;
  }

  /* 초록색 배경색 추가 */
  .react-calendar__tile--completed1 {
    background-color: lightgreen;
  }

  /* 진한 초록색 배경색 추가 */
  .react-calendar__tile--completed3 {
    background-color: darkgreen;
  }
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

const StudyGroupPlanner = ({ sgSeq, uSeq, member }) => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(today);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [response, setResponse] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [gpSeq, setGpSeq] = useState(null);
  const [grassData, setGrassData] = useState({});

  const handleDateClick = async (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setFormattedDate(formattedDate);

    try {
      // 그룹원 플래너 조회
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/group-planner?date=${formattedDate}`,
        { sgSeq: sgSeq, uSeq: member.useq },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("그룹원 플래너 조회", sgSeq, member.useq);
      const data = response.data;
      console.log("!!", data);
      const key = Object.keys(data)[0]; // 첫 번째 키를 추출
      const dataArray = Object.values(data).flat();

      console.log("그룹원 플래너 조회data==========", data);
      console.log("그룹원 플래너 조회key==========", key);
      console.log("그룹원 플래너 조회==========", dataArray);
      setGpSeq(key);
      setResponse(dataArray);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    window.location.reload();
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };

  const getCompletedCount = (date) => {
    return grassData[date] || 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const formattedDate = moment(activeStartDate).format("YYYY-MM");
        const response = await axios.post(
          `${process.env.REACT_APP_API_SERVER}/api/group-planner/grass`,
          {
            sgSeq: sgSeq,
            uSeq: uSeq,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              yearMonthStr: formattedDate,
            },
          }
        );

        console.log("=== grass ===", response.data);
        setGrassData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [activeStartDate]);

  return (
    <div>
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
              const formattedDate = moment(date).format("YYYY-MM-DD");
              const completedCount = getCompletedCount(formattedDate);

              let className = "";
              if (view === "month" && completedCount > 0) {
                className =
                  completedCount >= 3
                    ? "react-calendar__tile--completed3"
                    : "react-calendar__tile--completed1";
              }

              let html = [];
              if (
                view === "month" &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate()
              ) {
                html.push(<StyledToday key={"today"}>오늘</StyledToday>);
              }

              return (
                <>
                  <div className={`react-calendar__tile ${className}`}></div>
                  {html}
                </>
              );
            }}
          />
          <StyledDate onClick={handleTodayClick}>오늘</StyledDate>
        </StyledCalendarWrapper>
      </CalendarBody>
      {modalOpen && (
        <StudyGroupPlannerModal
          onClose={handleModalClose}
          formattedDate={formattedDate}
          response={response}
          sgSeq={sgSeq}
          initialGpSeq={gpSeq}
        >
          <div>{moment(selectedDate).format("YYYY년 MM월 DD일")}</div>
        </StudyGroupPlannerModal>
      )}
    </div>
  );
};

export default StudyGroupPlanner;