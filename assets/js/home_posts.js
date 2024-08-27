// {
//     //method created to submit the form data for new post using ajax
//     let createPost= function(){
//         let newPostForm= $('#new-post-form');

//         newPostForm.submit(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/posts/create',
//                 data: newPostForm.serialize(),//used to parsen the data into json format 
//                 success: function(data){
//                     let newPost= newPostDom(data.data.post);
//                     $('#post-list-container>ul').prepend(newPost);
//                     deletePost($('.delete-post-button', newPost))//find delete link in new post using the class name 
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }
//     //creating the post in DOM
//     let newPostDom = function(post){
//         //remove all <%%> from post.ejs and make them ${} --> to operate 
//         //remove if condition to check if user is logged in or not before deleting as we can see them for now 
//         //this file will be send by above ajax request 
//         return $(`<li id="post-${post._id}">
//         <p>
        
           
//                 <small>
//                     <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
//                 </small>    
            
              
            
//             ${ post.content }
//             <br>
//             <small>
//                 ${ post.user.name }
//             </small>
//         </p>
//         <!-- POST COMMENTS  -->
//         <div class="post-comments">
            
                
//                  <form action="/comments/create" method="POST">
//                      <input type="text" name="content" placeholder="type here to add comments..">
//                      <!-- sending hidden data  -->
//                      <input type="hidden" name="post" value="${post._id }">
//                      <input type="submit" value="Add Comment">
    
//                  </form>
            
//         </div>
    
    
//         <div id="post-comments-list">
//             <ul id="post-comments-${post._id }" >
                
                    
                
//             </ul>
//         </div>
//     </li>`)
//     }



//     //method to delete the post from the dom 
//     let deletePost= function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'), // this will give the value href in a tag
//                 success: function(data){
//                     $(`#post-${data.data.post_id}`).remove();//function to remove the post by its id in ajax 
//                     //post_id object is coming from the req.xhr file 
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }
//     createPost();


    
// }

document.getElementById('posts-new').addEventListener('click',function(e){
    e.preventDefault();
    document.getElementById('Create-a-post').style.display='inline';
})

document.getElementById('cross-post').addEventListener('click',function(){
    document.getElementById('Create-a-post').style.display='none';
})