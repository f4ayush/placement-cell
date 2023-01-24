const Student = require('../models/student');


module.exports.home = async function(req, res){

    try{
           
        let students = await Student.find({});

        return res.render('home',{
            title: "Placement Cell | Home",
            all_students:  students
        });


    }catch(err){
        console.log('Error', err);
        return;
    }
   
}
