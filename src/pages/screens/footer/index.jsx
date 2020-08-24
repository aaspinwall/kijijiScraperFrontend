import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTwitter } from "react-icons/fa";
import { IoLogoChrome } from "react-icons/io";
import { Wrapper } from "./elements";
import { read } from "../../../Utilities/database";

const Footer = () => {
  const dispatch = useDispatch();
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
    <Wrapper>
      {" "}
      <div className='icons'>{socialIcons()}</div>
      <div>
        © 2020 Moving Day, Inc. All rights reserved | Alejandro Aspinwall
      </div>
      <div></div>
      <div onClick={fetchLatest}>Fetch</div>
    </Wrapper>
  );
};

export default Footer;
