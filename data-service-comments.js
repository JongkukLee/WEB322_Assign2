const mongoose = require('mongoose');
let Schema = mongoose.Schema;




// define the content schema
const commentSchema = new Schema({
  "comment_id": String,
  "authorName": String,
  "authorEmail": String,
  "commentText": String,
  "postedDate ": {
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
let Comment = mongoose.model("Comment", commentSchema);; 

// create new connection
// we are able to connect to our MongoDB instance 
module.exports.initialize = function () 
{
    return new Promise(function (resolve, reject) {

        let db = mongoose.createConnection("mongodb://<jlee465>:<Vkvkdi0^>@ds017258.mlab.com:17258/web322_a6");
        
        db.on('error', (err)=>
        { 
            reject(err); // reject the promise with the provided error 
        }); 
        
        db.once('open', ()=>
        { 
           Comment = db.model("comments", commentSchema);            
           resolve(newComment._id);
        }); 
    }); 
}; 

// add a new Comment to the database 
module.exports.addComment = (data) =>
{
    return new Promise( function (resolve, reject) 
    {
        data.postedDate = Date.now();
        let newComment = new Comment(data);
        newComment.save( )
        .exec()
        .then((err) => 
        {
            if(err) 
            {
                //console.log("There was an error saving the Kwik-E-Mart company");

                reject();
            } 
            else 
            {
                //console.log("The Kwik-E-Mart company was saved to the web322_companies collection");
                resove("There was an error saving the comment: " + err);
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

        Company.find()
        .sort({ postedDate : 1 })
        .exec()
        .then((comments) => 
        {
            // return promise and pass the error that was "caught" 
            // during the Comment.find() operation
            if(err)
            {
                reject(err);
            }
            //  comments will be an array of objects.
            // Each object will represent a document that matched the query
            resolve(comments);
        });
    });  
}

module.exports.addReply = (data) =>
{
    return new Promise( function (resolve, reject) 
    {
        data.repliedDate  = Date.now();
        
        //update inner record
        Comment.update(
        {
            _id: data.comment_id
        }
        ,
        {
            $addToSet: 
            {
                $addToSet: { replies: data } 
            }
        })
        .exec()
        .then((err) => 
        {
            if(err) 
            {
                //console.log("There was an error saving the Kwik-E-Mart company");

                reject();
            } 
            else 
            {
                //console.log("The Kwik-E-Mart company was saved to the web322_companies collection");
                resove("There was an error saving the comment: " + err);
            }
        });      
    });
}










