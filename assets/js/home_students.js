{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-student-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/students/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data.data.student)
                    let newPost = newPostDom(data.data.student);
                    $('#students-table>tbody').prepend(newPost);
                    newPostForm[0].reset();
                    new Noty({
                        theme: 'relax',
                        text: "Student Added!",
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
        return $(`<tr id="post-<%= student._id %>"> 
        <th scope="row">
            <a class="delete-post-button"  href="/students/interview/${post._id}">Set Interview</a>
        </th>
        <td>${post.email}</td>
        <td>${post.name}</td>
        <td>${post.age}</td>
        <td>${post.college}</td>
        <td>${post.status}</td>
    </tr>`)
                
    }

    createPost();
    
}