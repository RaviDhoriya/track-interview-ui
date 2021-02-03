const Api={};
Api.BASE=process.env.REACT_APP_API_URL;

Api.headers=()=>{
    var headers={'Content-Type':'application/json'};
    return headers;
}
Api.getMyJobs=(callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="GET";
        fetch(Api.BASE+"/api/jobs",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to get Jobs",error:err});
    }
}
Api.getJobDetails=(job_id,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="GET";
        fetch(`${Api.BASE}/api/jobs/${job_id}`,obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to get job details",error:err});
    }
}

Api.newJob=(body,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="POST";
        obj.body=JSON.stringify(body);
        fetch(Api.BASE+"/api/jobs",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to add Job",error:err});
    }
}
Api.editJob=(body,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="PUT";
        obj.body=JSON.stringify(body);
        fetch(Api.BASE+"/api/jobs",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to edit Job",error:err});
    }
}
Api.deleteJob=(body,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="DELETE";
        obj.body=JSON.stringify(body);
        fetch(Api.BASE+"/api/jobs",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to delete Job",error:err});
    }
}
export default Api;