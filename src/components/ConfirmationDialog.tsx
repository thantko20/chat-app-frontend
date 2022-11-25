import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { cloneElement, ReactElement } from 'react';

type ConfirmationDialogProps = {
  triggerButton: ReactElement;
  confirmButton: ReactElement;
  title?: string;
  body?: string;
};

const ConfirmationDialog = ({
  triggerButton,
  title,
  body,
  confirmButton,
}: ConfirmationDialogProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const trigger = cloneElement(triggerButton, {
    onClick: onOpen,
  });

  return (
    <>
      {trigger}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={4}>
              Close
            </Button>
            {confirmButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmationDialog;
