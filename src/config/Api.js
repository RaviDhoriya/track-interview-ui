const Api={};
Api.BASE=process.env.REACT_APP_API_URL;

Api.headers=()=>{
    var headers={'Content-Type':'application/json'};
    var token=localStorage.getItem("token")||false;
    if(token){
        headers.Authorization="Bearer "+token;
    }
    return headers;
}
Api.login=(body,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="POST";
        obj.body=JSON.stringify(body);
        fetch(Api.BASE+"/api/login",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to validate user",error:err});
    }
};
Api.signup=(body,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="POST";
        obj.body=JSON.stringify(body);
        fetch(Api.BASE+"/api/signup",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to register new user",error:err});
    }
};
Api.getJobStats=(callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="GET";
        fetch(Api.BASE+"/api/jobs/stats",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to get Job stats",error:err});
    }
}
Api.getMyJobs=(params,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="POST";
        obj.body=JSON.stringify(params);
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
Api.newActivity=(body,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="POST";
        obj.body=JSON.stringify(body);
        fetch(Api.BASE+"/api/activities",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to add activity",error:err});
    }
}
Api.editActivity=(body,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="PUT";
        obj.body=JSON.stringify(body);
        fetch(Api.BASE+"/api/activities",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to edit activity",error:err});
    }
}
Api.deleteActivity=(body,callback)=>{
    try{
        var obj={};
        obj.headers=Api.headers();
        obj.method="DELETE";
        obj.body=JSON.stringify(body);
        fetch(Api.BASE+"/api/activities",obj)
            .then(response=> response.json())
            .then(json=>callback(json));
    }
    catch(err){
        callback({status:false,message:"Failed to delete activity",error:err});
    }
}
export default Api;