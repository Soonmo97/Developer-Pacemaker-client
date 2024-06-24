import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Container = styled.div`
  max-width: 68.5%;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #f4f4f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 90%;
    padding: 10px;
  }
`;

const FormContainer = styled.div`
  width: 50%;
  margin-top: 5%;

  max-height: 690px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ListContainer = styled.div`
  width: 45%;
  background-color: #fff;
  padding: 20px;
  margin-top: 5%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-height: 650px;
  overflow-y: auto;

  @media (max-width: 768px) {
    top: 5%;
    width: 90%;
    max-height: 500px;
  }
`;

const Title = styled.h1`
  color: #333;
`;

const Form = styled.div`
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #5cb85c;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #4cae4c;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const EditButton = styled(Button)`
  background-color: #337ab7;

  &:hover {
    background-color: #286090;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #d9534f;

  &:hover {
    background-color: #c9302c;
  }
`;
const BackButton = styled(Button)`
  background-color: #f0ad4e;

  &:hover {
    background-color: #ec971f;
  }
`;
const ReportItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }
`;

const CreateReportPage = () => {
  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportRseq, setReportRseq] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [reports, setReports] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editSeq, setEditSeq] = useState(null);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/report`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReports(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const saveReport = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (editMode) {
        await axios.patch(
          `${process.env.REACT_APP_API_SERVER}/api/report/${editSeq}`,
          {
            title: reportTitle,
            content: reportContent,
            total_duration: parseFloat(totalDuration),
            r_seq: reportRseq,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditMode(false);
        setEditSeq(null);
        alert("학습플랜이 성공적으로 수정되었습니다.");
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_SERVER}/api/report`,
          {
            title: reportTitle,
            content: reportContent,
            total_duration: parseFloat(totalDuration),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("학습플랜이 성공적으로 저장되었습니다.");
      }

      setReportTitle("");
      setReportContent("");
      setTotalDuration("");
      fetchReports();
    } catch (error) {}
  };

  const editReport = (report) => {
    setReportTitle(report.title);
    setReportContent(report.content);
    setTotalDuration(report.total_duration);

    setEditSeq(report.rseq);
    setEditMode(true);
  };

  const handleBack = () => {
    setReportTitle("");
    setReportContent("");
    setTotalDuration("");
    setEditMode(false);
    setEditSeq(null);
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(
      new Date(dateString)
    );
  };

  const deleteReport = async (rseq) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/report/delete/${rseq}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReports();
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <Container>
        <FormContainer>
          <Title>학습 플랜 게시판</Title>
          <Form>
            <Input
              type="text"
              placeholder="제목을 입력하세요"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
            />
            <Textarea
              placeholder="오늘의 학습 내용을 입력하세요"
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
            />
            {editMode ? (
              <>
                <Button onClick={saveReport}>수정</Button>
                <BackButton onClick={handleBack}>뒤로가기</BackButton>
              </>
            ) : (
              <Button onClick={saveReport}>저장</Button>
            )}
          </Form>
        </FormContainer>
        <ListContainer>
          <Title>학습플랜 목록</Title>
          {reports.map((report) => (
            <ReportItem key={report.rSeq}>
              <h3>{report.title}</h3>
              <p>{report.content}</p>
              <p>작성 시간: {formatDateTime(report.registered)}</p>
              <EditButton onClick={() => editReport(report)}>수정</EditButton>
              <DeleteButton onClick={() => deleteReport(report.rseq)}>
                삭제
              </DeleteButton>
            </ReportItem>
          ))}
        </ListContainer>
      </Container>
      <Footer />
    </>
  );
};

export default CreateReportPage;
