import styled, { keyframes } from 'styled-components';
import { breakpoints } from './Media';
import LandingImage from '../../assets/img/bg1.jpg';

export const QUERIES = {
    medium: `min-width: 1092px`,
    small: `min-width: 552px`,
    maxWidth: `1500px`
};

export const Float = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const HeadingMain = styled.h1`
    font-weight: 700;
    font-size: 7vw;
    line-height: 129.69%;
    letter-spacing: 0.03em;
    margin-bottom: 0;
    margin-left: 0px;

    @media (min-width: ${breakpoints.mobileMax}) {
        font-size: 60px;
        margin-bottom: 0;
        margin-left: 50px;
    }

    .blue {
        color: #b4e0e8;
    }

    > span {
        display: inline-block;
        transform: translateY(30px);
        opacity: 0;
        animation: ${Float} 1s 0.2s forwards;
    }

    > span:nth-child(1) {
        animation-delay: 0s;
    }

    > span:nth-child(2) {
        animation-delay: 0.2s;
    }
    > span:nth-child(3) {
        animation-delay: 0.4s;
    }
`;



const HeadingImage = styled.div`
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    width: 100%;
    border-radius: 4px;
    height: 300px;
    background-size: cover;
    background-image: url(${LandingImage});
    background-color: #f5f5f5;
    background-position: center;
    transform: translateY(30px);
    opacity: 0;
    animation: ${Float} 1s 0.6s forwards;

    @media (min-width: ${breakpoints.mobileMax}) {
        width: 100%;
        height: 400px;
        background-position-x: right;
        background-position-y: center;
    }
`;

export default HeadingImage;

export const HeadingSec = styled(HeadingMain)`
    font-size: 33px;

    @media (min-width: ${breakpoints.mobileMax}) {
        font-size: 40px;
    }
`;

export const Container = styled.div`
  margin: 100px 0 200px 0;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: ${breakpoints.mobileMax}) {
    flex-wrap: nowrap;
  }
`;

export const HeadingBox = styled.div`
  width: 100%;
  text-align: center;
`;



export const SkillTable = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 20px 0 0 0;
  @media (min-width: ${breakpoints.mobileMax}) {
    flex-wrap: nowrap;
  }

  b {
    color: blue;
    font-weight: 900;
    font-size: 20px;
  }

  p {
    color: black;
    font-weight: 700;
    min-width: 200px;
    margin: 20px 0 0 0;

    @media (min-width: ${breakpoints.mobileMax}) {
      min-width: unset;
      margin: 30px 0;
    }

    span {
      font-size: 20px;
      margin-right: 5px;
      color: #b4e1e7;
    }
  }
`;

export const SkillContent = styled.div`
  width: 100%;
`;

export const TagContainer = styled.div`
 padding: 5px 10px;
 background: darkgray;
 font-weight: bolder;
 border-radius: 30px;
 color: white;
 display: flex;
 width: fit-content;
 margin: 5px;
`;

export const Tag = styled.a`
 color: white;
 display: flex;
 width: fit-content;
 padding-right: 5px;
`;
