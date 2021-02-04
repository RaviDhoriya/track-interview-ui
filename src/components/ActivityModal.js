import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

const ActivityModal=(props)=>{
    const [show,setShow]=useState(false);
    const [isEdit,setISEdit]=useState(false);
    var job={};
    if(props.job){
        job=props.job;
        setISEdit(true);
    }
    
    return (<Modal show={show}>
        <ModalHeader>
            <ModalTitle>{ (isEdit)? "Edit Activity" : "New Activity" }</ModalTitle>
        </ModalHeader>
        <ModalBody>
            <p>Hello from activity</p>
        </ModalBody>
        <ModalFooter>
            <Button variant="primary">Save</Button>
            <Button variant="secondary" onClick={ ()=> setShow(false)}>Cancel</Button>
        </ModalFooter>
    </Modal>);
};

export default ActivityModal;