import styled from 'styled-components';
import GroupTodoList from './groupTodolist/GroupTodoList';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  height: 50%;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5rem;
`;

const TodoListSection = styled.div`
  flex: 1;
  padding: 10px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 10px 0;
  color: red;
`;

const StudyGroupPlannerModal = ({ onClose, children, date }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{children}</ModalTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ModalBody style={{ width: '100%' }}>
            <TodoListSection style={{ border: '1px solid black' }}>
              <SectionTitle
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                TodoList
              </SectionTitle>
              <GroupTodoList date={date}></GroupTodoList>
            </TodoListSection>
          </ModalBody>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StudyGroupPlannerModal;
