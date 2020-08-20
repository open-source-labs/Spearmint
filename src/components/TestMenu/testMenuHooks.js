import { useState } from 'react';

function useToggleModal(test) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(test);

  const openModal = () => {
    setTitle('New Test');
    setIsModalOpen(true);
  };

  const openScriptModal = () => {
    setTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle(test);
  };

  return { title, isModalOpen, openModal, openScriptModal, closeModal };
}

export default useToggleModal;
