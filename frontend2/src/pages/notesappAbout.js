import React from "react";
// for SEO
import { Helmet } from "react-helmet";
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
import { styles } from "./styling.js";
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
        <title>Algo X</title>
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
              <Heading>Your Digital Garden</Heading>
              <Paragraph>
                Build, Explore, Colloborate, Decentralized
                <br/>
                Everyone has their digital identity scattered around the web through various tweets, blog posts,
                youtube interviews, podcasts, notes, and more. This is a directory of various people that allows them
                to link their scattered identity together. You can explore their mind through topics organized in a networked system.
                Your brain doesn't work in a hierarchical fashion and searching that way introduces lots of cognitive friction.
                From there you can 'fork' their ideas expand on them or take a note of a thought it provoked.
                This links a persons accounts, but utimately they own their information and followers. We do make a copy of the
                data but it is not stored exclusively on this site. The hope of this decentralization is you will never be 'cancelled'
                or beholden to an arbitrary gatekeeper. Heretics move us foward and we love crazy new ideas.
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
                    <td>
                      <a
                        style={{ color: "#DD7834", fontWeight: "900" }}
                        href="/aboutme"
                      >
                        Connor
                      </a>{" "}
                    </td>
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
            <Image
              src={decore1}
              alt="Forecast Application Work in Progress"
              style={{
                maxHeight: "500px",
                maxWidth: "500px",
                display: "block",
                margin: "auto",
                padding: "20px 0 20px 0"
              }}
            />
            <TextContent>
              <Heading>Project Purpose and Goal</Heading>
              <Paragraph>
                I Built this because my notes were scattered in hundreds of
                different files, I eventually found myself writing about the
                same idea in different contexts and thought what if there was a
                way to link all my notes together and discover these hidden
                connections more. Like a new neural pathway forming in your
                brain <br />
                <br />
                This is an ongoing project that I keep adding features to in my
                free time, partially to explore new technologies in a useful
                context and partially just for my personal use. MAJOR FEATURES:
                ability to take and search notes, ability to visualize a network
                of your notes & compare them to other users were my main
                features for my MVP, but it has evolved into something of a digital garden
              </Paragraph>
              <Heading>Soon...</Heading>
              <Paragraph>Personal AI? Could we leverage GPT-3 & train an AI that thinks like you to do a variety of tasks. Could we scale human conciousness? </Paragraph>
            </TextContent>
            <WebStack>
              <LeftContent></LeftContent>
              <RightContent>
                <Heading>Web Stack and Explanation</Heading>
                <Paragraph>
                  React was an easy choice, because of its ease of state
                  management (Redux, useEffect, useState), the amount of
                  packages available, popularity in the community (support). I
                  utilized a mix of backend servers because of database needs.
                  Neo4J worked really well with Node.js where not with Django.
                  However, the website pre web app was written in Django (some
                  technical debt to work through)
                </Paragraph>
                <Paragraph>
                  DevOps was another process. I used Nginx, Docker, & Supervisor
                  on a GCP instance to auto-restart failed processes, handle
                  loading balancing, and my microservice architecture. My lack
                  of planning and hosting the website and web app logic on
                  seperate Node and Django servers actually helped reduce
                  coupling
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
              Some technical challenges
              <br/>
              1) keeping the app responsive had to deal with rendering of large lists on the frontend
    <br/>
              2) on the DevOps side, how to build redundancy and scability
    <br/>
              3) reducing bottlenecks on the backend by using Async & caches
    <br/>
              4) when saving notes how to deal with databases transactions with conflicting information
              </Paragraph>
  </CenterText>
            <Image
              src={decore3}
              alt="Forecast image with differing weather information"
              style={{
                maxHeight: "400px",
                maxWidth: "800px",
                display: "block",
                margin: "auto",
                padding: "20px 0 20px 0"
              }}
            />
            <CenterText>
              <Heading>Lessons Learned & Takeaways</Heading>
              <Paragraph>
                scability, pick a tech stack, priortize feautures, ship it.
                Scability and picking a tech stack don't need extensive explantion. when making a new product
                there are 1000s of things you could do. You need to priortize the top 3 and finally just ship it.
                chasing perfection will cause you to never release anything, ironically the best way to improve
                is just to ship and get feedback
              </Paragraph>
            </CenterText>
          </Container>
        </Layout>
      </div>
    </>
  );
};

export default withStyles(styles)(Decore);
