import React,{useEffect,useState} from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';

import Api from '../config/Api';

const Dashboard = (props)=>{
    var [jobs,setJobs]=useState([]);
    var {job_status}= useParams();
    const getMyJobs=()=>{
        let params={};
        if(job_status){
            params.status=job_status;
        }
        
        Api.getMyJobs(params,(data)=>{
            if(data.status){
                setJobs(data.data);
            }else{
                //token expired - let's logout. So user can login again.
                props.logout();
            }
        });
    };
    
    const deleteJob=(job)=>{
        if(window.confirm(`Do you want to delete job "${job.name} - ${job.company}?`)){
            var params={};
            params.job_id=job._id;
            Api.deleteJob(params,(data)=>{
                if(data.status){
                    var newJobs=jobs.filter((e)=>{
                        return e._id!==job._id
                    });
                    setJobs(newJobs);
                }
            });
        }
    }
    useEffect(()=>{
        getMyJobs();
    },[]);
    return (
        <div>
            <Container>
                <Button as={Link} to="/job-add" variant="outline-primary" className="float-right">[+] New Job</Button>
                <h3>Dashboard</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Sr#</td>
                            <td>Position</td>
                            <td>Company</td>
                            <td>Status</td>
                            <td>Updated</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job,index)=>{
                        return (<tr key={job._id}>
                            <td>{index+1}</td>
                            <td><Link to={`/job/${job._id}`}>{job.name}</Link></td>
                            <td>{job.company}</td>
                            <td>{job.status}</td>
                            <td><ReactTimeAgo date={new Date(job.updated)} locale="en-US" /></td>
                            <td><Button as={Link} to={`/job-edit/${job._id}`}>Edit</Button> <Button variant="danger" onClick={(e)=>deleteJob(job)}>Delete</Button></td>
                        </tr>);
                    })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Dashboard;