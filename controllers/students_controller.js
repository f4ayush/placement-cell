const Student = require('../models/student');
const Batch = require('../models/batch');
const CourseScores = require('../models/courseScores');
const Interview = require('../models/interview');
const Result = require('../models/result');

module.exports.create = async function(req, res){
    try{
        let student = await Student.create({
            // content: req.body.content,
            // user: req.user._id,
            email: req.body.email, 
            name: req.body.name, 
            age: req.body.age, 
            college: req.body.college, 
            status: req.body.status 
            
        });
        
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            student = await student.populate('students', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    student: student
                },
                message: "student created!"
            });
        }

        req.flash('success', 'student published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}


module.exports.interview = async function(req, res){
    console.log("s")
    try{
        let student = await Student.findById(req.params.id).populate();
        let interviews = await Interview.find({"studentId":student._id});
        
        console.log(interviews)
        /* if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            student = await student.populate('students', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    student: student
                },
                message: "student created!"
            });
        } */

        return res.render('interview',{
             title: "Codeial | Home",
            student: student,
            interviews: interviews
        });
        

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}

module.exports.createInterview = async function(req, res){
    try{
        let interview = await Interview.create({
            studentId: req.body.studentId,
            company: req.body.company,
            date: req.body.date
        });
        
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            // interview = await interview.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    interview: interview
                },
                message: "interview Schdeuled!"
            });
        }

        req.flash('success', 'interview published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}

module.exports.updateResult = async function(req, res){
    try{
        let result = await Result.update(
            { 
                interviewId : req.body.interviewId
            },{
                result: req.body.status
            },{ 
                upsert: true 
            }
        );
        
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            // interview = await interview.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    result: result
                },
                message: "interview Schdeuled!"
            });
        }

        req.flash('success', 'interview published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}