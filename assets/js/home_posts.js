{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/students/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data.data.student)
                    let newPost = newPostDom(data.data.student);
                    $('#posts-list-container>ul').prepend(newPost);
                    newPostForm[0].reset();
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        // CHANGE :: show the count of zero likes on this post
        return $(`<li id="post-${post._id}">
        <small>
            <a class="delete-post-button"  href="/students/interview/${post._id}">Interview</a>
        </small>
        
        
        <br>
        <small>
            ${post.email}
            ${post.name}
            ${post.age}
            ${post.college}
            ${post.status}
            
        </small>
                    
                </li>`)
    }

    http://localhost:8000/students/interview/undefined
    // method to delete a post from DOM
    /* let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    } */





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    // let convertPostsToAjax = function(){
    //     $('#posts-list-container>ul>li').each(function(){
    //         let self = $(this);
    //         let deleteButton = $(' .delete-post-button', self);
    //         deletePost(deleteButton);

    //         // get the post's id by splitting the id attribute
    //         let postId = self.prop('id').split("-")[1]
    //         new PostComments(postId);
    //     });
    // }



    createPost();
    // convertPostsToAjax();
}