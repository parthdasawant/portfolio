import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  text-align: justify;

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: normal; // multipy
      // filter: grayscale(100%) contrast(1); //for normal profile pic
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Python',
    'RAG',
    'LLM',
    'Flutter',
    'Tensorflow',
    'GitHub',
    'Docker',
    'FastAPI',
    'LangChain',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I am Parth Dasawant, a Computer Engineering graduate (Class of 2023) with a
              Postgraduate Diploma in Artificial Intelligence (2024) deeply passionate about
              technology and innovation.
            </p>
            <p>
              My journey includes a valuable internship at {''}
              <a href="https://ril.com">Reliance</a>, where I honed my problem-solving skills and
              learned the importance of collaboration in the tech industry. Additionally, I secured
              sponsorship from {''}
              <a href="https://www.neurodynamic.ai/">Neurodynamics Research Labs</a> for my final
              year project, strengthening my commitment to cutting-edge research and development.
            </p>
            <p>
              Successfully developed and launched the {''}
              <a href="https://play.google.com/store/apps/details?id=parthdasawant.co.in.paper_trading">
                Paper Trading
              </a>{' '}
              app on the Google Play Store, which has garnered over 250K+ downloads. This project
              incorporated a robust CI/CD pipeline, ensuring seamless updates and maintenance.
              Through this experience, I have honed my skills in Flutter development and reinforced
              my commitment to delivering user-centric and high-performance applications.
            </p>
            <p>
              Over the past year, I've focused on Generative AI, Large Language Models (LLMs) and
              Retrieval-Augmented Generation (RAG) systems, notably developing {''}
              <a href="https://github.com/ChatDocDev/CDoc">CDoc: Chat with your Document</a>, a
              sophisticated RAG system for efficient multi-document querying using local LLMs and
              advanced frameworks like LangChain and FastAPI. I also share my expertise with the
              tech community through articles on {''}
              <a href="https://medium.com/@parthdasawant">Medium</a>.
            </p>
            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
