const {User} = require('../utils/db')
const sendMail =  function(email,code){
    let mailOptions = {
        from: '"猫耳FM" <595955856@qq.com>', 
        to: email, 
        subject: '你收到一个验证码', 
        html: code,
      };
    const transporter = require('../utils/email')
      transporter.sendMail(mailOptions, (error) => {
          if (error) {
            return console.log(error);
          }
        });
    }
    const findOne = (data) => {
        return  User.find({ 'username': data.username },  function (err) {
          if(err){
            console.log(err);
          }
          });
        }
        // const getCode = (data)=>{
        //   return User.findOne()
        // }
        const setCode = (data)=>{
          return User.updateOne({'username':data.username},{$set:{"code":data.code}},function(err){
            if(!err){
              console.log('验证码设置成功---');
            }
          })
        }

        const changePassword = (data)=>{
            const user = new User(data)
        return User.updateOne({ 'username': user.username},{$set:{password:user.password}},function(err){
                if(!err){
                    console.log('密码更新成功----');
                }
            });
        }
    module.exports = {sendMail,findOne,changePassword,setCode};