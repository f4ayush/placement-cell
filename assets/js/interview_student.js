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
                    let newInterview = newInterviewDom(data.data.interview);
                    $('#results-table>tbody').prepend(newInterview);
                    updateResult($('form', newInterview));

                    newPostForm[0].reset();

                    new Noty({
                        theme: 'relax',
                        text: "Interview Scheduled!",
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
    let newInterviewDom = function(interview){
        // CHANGE :: show the count of zero likes on this post
        let interviewDate = new Date(interview.date);
        const yyyy = interviewDate.getFullYear();
        let mm = interviewDate.getMonth() + 1;
        let dd = interviewDate.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedDate = dd + '/' + mm + '/' + yyyy;
        return $(`<tr id="post-${interview._id}">
        <td>${ formattedDate}</td>
        <td>${ interview.company }</td>
        <td>
            <form action="students/interview-result" method="post">
                <input type="text" name="interviewId" value="${ interview._id}" hidden>
                <select class="form-select" name="status" id="status">
                    <option selected value="didnt_attempt">Didn't Attempt</option>
                    <option value="pass">Pass</option>
                    <option value="fail">Fail</option>
                    <option value="on_hold">On Hold</option>
                </select>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </td>
        
    </tr>`)
                
    }


    // method to delete a post from DOM
    let updateResult = function(updateResultForm){
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
                        text: "Result Updated",
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
        $('#results-table>tbody>tr').each(function(){
            let self = $(this);
            let submitResult = $('form', self);
            updateResult(submitResult);
        });
    }



    createPost();
    convertPostsToAjax();
}