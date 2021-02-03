import React,{useEffect,useState} from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Api from '../config/Api';

const Dashboard = ()=>{
    var [jobs,setJobs]=useState([]);

    const getMyJobs=()=>{
        Api.getMyJobs((data)=>{
            if(data.status){
                console.log(data);
                setJobs(data.data);
            }else{
                console.error("Failed to load My Jobs");
            }
        });
    };
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
                            <td>Applied</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job,index)=>{
                        return (<tr>
                            <td>{index+1}</td>
                            <td>{job.name}</td>
                            <td>{job.company}</td>
                            <td>{job.status}</td>
                            <td>{job.applied}</td>
                            <td>View | Edit | Delete</td>
                        </tr>);
                    })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Dashboard;