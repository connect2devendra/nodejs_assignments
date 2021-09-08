const dbconn = require('../config/database');
const jwt = require("jsonwebtoken");
const _ = require('underscore');

//Fetch all user list
const getUsers = (req, res) => { 

  try {

      const auth = req.auth || {};
      // console.log(auth);    
      if (auth.user_role.includes("EMPLOYEE")) {    
        // Unauthorized to access this
        return res.status(401).json({
          success: false,
          message: "Not authorized to access users list."
        });
      }

      // fetch all users in user table
      dbconn.query('SELECT * FROM user', (err, rows, fields) => {

        if (err){
          return res.status(500).json({
            success: false,
            message: err.message 
          });
        }

        if(rows.length > 0){

        // console.log('The data from user table are: \n', rows);
        //sorting by user name key 
        rows = _.sortBy(rows,'name'); //usisng third party "underscore" nodejs package

        //custom code for sorting
        
        // rows.sort(function(a, b){
        //     if(a.name < b.name) { return -1; }
        //     if(a.name > b.name) { return 1; }
        //     return 0;
        // });

        return res.status(200).json({
            success: true,
            message: "User List",
            result: rows
        });

      } else {
       return res.status(404).json({
          success: false,
          message: "Record not found!",
          result: null
        });
      }

    });

  } catch (error) {
       //Exception error handle
      return res.status(500).json({
        success : false,
        message : error.message  || "Something wrong!"
      });
  }
    
}

//User Details By ID
const getUserByID = (req, res) => {

  try {
    // fetch user details by user id
    let id = req.params.id;

    const auth = req.auth || {};
      // console.log(auth);    
      if (auth.user_role.includes("EMPLOYEE") && auth.user_id != id) {    
        // Unauthorized to access this
        return res.status(401).json({
          success: false,
          message: "Not authorized to access other user profile details."
        });
      }
    dbconn.query('SELECT * FROM user where id=?', [id], (err, rows, fields) => {

      if (err){
        return res.status(500).json({
          success: false,
          message: err.message 
        });
      }
      // console.log('The data from user table are: \n', rows);
      return res.status(200).json({
        success: true,
        message: "User Details By ID",
        result: rows[0]
      });
    });
    
  } catch (error) {    
     //Exception error handle
     return res.status(500).json({
      success : false,
      message : error.message  || "Something wrong!"
    });
  }  
}

//login function
const userLogin = (req, res) => {

  try {
        // fetch email & password from request body payload
        let {email, password} = req.body;

        if(!email && !password){ 
          //Validate inputs
          return res.status(400).json({
            success : false,
            message : "Please enter email and password!"
          });
        }

        dbconn.query('SELECT * FROM user where email=? and password=?', [email, password], (err, rows, fields) => {

                if (err){
                  return res.status(500).send({
                    success: false,
                    message: err || "Some error occurred while login."
                  });
                }

                if(rows.length > 0){
                  // console.log('The data from user table are: \n', rows);

                  let user = rows[0];
                  // Create token
                  const token = jwt.sign(
                    { user_id: user.id, user_name:user.name, user_email:user.email, user_role:user.role },
                    process.env.JWT_KEY,
                    {
                      expiresIn: process.env.JWT_EXPIRES_IN, 
                    }
                  );

                  return res.status(200).json({
                    success : true,
                    message : "Login successful",
                    access_token: token,
                    user : user                               
                  });            
                } else {
                  //if credential not matched in database // Unauthenticated
                  return res.status(401).json({
                    success : false,
                    message : "Invalid credentials!"
                  });
                }          
          });        
    
  } catch (error) {
      //Exception error handle
      return res.status(500).json({
        success : false,
        message : error.message  || "Something wrong!"
      });
  }

}

module.exports = {getUsers, getUserByID, userLogin};

