import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Image,
  Box,
} from "@chakra-ui/core";
import Fade from "react-reveal/Fade";

import { Wrapper } from "./elements";

const Images = ({ images }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [focused, setFocus] = React.useState(null);
  const wrapper = React.useRef(null);

  const openModal = (e) => {
    const id = e.target.id;
    const i = id.split("-").pop() * 1;
    setFocus(images[i]);
    onOpen();
  };

  return (
    <Wrapper ref={wrapper}>
      <Fade>
        {images.map((image, i) => (
          <img
            src={image}
            id={`image-k-${i}`}
            key={`image-k-${i}`}
            onClick={(e) => openModal(e)}
          />
        ))}
      </Fade>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='700px'>
          <ModalCloseButton />
          <ModalBody>
            <Image src={focused} width={"-webkit-fill-available"}></Image>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default Images;
