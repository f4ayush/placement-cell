{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/students/interview-create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data)
                    let newPost = newPostDom(data.data.interview);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button', newPost));

                    // call the create comment class
                    // new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    // new ToggleLike($(' .toggle-like-button', newPost));

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
    let newPostDom = function(interview){
        // CHANGE :: show the count of zero likes on this post
        return $(`<li id="post-${interview._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ interview.id }">X</a>
                        </small>
                       
                        ${ interview.company }
                        <br>
                        <small>
                        ${ interview.date }
                        </small>
                        <br>
                       

                    </p>
                    <select name="status" id="status">
                            <option selected value="didnt_attempt">Didn't Attempt</option>
                            <option value="pass">Pass</option>
                            <option value="fail">Fail</option>
                            <option value="on_hold">On Hold</option>
                    </select>
                    <button>Save</button>
                    
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(updateResultForm){
        updateResultForm.submit(function(e){
            e.preventDefault();
            console.log(updateResultForm.serialize())
            $.ajax({
                type: 'post',
                url: '/students/interview-result',
                data: updateResultForm.serialize(),
                success: function(data){
                    console.log(data)

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





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $('form', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
        });
    }



    createPost();
    convertPostsToAjax();
}