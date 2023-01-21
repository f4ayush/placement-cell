const Student = require('../models/student');
const Batch = require('../models/batch');
const CourseScores = require('../models/courseScores');

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

