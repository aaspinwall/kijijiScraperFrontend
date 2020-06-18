import React from "react";
import styled from "styled-components";
import { colors } from "../Styles/Components";
import { FaTwitter } from "react-icons/fa";
import { IoLogoChrome } from "react-icons/io";

export default function Footer() {
  const socialIcons = () => {
    const social = {
      twitter: { icon: <FaTwitter />, link: `https://twitter.com/aaspinwall` },
      web: { icon: <IoLogoChrome />, link: `https://alejandroaspinwall.ca` },
    };
    const icons = Object.keys(social).map((key) => {
      const element = social[key];
      return (
        <a target='_blank' href={element.link} key={`icons_${key}`}>
          {element.icon}
        </a>
      );
    });
    return icons;
  };

  return (
    <Container>
      <div className='icons'>{socialIcons()}</div>
      <div>© 2020 Moving Day, Inc. All rights reserved</div>
      <div>Alejandro Aspinwall</div>
    </Container>
  );
}

const Container = styled.footer`
  font-size: 1rem;
  color: white;
  background: grey;
  padding: 2rem;
  text-align: center;
  > div {
    padding: 0.25rem 0;
  }

  .icons {
    a,
    :visited,
    :active {
      color: white;
      font-size: 1.5rem;
      padding: 0 0.5rem;
    }
  }
`;
