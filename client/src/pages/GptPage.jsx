import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const GptPageContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ChatDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AskDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChatContainer = styled.div`
  width: 472px;
  max-width: 50%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ChatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  max-height: 500px;
  overflow-y: auto;
  background-color: rgb(235, 235, 235);
`;

const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isUser ? "#e1ffc7" : "#c7d7ff")};
  color: #000;
  margin-bottom: 5px;
`;

const ChatInput = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const ChatInputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

const ChatInputButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SaveButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 10px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SavedAnswersContainer = styled.div`
  width: 438px;
  min-height: 572px;
  max-width: 50%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  max-height: 550px;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SavedAnswer = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #e1e1e1;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
`;

const DeleteButton = styled.button`
  margin-left: 3%;
  margin-top: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff6b6b;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ff4f4f;
  }
`;
const GptPage = () => {
  const [gptList, setGptList] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [savedAnswers, setSavedAnswers] = useState([]);
  const [savedError, setSavedError] = useState(null);
  const [clickedButtons, setClickedButtons] = useState([]);

  useEffect(() => {
    fetchGptList();
    fetchSavedAnswers(); // 추가: 저장된 답변 불러오기
  }, []);

  const fetchGptList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/gpt`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGptList(response.data);
    } catch (error) {
      console.error("GPT 목록을 불러오는 중 오류 발생:", error);
      setError("GPT 목록을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const fetchSavedAnswers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/gpt`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data); //get 요청하는 부분에서 g_seq 보내줘야함(화영님)
      setSavedAnswers(response.data);
      setSavedError(null); // 성공적으로 데이터를 받았을 때 오류 상태 초기화
    } catch (error) {
      console.error("저장된 답변을 불러오는 중 오류 발생:", error);
      setSavedAnswers([]); // 오류 발생 시 빈 배열로 초기화
      setSavedError("저장된 답변을 불러오는 중 오류가 발생했습니다1.");
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSave = async (question, answer, index) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/gpt`,
        { question, answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the clickedButtons state to include the index of the clicked button
      setClickedButtons((prevClicked) => [...prevClicked, index]);

      // Fetch saved answers again to update the list
      fetchSavedAnswers();
    } catch (error) {
      console.error("답변 저장 중 오류 발생:", error);
      setSavedError("답변 저장 중 오류가 발생했습니다.");
    }
  };

  const handleAsk = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/gpt/ask`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const answerData = response.data;

      // Save both question and answer to backend
      // await axios.post(
      //   `${process.env.REACT_APP_API_SERVER}/api/gpt`,
      //   { question: prompt, answer: answerData },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //     },
      //   }
      // );

      // Update frontend list
      setGptList((prevList) => [
        ...prevList,
        { question: prompt, answer: answerData },
      ]);
      setPrompt("");
    } catch (error) {
      console.error("GPT에 질문하는 중 오류 발생:", error);
      setError("GPT에 질문하는 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (gseq) => {
    try {
      const token = localStorage.getItem("accessToken");

      console.log(token, gseq);
      await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/gpt/${gseq}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // 삭제 후에는 업데이트된 저장된 답변 목록을 다시 불러옵니다.
      fetchSavedAnswers();
    } catch (error) {
      console.error("답변 삭제 중 오류 발생:", error);
      // 삭제 실패 시 오류 처리
      setSavedError("답변 삭제 중 오류가 발생했습니다.");
    }
  }; //delete mapping으로 변경해라

  return (
    <>
      <Navbar />
      <GptPageContainer>
        <h1>GPT 채팅</h1>
        <ChatDiv>
          <ChatContainer>
            <ChatBox>
              {gptList.map((gpt, index) => (
                <React.Fragment key={index}>
                  <ChatMessage isUser={true}>
                    <MessageBubble isUser={true}>{gpt.question}</MessageBubble>
                  </ChatMessage>
                  <ChatMessage isUser={false}>
                    <AskDiv>
                      <MessageBubble isUser={false}>{gpt.answer}</MessageBubble>
                      {!clickedButtons.includes(index) && (
                        <SaveButton
                          onClick={() =>
                            handleSave(gpt.question, gpt.answer, index)
                          }
                        >
                          답변저장
                        </SaveButton>
                      )}
                    </AskDiv>
                  </ChatMessage>
                </React.Fragment>
              ))}

              {answer && prompt === "" && (
                <React.Fragment>
                  {/* <ChatMessage isUser={true}>
                  <MessageBubble isUser={true}>{prompt}</MessageBubble>
                </ChatMessage> */}
                  {/* <ChatMessage isUser={false}>
                  <MessageBubble isUser={false}>{answer}</MessageBubble>
                </ChatMessage> */}
                </React.Fragment>
              )}
            </ChatBox>
            <ChatInput>
              <ChatInputField
                type="text"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="질문을 입력하세요..."
              />
              <ChatInputButton onClick={handleAsk}>질문하기</ChatInputButton>
            </ChatInput>
          </ChatContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SavedAnswersContainer>
            <h2>저장된 답변</h2>
            {savedAnswers.map((savedAnswer, index) => (
              <SavedAnswer key={index}>
                <strong>질문:</strong> {savedAnswer.question}
                <br />
                <strong>답변:</strong> {savedAnswer.answer}
                <DeleteButton onClick={() => handleDelete(savedAnswer.gseq)}>
                  삭제
                </DeleteButton>
              </SavedAnswer>
            ))}
            {savedError && <ErrorMessage>{savedError}</ErrorMessage>}
          </SavedAnswersContainer>
        </ChatDiv>
      </GptPageContainer>
      <Footer />
    </>
  );
};

export default GptPage;
