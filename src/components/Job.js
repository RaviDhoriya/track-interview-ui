import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Jumbotron, Button, Modal } from "react-bootstrap";
import { useParams,Link } from "react-router-dom";
import Api from "../config/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEdit,
  faExternalLinkSquareAlt,
  faPlus,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";
import ActivityModal from "./ActivityModal";

const Job = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState({ skills: [], activities: [] });
  const activityModal = useRef();

  const getJobDetails = () => {
    Api.getJobDetails(job_id, (resp) => {
      if (resp.status) {
        setJob(resp.data);
      }
    });
  };

  useEffect(() => {
    getJobDetails();
  }, []);
  const parentCallback=()=>{
    getJobDetails();
  };
  const deleteActivity=(activity)=>{
    if(window.confirm("Do you want to delete this activity?")){
      var params={};
      params.activity_id=activity._id;
      Api.deleteActivity(params,(data)=>{
          if(data.status){
              var newActivities=job.activities.filter((e)=>{
                  return e._id!==activity._id
              });
              setJob({...job,activities:newActivities});
          }
      });
    }
  };
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
        <Col>
          <div className="activity-add">
            <Button
              variant="success"
              className="float-right"
              onClick={() => activityModal.current.showModal(null)}
            >
              <FontAwesomeIcon icon={faPlus} /> New Activity
            </Button>
            <Button
              as={Link}
              variant="warning"
              className="float-right mr-3"
              to={`/job-edit/${job._id}`}

            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
            <ActivityModal job={job} ref={activityModal} parentCallback={parentCallback}/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="activity-list">
          {job.activities.map((activity, index) => {
            return (
              <React.Fragment key={index}>
                <div className="activity-box" >
                  <div className="activity-buttons">
                    <Button variant="danger" size="sm" onClick={()=>{ deleteActivity(activity)}}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    {"  "}
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => activityModal.current.showModal(activity)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </div>
                  <div className="activity-head">
                    {`${new Date(
                      activity.stamp
                    ).toLocaleDateString()} ${new Date(
                      activity.stamp
                    ).toLocaleTimeString()}`}{" "}
                    <ReactTimeAgo
                      date={new Date(activity.stamp)}
                      locale="en-US"
                    />
                  </div>
                  <div className="activity-body">{activity.body}</div>
                </div>
              </React.Fragment>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};
export default Job;
