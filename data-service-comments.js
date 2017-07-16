const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// define the content schema
const commentSchema = new Schema({
  "authorName": String,
  "authorEmail": String,
  "subject": String,  
  "commentText": String,
  "postedDate": {
    type: Date,
    default: Date.now
  },
  "replies": [{ 
      comment_id: String,  
      authorName: String, 
      authorEmail: String, 
      commentText: String, 
      repliedDate: Date }]
});

// to be defined on new connection (see initialize) 
let Comment; //= mongoose.model("Comment", commentSchema);; 

// create new connection
// we are able to connect to our MongoDB instance 
module.exports.initialize = function () 
{
    return new Promise(function (resolve, reject) {

        let db = mongoose.createConnection("mongodb://jlee465:Vkvkdi0^@ds017258.mlab.com:17258/web322_a6");
        db.on('error', (err)=>
        { 
            reject(err); // reject the promise with the provided error 
        }); 
        
        db.once('open', ()=>
        { 
           Comment = db.model("comments", commentSchema);            
           resolve();
        }); 
    }); 
}; 

// add a new Comment to the database 
module.exports.addComment = (data) =>
{
    console.log("data-service-comments::addComment():::data:::" + data);
    return new Promise( function (resolve, reject) 
    {
        data.postedDate = Date.now();
        let newComment = new Comment(data);
        newComment.save( (err) => 
        {
            if(err) 
            {
                //console.log("There was an error saving the Kwik-E-Mart company");
                console.log("data-service-comments::addComment():::fail!" + err);
                reject("There was an error saving the comment: " + err);
            } 
            else 
            {
                console.log("data-service-comments::addComment():::successful!-->" + newComment._id + "<--");                
                //console.log("The Kwik-E-Mart company was saved to the web322_companies collection");
                resolve(newComment._id);
            }
        });        
    });
  // exit the program after saving
  // process.exit();
};

module.exports.getAllComments = () =>
{
    return new Promise(function (resolve, reject) 
    {
        Comment.find()
        .sort({ postedDate : 1 })
        .exec()
        .then((comments) => 
        {
            //  comments will be an array of objects.
            // Each object will represent a document that matched the query
            console.log("data-service-comments:: getAllComments():::successful!");   
            resolve(comments);
        }).catch( (err)=> {

            // return promise and pass the error that was "caught" 
            // during the Comment.find() operation
            console.log("data-service-comments:: getAllComments():::fail!" + err);                
            reject(err);
        });
    });  
}

module.exports.addReply = (data) =>
{
    console.log("data-service-comments::addReply():::data:::" + data);    
    return new Promise( function (resolve, reject) 
    {
        data.repliedDate  = Date.now();
        //update inner record
        Comment.update(
        {_id: data.comment_id}
        ,
        {$addToSet: {replies: data}}
        , 
        { multi: false })   
        .exec()
        .then(() => 
        {
            console.log("data-service-comments::addReply():::successful!");                  
            resolve();
        }).catch((err) =>{
            console.log("data-service-comments::addReply():::fail!" + err);  
            reject(err);
        });         
 
    });
}

module.exports.removeTest = () =>
{
    return new Promise( function (resolve, reject) 
    {
        //update inner record
        Comment.remove( { authorName: "Comment 1 Author"} )
        //.exec()
        .then(() => 
        {
            console.log("data-service-comments:: removeTest():::successful!");                  
            resolve();
        }).catch((err) =>{
            console.log("data-service-comments:: removeTest():::fail!" + err);  
            reject(err);
        });
    });
}