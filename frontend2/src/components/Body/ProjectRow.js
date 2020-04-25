import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from './Media';
import {Heading ,Paragraph} from './textStyles';

import CoffeeThumb from '../../assets/img/bg1.jpg';
import decore from '../../assets/img/bg1.jpg';

const ProjectContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 0px;
    flex-wrap: wrap;
    margin-top: 0px;
    height: unset;
    @media (min-width: ${breakpoints.mobileMax}) {
        flex-wrap: nowrap;
        margin-bottom: 70px;
        margin-top: 40px;
        height: 500px;
    }
`;

const ProjectLink = styled(Paragraph)`
    font-weight: 700;
    font-size: 14px;
    line-height: 163.19%;
    display: inline;
    color: black;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    border-bottom: 2px solid transparent;
    transition: border-bottom 0.3s;

    :hover {
        border-bottom: 2px solid black;
    }

    span {
        font-size: 20px;
    }
`;

const ProjectImage = styled.div`
    width: 100%;
    height: 300px;
    border-radius: 4px;
    transition-duration: 0.3s;
`;

const Project = styled.div`
    width: 100%;
    height: auto;
    margin-bottom: 90px;
    transition-duration: 0.3s;

    :hover {
        ${ProjectImage} {
            transform: scale(1.03);
        }

        ${ProjectLink} {
            border-bottom: 2px solid black;
        }
    }

    :nth-child(1) {
        margin-right: 0;

        @media (min-width: ${breakpoints.mobileMax}) {
            margin-right: 10%;
        }
    }

    @media (min-width: ${breakpoints.mobileMax}) {
        width: 45%;
        margin-bottom: 0px;
    }

    :nth-child(1) {
        ${ProjectImage} {
            background-image: url(${decore});
            background-size: cover;
            background-position-x: center;
            background-position-y: center;
        }
    }

    :nth-child(2) {
        ${ProjectImage} {
            background-image: url(${CoffeeThumb});
            background-size: cover;
            background-position-x: center;
            background-position-y: center;
        }
    }
`;

const SubHeading = styled(Heading)`
    font-size: 30px;
    margin-bottom: 0;
    margin-top: 30px;
`;

const ProjectParagraph = styled(Paragraph)`
    margin-top: 10px;
    max-width: unset;
    margin-bottom: 20px;

    @media (min-width: ${breakpoints.mobileMax}) {
        max-width: 70%;
    }
`;


const SkillContent = styled.div`
    width: 100%;
`;

function ProjectRow() {
    return (
        <ProjectContainer>
            <Project>
                <Link title='Decore' to='/notes'>
                    <ProjectImage />
                </Link>
                <Link title='Decore' to='/notes'>
                    <SubHeading>Notes</SubHeading>
                </Link>
                <ProjectParagraph>
                    A tool design to help VCs and notetakers connect and review
                    their ideas
                </ProjectParagraph>
                <Link title='Decore' to='/notes'>
                    <ProjectLink>
                        View Project <span>&#8250;</span>
                    </ProjectLink>
                </Link>
            </Project>
            <Project>
                <Link title='Coffee Project' to='/Coffee'>
                    <ProjectImage />
                </Link>
                <Link title='Coffee Project' to='/Coffee'>
                    <SubHeading>Yelp Plus</SubHeading>
                </Link>
                <ProjectParagraph>
                    An e-commerce application built with React & Shopify
                    Giving you THE place to eat
                </ProjectParagraph>

                <Link title='Coffee Project' to='/Coffee'>
                    <ProjectLink>
                        View Project <span>&#8250;</span>
                    </ProjectLink>
                </Link>
            </Project>
        </ProjectContainer>
    );
}

export default ProjectRow;