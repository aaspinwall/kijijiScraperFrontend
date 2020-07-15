import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { colors } from "../Styles/Components";
import { useSelector, useDispatch } from "react-redux";
import { FaTwitter } from "react-icons/fa";
import { IoLogoChrome } from "react-icons/io";
import { read } from "../Utilities/database";

export default function Footer() {
  const footerRef = useRef(null);
  const dispatch = useDispatch();
  const { windowInfo } = useSelector((state) => state);
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

  useEffect(() => {
    const height = footerRef.current.clientHeight;
    dispatch({
      type: "windowInfo",
      payload: { id: "footerHeight", value: height },
    });
  }, [footerRef]);

  const fetchLatest = async () => {
    dispatch({ type: "lifeCycle", payload: "loading" });
    const res = await read(`/users/public/latest/results`, (results) =>
      dispatch({ type: "results", payload: results })
    );
    if (res) {
      dispatch({ type: "lifeCycle", payload: "static" });
    } else {
      dispatch({ type: "lifeCycle", payload: "error" });
    }
  };

  return (
    <Container ref={footerRef}>
      <div className='icons'>{socialIcons()}</div>
      <div>© 2020 Moving Day, Inc. All rights reserved</div>
      <div>Alejandro Aspinwall</div>
      <div onClick={fetchLatest}>Fetch</div>
    </Container>
  );
}

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 1rem;
  color: white;
  background: grey;
  padding: 2rem;
  text-align: center;
  box-sizing: border-box;
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
