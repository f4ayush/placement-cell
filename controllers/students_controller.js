const Student = require('../models/student');
const Batch = require('../models/batch');
const CourseScores = require('../models/courseScores');
const Interview = require('../models/interview');
const Result = require('../models/result');
const { json2csvAsync } = require('json-2-csv');

module.exports.create = async function(req, res){
    try{
        let student = await Student.create({
            email: req.body.email, 
            name: req.body.name, 
            age: req.body.age, 
            college: req.body.college, 
            status: req.body.status,
            batch: req.body.batch,
            webDevelopment:req.body.webD,
            dsa:req.body.dsa,
            react:req.body.react
        });
        
        if (req.xhr){
            
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
        let student = await Student.findById(req.params.id);
        let interviews = await Interview.find({"studentId":student._id}).populate('resultId');
        
        console.log(interviews)
       
        return res.render('interview',{
             title: "Placement Cell | Home",
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
        console.log(interview)
        await Student.update({_id: req.body.studentId}, {$push:{interviews:interview._id}})
        if (req.xhr){
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
        let result = await Result.findOneAndUpdate(
            { 
                interviewId : req.body.interviewId
            },{
                result: req.body.status
            },{ 
                upsert: true 
            }
        );
        if(!result){
            result = await Result.find(
                { 
                    interviewId : req.body.interviewId
                }
            );
            result = result[0];
        }
        
        let interview = await Interview.update(
            { 
                _id : req.body.interviewId
            },{
                resultId: result._id
            }
        );
        console.log(interview);
        if (req.xhr){
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


module.exports.downloadData = async function(req,res){
    try {
        let students = await Student.find({}).populate({path:'interviews', populate:{path:"resultId"}}).lean();
        let jsonData = convertToJson(students);
        let csvData = await json2csvAsync(jsonData);
        return res.send(csvData)
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

function convertToJson(data){
    let result = [];
    for(let i = 0; i<data.length; i++){
        let temp = {...data[i]};
        console.log(temp)
        delete temp.interviews;
        delete temp.__v
        delete temp.updatedAt
        delete temp.createdAt

        let interviews = data[i].interviews;
        if(interviews.length > 0){
            for(j = 0; j<interviews.length; j++){
            let newEntry = {...temp}
            newEntry.interviewCompany = interviews[j].company;
            newEntry.interviewDate = interviews[j].date;
            if(interviews[j].resultId){
                newEntry.interviewResult = interviews[j].resultId.result;
            }else{
                newEntry.interviewResult = "NA";
            }
            result.push(newEntry)
            }
        }else{
            temp.interviewCompany = "-"
            temp.interviewResult = "-"
            result.push(temp)
        }
    }
    return result
}