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
export default Api;