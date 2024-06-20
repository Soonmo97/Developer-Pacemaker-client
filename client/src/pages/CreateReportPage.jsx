import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Container = styled.div`
  max-width: 69%;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #f4f4f9;
  /* border-radius: 10px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  width: 45%;
`;

const ListContainer = styled.div`
  width: 45%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  const [totalDuration, setTotalDuration] = useState("");
  const [reports, setReports] = useState([]);

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
    } catch (error) {
      console.error("보고서를 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const saveReport = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      console.log(totalDuration);
      await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/report`,
        {
          title: reportTitle,
          content: reportContent,
          total_duration: parseFloat(totalDuration), // totalDuration을 float 값으로 변환
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReportTitle("");
      setReportContent("");
      setTotalDuration("");
      alert("보고서가 성공적으로 저장되었습니다.");
      fetchReports(); // 목록 갱신
    } catch (error) {
      console.error("보고서를 저장하는 데 실패했습니다.", error);
    }
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
            <Input
              type="number"
              step="0.1"
              placeholder="총 학습 시간을 입력하세요 (시간 단위)"
              value={totalDuration}
              onChange={(e) => setTotalDuration(e.target.value)}
            />
            <Button onClick={saveReport}>저장</Button>
          </Form>
        </FormContainer>
        <ListContainer>
          <Title>보고서 목록</Title>
          {reports.map((report) => (
            <ReportItem key={report.rSeq}>
              <h3>{report.title}</h3>
              <p>{report.content}</p>
              <p>총 학습 시간: {report.total_duration}시간</p>
            </ReportItem>
          ))}
        </ListContainer>
      </Container>
      <Footer />
    </>
  );
};

export default CreateReportPage;
