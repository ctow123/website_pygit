import React from "react";
// for SEO
import { Helmet } from 'react-helmet';
import Layout from "../components/Body/Layout";
import styled from "styled-components";
import { breakpoints } from "../components/Body/Media.js";
import {
  Heading,
  Paragraph,
  TextContent,
  CenterText
} from "../components/Body/textStyles.js";
import { withStyles } from "@material-ui/core/styles";
import {styles} from './styling.js';
import decore1 from "../assets/img/fields_graphchart.jpeg";
import decore2 from "../assets/img/project.jpeg";
import decore3 from "../assets/img/jarvis2.png";
import decoreStack from "../assets/img/webstacksm.png";

import Navgo from "./navbar.js";


const Container = styled.div`
  margin: 50px 0;
  width: 100%;
  height: auto;
  align-items: center;

  h1 {
    font-size: 30px;
  }

  @media (min-width: ${breakpoints.mobileMax}) {
    margin: 100px 0;
  }
`;

const ProjectTable = styled.table`
  width: 100%;
  text-align: left;

  th {
    font-style: normal;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 129.69%;
    letter-spacing: 0.03em;
    padding-bottom: 20px;
  }

  td {
    width: 100px;
    font-size: 14px;
    line-height: 184.69%;
    letter-spacing: 0.03em;
  }
`;

const Bold = styled.td`
  a {
    font-size: 16px;
    line-height: 184.69%;
    letter-spacing: 0.03em;
    font-weight: 900;
    color: #dd7834;
    border-bottom: 2px solid transparent;
    transition: 0.3s;
    padding-bottom: 3px;

    :hover {
      border-bottom: 2px solid #dd7834;
    }
  }
`;

const Image = styled.img`
  margin: 50px 0 20px 0;
  width: 105%;
  transform: translatex(-2.5%);
  height: auto;
  border-radius: 4px;

  @media (min-width: ${breakpoints.mobileMax}) {
    height: auto;
    margin: 50px 0 50px 0;
  }
`;

const WebStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0;

  @media (min-width: ${breakpoints.mobileMax}) {
    flex-wrap: nowrap;
    align-items: center;
    margin: 100px 0;
  }
`;
const LeftContent = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${decoreStack});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  @media (min-width: ${breakpoints.mobileMax}) {
    width: 55%;
  }
`;
const RightContent = styled.div`
  width: 100%;

  @media (min-width: ${breakpoints.mobileMax}) {
    width: 45%;
  }
`;


const Decore = ({ classes, ...props }) => {

  return (
    <>
<Helmet>
  <title>Connor Towler - Networked Notes</title>
  <meta name="Connor Towler" content="portfolio" />
  <meta name="description" content="web app" />
  <meta name="keywords" content="Notes, Javascript, portfolio" />
  <meta name="author" content="Connor Towler" />
  <html lang="en" />
</Helmet>

     <div className={classes.root} style={{ backgroundColor: "white" }}>
      <Navgo />
      <Layout>
        <Container>
          <TextContent>
            <Heading>Networked Notes</Heading>
            <Paragraph>
              <a
                style={{
                  color: "#DD7834",
                  fontWeight: "900"
                }}
                href="/aboutme"
              >
                Connor
              </a>{" "}
              In the Information Age, the most successful people are the ones
              who can organize information. Students take hundreds of pages of
              notes, only to get thrown away. Note taking should be a system and
              that system shouldn’t be so linear, it should model how your brain
              works. There is a lot of ‘cognitive friction’ associated with the
              hierarchical structure in which we store information now Notes
              should be refreshers than you use.
            </Paragraph>
            <ProjectTable>
              <tbody>
                <tr>
                  <th>Type</th>
                  <th>Stack</th>
                  <th>Code</th>
                  <th>Live</th>
                </tr>
                <tr>
                  <td>Personal Project</td>
                  <td>React & MaterialUI</td>

                  <Bold>
                    <a href="https://github.com/ctow123">Repository</a>
                  </Bold>
                  <Bold>
                    <a href="/notes">View Web app</a>
                  </Bold>
                </tr>
                <tr>
                  <td></td>
                  <td>Django & Node.js, Redis, Express</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Neo4J & MongoDB</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Nginx, Docker, Supervisor, NPM</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </ProjectTable>
          </TextContent>
          <Image src={decore1} alt="Forecast Application Work in Progress" />
          <TextContent>
            <Heading>Project Purpose and Goal</Heading>
            <Paragraph>
              We built this project because we know how tedious and repetitive
              starting a new project from scratch can be, and we wanted to build
              something that we would also use ourselves. <br />
              <br />
              We had a timeframe of a little over a month to build out this
              project, and our goal was to have the application fully
              functioning by the end of that timeframe.
            </Paragraph>
            <Heading>Soon...</Heading>
            <Paragraph>
              We built this project because we know how tedious and repetitive
              starting a new project from scratch can be, and we wanted to build
              something that we would also use ourselves.
            </Paragraph>
          </TextContent>
          <WebStack>
            <LeftContent></LeftContent>
            <RightContent>
              <Heading>Web Stack and Explanation</Heading>
              <Paragraph>
                React was an easy choice, because of its ease
                of state management (Redux, useEffect, useState), the amount of packages available, popularity in the community (support). I utilized a mix
                of backend servers because of database needs. Neo4J worked really well with Node.js where not with Django. However, the website pre web app
                was written in Django (some technical debt to work through)
              </Paragraph>
              <Paragraph>
                DevOps was another process. I used Nginx, Docker, & Supervisor on a GCP instance to auto-restart failed processes,
                handle loading balancing, and my microservice architecture. My lack of planning and hosting the website and web app logic on seperate
                Node and Django servers actually helped reduce coupling
              </Paragraph>
            </RightContent>
          </WebStack>
          <Image
            src={decore2}
            alt="Forecast image with differing weather information"
          />
          <CenterText>
            <Heading>Problems and Thought Process</Heading>
            <Paragraph>
              Processing the necessary code into the editor was the most complex
              part of this process, we needed to update the object listing of
              the elements everytime a user added, removed, or reordered any
              element. This required complex state management in order to
              display the proper html and css when exporting.
            </Paragraph>
          </CenterText>
          <Image
            src={decore3}
            alt="Forecast image with differing weather information"
            style={{maxHeight: '400px', maxWidth: '800px', display: 'block', margin: 'auto'}}
          />
          <CenterText>
            <Heading>Lessons Learned</Heading>
            <Paragraph>
              This project helped to solidify a lot my React knowledge, such as
              using hooks or updating the states. I also got a lot of great
              practice using ES6+ syntax across the entirety of the project.
              This was a large code base to manage across a team, and we all got
              some more great experience with version control and reviewing each
              others code.
            </Paragraph>
          </CenterText>
        </Container>
      </Layout>
      </div>
    </>
  );
}

export default withStyles(styles)(Decore);
