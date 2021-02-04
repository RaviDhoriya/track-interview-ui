import React, { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron,Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Api from "../config/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
    faEdit,
  faExternalLinkSquareAlt,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";

const Job = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState({ skills: [], activities: [] });

  const getJobDetails = () => {
    Api.getJobDetails(job_id, (resp) => {
      if (resp.status) {
        console.log(resp.data);
        setJob(resp.data);
      }
    });
  };

  useEffect(() => {
    getJobDetails();
  }, []);
  return (
    <Container>
      <hr />
      <Row>
        <Col>
          <Jumbotron>
            <h3 className="company-name">
              {job.company} <small>({job.location})</small>
            </h3>
            <div className="position-name">
              {job.name}{" "}
              <small>
                <a href={job.job_url} target="_new">
                  {job.source}{" "}
                  <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
                </a>
              </small>
            </div>
            <div className="icon-row">
              <a href={job.linkedin_url} target="_new">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>{" "}
              |{" "}
              <a href={job.review_url} target="_new">
                <FontAwesomeIcon icon={faStar} /> Glassdoor Review
              </a>{" "}
            </div>
            <div className="skill-row">
              {job.skills.map((skill, index) => {
                return <span className="skill-tag">{skill}</span>;
              })}
            </div>
            <div className="ctc-row">
              CTC: {job.ctc_min}
              {job.ctc_max !== "" ? " - " + job.ctc_max : ""}
            </div>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col className="activity-list">
          {job.activities.map((activity, index) => {
            return (
              <div className="activity-box">
                  <div className="activity-buttons">
                      <Button variant="danger" size="sm"><FontAwesomeIcon icon={faTrash}/></Button>{"  "}
                      <Button variant="warning" size="sm"><FontAwesomeIcon icon={faEdit}/></Button>
                  </div>
                <div className="activity-head">
                  { `${new Date(activity.stamp).toLocaleDateString()} ${new Date(activity.stamp).toLocaleTimeString()}`} <ReactTimeAgo date={activity.stamp} locale="en-US" />
                </div>
                <div className="activity-body">{activity.body}</div>
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};
export default Job;
