import styled from 'styled-components/macro';
import { breakpoints } from './Media';
import { Float } from './styles';

export const TextContent = styled.div`
  max-width: 700px;
  .Paragraph {
    a {
      border-bottom: 2px solid transparent;
      transition: 0.3s;

      :hover {
        border-bottom: 2px solid black;
      }
    }
  }
`;

export const Heading = styled.h1`
    width: 100%;
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 129.69%;
    letter-spacing: 0.03em;
    transform: translateY(30px);
    opacity: 0;
    animation: ${Float} 1s 0.2s forwards;

    @media (min-width: ${breakpoints.mobileMax}) {
        font-size: 40px;
        transform: scale(1);
    }

    > span {
        color: #b4e0e8;
    }
`;

export const Paragraph = styled.p`
    margin: 50px 0;
    color: #696969;
    width: 100%;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 184.69%;
    letter-spacing: 0.03em;

    a {
        border-bottom: 2px solid transparent;
        transition: 0.3s;

        :hover {
            border-bottom: 2px solid black;
        }
    }
`;
