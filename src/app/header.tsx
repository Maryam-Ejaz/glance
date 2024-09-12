"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faList, faListDots, faListSquares } from '@fortawesome/free-solid-svg-icons';

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  background: transparent;
  border-radius: 50px;
  color: var(--white);
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background 0.5s ease, padding 0.5s ease, backdrop-filter 0.5s ease, color 0.5s ease;
  @media only screen and (max-width: 64em) {
    padding: 0.5rem 3rem;
  }
  @media only screen and (max-width: 40em) {
    padding: 0.5rem 1.5rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  width: auto;
  height: auto;
  cursor: pointer;
  z-index: 1000;
  padding-left: 3rem;
  img {
    width: 4rem;
    height: auto;
    margin-right: 0.5rem;
    border-radius: 50%;
  }
  h3 {
    color: inherit; 
    margin-right: 10px;
    font-weight: 700;
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 10px; // Align button to the right

  &:focus {
    outline: none;
  }
`;

const Header = ({ onToggle }: { onToggle: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTableView, setIsTableView] = useState(true); // Default to table view

  const handleToggle = () => {
    setIsTableView(!isTableView);
    onToggle();
  };

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    // Set up ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top top+=1",
      end: "+=200",
      onUpdate: (self) => {
        if (self.progress > 0.1) {
          element.style.background = "rgba(255, 255, 255, 0.1)";
          element.style.backdropFilter = "blur(10px)";
          element.style.padding = "0.5rem 2rem";
          element.style.color = "var(--white)";
        } else {
          element.style.background = "transparent";
          element.style.backdropFilter = "none";
          element.style.padding = "1rem 5rem";
          element.style.color = "var(--white)";
        }

      },
    });

    // Handle media query for different screen sizes
    const mq = window.matchMedia("(max-width: 40em)");

    if (mq.matches) {
      gsap.to(element, {
        position: "fixed",
        top: "1rem",
        left: "0",
        right: "0",
        padding: "0.5rem 2.5rem",
        borderRadius: "50px",
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: "bottom+=200 top",
          end: "+=100",
          scrub: true,
        },
      });
    } else {
      gsap.to(element, {
        position: "fixed",
        top: "1rem",
        left: "3rem",
        right: "3rem",
        padding: "0.5rem 2rem",
        borderRadius: "50px",
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: "bottom+=300 top",
          end: "+=250",
          scrub: true,
        },
      });
    }

    // Cleanup function
    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <Headers ref={ref} style={{ color: 'white' }}>
      <Logo href="/" style={{ color: 'white' }}>
        <h3>GLANCE</h3>
      </Logo>
      <ToggleButton onClick={handleToggle}>
        <FontAwesomeIcon icon={isTableView ? faTable : faList} />
      </ToggleButton>
    </Headers>
  );
};

export default Header;
