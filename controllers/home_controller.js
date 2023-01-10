const Student = require('../models/student');


module.exports.home = async function(req, res){

    try{
        // CHANGE :: populate the likes of each Student and comment
        // let students = await Student.find({})
        // .sort('-createdAt')
        // .populate('student')
        // .populate({
        //     path: 'comments',
        //     populate: {
        //         path: 'user'
        //     },
        //     populate: {
        //         path: 'likes'  
        //     }
        // }).populate('likes');

    
        let students = await Student.find({});

        return res.render('home',{
            title: "Codeial | Home",
            all_students:  students
        });


    }catch(err){
        console.log('Error', err);
        return;
    }
   
}
