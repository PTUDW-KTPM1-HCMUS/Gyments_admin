const nodemailer = require('nodemailer');

exports.sendPass=async (newpass,username,email)=>{

    const transport =nodemailer.createTransport({
        
        host: 'smtp.gmail.com',
        port:465,
        secure: true,
        auth:{
            user: 'hethongquanliweb@gmail.com',
            pass: 'lethanhkhoi123',
        },
        tls:{
            rejectUnauthorized: false,
        }
    });
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: '<hethongquanliweb@gmail.com>',
        to: email,
        subject: 'Test Nodemailer',
        html:   `<div style="background-color: #ea562dda; padding: 2em 2em;">
                    <h1 style="text-align: center;">Hello ${username}</h1>
                    <h4 style="text-align: center;">Your new password is ${newpass}. Please return to the login screen to continue!</h4>
                </div>`
    }
    transport.sendMail(mainOptions,(error)=>{
        if(error){
            return console.log(error);
        }
    });
    
}
