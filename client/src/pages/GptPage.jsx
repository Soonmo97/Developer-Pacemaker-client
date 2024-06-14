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
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

const ChatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  max-height: 500px;
  overflow-y: auto;
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

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
`;

const GptPage = () => {
  const [gptList, setGptList] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGptList();
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
      console.error("Error fetching GPT list:", error);
      setError("GPT 목록을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleAsk = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/gpt/ask`,
        {
          params: { prompt },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setAnswer(response.data);
      setGptList((prevList) => [
        ...prevList,
        { question: prompt, answer: response.data },
      ]);
      setPrompt("");
    } catch (error) {
      console.error("Error asking GPT:", error);
      setError("GPT에 질문하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Navbar />
      <GptPageContainer>
        <h1>GPT 채팅</h1>
        <ChatContainer>
          <ChatBox>
            {gptList.map((gpt, index) => (
              <React.Fragment key={index}>
                <ChatMessage isUser={true}>
                  <MessageBubble isUser={true}>{gpt.question}</MessageBubble>
                </ChatMessage>
                <ChatMessage isUser={false}>
                  <MessageBubble isUser={false}>{gpt.answer}</MessageBubble>
                </ChatMessage>
              </React.Fragment>
            ))}
            {answer && (
              <React.Fragment>
                <ChatMessage isUser={true}>
                  <MessageBubble isUser={true}>{prompt}</MessageBubble>
                </ChatMessage>
                <ChatMessage isUser={false}>
                  <MessageBubble isUser={false}>{answer}</MessageBubble>
                </ChatMessage>
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
      </GptPageContainer>
      <Footer />
    </>
  );
};

export default GptPage;
