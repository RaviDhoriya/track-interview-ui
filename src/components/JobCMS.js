import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Alert,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import Api from "../config/Api";

const JobCMS = () => {
  const history = useHistory();
  var { job_id } = useParams();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [jobURL, setJobURL] = useState("");
  const [reviewURL, setReviewURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [source, setSource] = useState("");
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState("");
  const [minCTC, setMinCTC] = useState(0);
  const [maxCTC, setMaxCTC] = useState(0);
  const [notes, setNotes] = useState("");
  const [HRName, setHRName] = useState("");
  const [HREmail, setHREmail] = useState("");
  const [HRPhone, setHRPhone] = useState("");

  const [alert, setAlert] = useState({ msg: "", variant: "" });

  var submitForm = (e) => {
    var body = {};
    body.name = name;
    body.company = company;
    body.job_url = jobURL;
    body.review_url = reviewURL;
    body.linkedin_url = linkedinURL;
    body.source = source;
    body.skills = skills;
    body.location = location;
    body.ctc_min = minCTC;
    body.ctc_max = maxCTC;
    body.notes = notes;
    body.hr = { name: HRName, email: HREmail, phone: HRPhone };
    body.applied = new Date().toString();
    if (job_id) {
      body.job_id = job_id;
      Api.editJob(body, (response) => {
        if (response.status) {
          setAlert({ msg: response.message, variant: "success" });
          history.goBack();
        } else {
          setAlert({ msg: response.message, variant: "danger" });
        }
      });
    } else {
      Api.newJob(body, (response) => {
        if (response.status) {
          setAlert({ msg: response.message, variant: "success" });
          history.goBack();
        } else {
          setAlert({ msg: response.message, variant: "danger" });
        }
      });
    }
  };
  ///if job_id is present, get job details for EDIT form.
  useEffect(() => {
    if (job_id) {
      Api.getJobDetails(job_id, (response) => {
        console.log(response);
        if (response.status) {
          var { data } = response;
          setName(data.name);
          setCompany(data.company);
          setJobURL(data.job_url);
          setReviewURL(data.review_url);
          setLinkedinURL(data.linkedin_url);
          setSource(data.source);
          setSkills(data.skills);
          setLocation(data.location);
          setMinCTC(data.ctc_min);
          setMaxCTC(data.ctc_max);
          setNotes(data.notes);
          setHRName(data.hr.name);
          setHREmail(data.hr.email);
          setHRPhone(data.hr.phone);
        } else {
          console.error("Job not found.");
          job_id = undefined;
        }
      });
    }
  }, []);

  return (
    <Container>
      <h3>Create New Job</h3>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Job Position</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Job Position"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Company</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Job URL</FormLabel>
              <FormControl
                type="url"
                placeholder="Enter Job URL"
                value={jobURL}
                onChange={(e) => setJobURL(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter LinkedIn URL"
                value={linkedinURL}
                onChange={(e) => setLinkedinURL(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>
                Review URL <small>(eg. Glassdoor)</small>
              </FormLabel>
              <FormControl
                type="url"
                placeholder="Enter Review URL"
                value={reviewURL}
                onChange={(e) => setReviewURL(e.target.value)}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <FormLabel>Source</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Job Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Skills</FormLabel>
              <FormControl
                type="text"
                placeholder="Skills needed for this job"
                value={skills.join(",")}
                onChange={(e) => setSkills(e.target.value.split(","))}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Job Location</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Job Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Minimum CTC</FormLabel>
              <FormControl
                type="text"
                placeholder="Minimum CTC"
                value={minCTC}
                onChange={(e) => setMinCTC(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Maximum CTC</FormLabel>
              <FormControl
                type="text"
                placeholder="Maximum CTC"
                value={maxCTC}
                onChange={(e) => setMaxCTC(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Notes</FormLabel>
              <FormControl
                as="textarea"
                rows="3"
                placeholder="Notes about this Job"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <div>HR Contact</div>
            <Row>
              <Col>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="HR Name"
                    value={HRName}
                    onChange={(e) => setHRName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormControl
                    type="email"
                    placeholder="HR Email Address"
                    value={HREmail}
                    onChange={(e) => setHREmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <FormControl
                    type="tel"
                    placeholder="HR Phone Number"
                    value={HRPhone}
                    onChange={(e) => setHRPhone(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="primary"
              className="mr-3"
              onClick={(e) => submitForm(e)}
            >
              Save
            </Button>
            <Button variant="secondary" onClick={() => history.goBack()}>
              Cancel
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Alert
              show={alert.msg !== ""}
              variant={alert.variant}
              dismissible
              onClose={() => setAlert({ msg: "", variant: "" })}
            >
              {alert.msg}
            </Alert>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default JobCMS;
