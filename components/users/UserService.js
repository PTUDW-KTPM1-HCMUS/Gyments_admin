const Account = require('./AccountModel');
const bcrypt = require('bcrypt');
const cloudinary = require('../../utils/cloudinary');

const getAccountList = async(reqPage, option, username, currentUser) => {
    let accounts = [];
    let activeAccounts = [];
    let bannedAccounts = [];
    let pages = [];
    try{
        // use $ne: current user to get all user except this current user
        if (username.length != 0){
            // use $eq username in order to find only one user
            accounts = await Account.find({username: {$eq: username, $ne: currentUser.username}}).lean();
            activeAccounts = await Account.find({username: {$eq: username, $ne: currentUser.username}, status: true}).lean();
            bannedAccounts = await Account.find({username: {$eq: username, $ne: currentUser.username}, status: false}).lean();
        }
        else{
            // find all user
            if (option === 'All'){
                accounts = await Account.find({username: {$ne: currentUser.username}}).lean();
                activeAccounts = await Account.find({username: {$ne: currentUser.username}, status: true}).lean();
                bannedAccounts = await Account.find({username: {$ne: currentUser.username}, status: false}).lean();
            }else if (option === 'Users'){
                // find only Users type
                accounts = await Account.find({username: {$ne: currentUser.username}, userType: false}).lean();
                activeAccounts = await Account.find({username: {$ne: currentUser.username}, status: true, userType: false}).lean();
                bannedAccounts = await Account.find({username: {$ne: currentUser.username}, status: false, userType: false}).lean();
            }else if (option === 'Administrators'){
                // find only admins type
                accounts = await Account.find({username: {$ne: currentUser.username}, userType: true}).lean();
                activeAccounts = await Account.find({username: {$ne: currentUser.username}, status: true, userType: true}).lean();
                bannedAccounts = await Account.find({username: {$ne: currentUser.username}, status: false, userType: true}).lean();
            }
            const perPage = 6;
            const page = parseInt(reqPage);
            const start = (page - 1) * perPage;
            const end = page * perPage;

            for (let i = 0; i < accounts.length / perPage; i++){
                let temp = {};
                temp.currentPage = i + 1;
                temp.pageLink = `?username=${username}&options=${option}&page=${i+1}`;
                pages.push(temp);
            }
            accounts = accounts.slice(start, end);
        }
        return [accounts, activeAccounts, bannedAccounts, pages];
    }catch (err){
        console.log({message: err});
    }
    return [accounts, activeAccounts, bannedAccounts, pages];
}
const showDetail = async (userID) => {
    let detail = null;
    try{
        detail = await Account.findById(userID).lean();
        return detail;
    }catch (err){
        console.log({message: err});
    }
    return detail;
}

const findByUsername = async (username) => {
    let user = null;
    try {
        user = await Account.findOne({username: username}).lean();
        return user;
    }catch (err){
        console.log({message: err});
    }
    return user;
};

const validPassword= async (password, user)=> {
    let account = null;
    try{
        if (bcrypt.compareSync(password,user.password)){
            account = await Account.findOne({username: user.username}).lean();
        }
        return account;
    }catch (err){
        console.log({message: err});
    }
    return account;
}
const findByEmail = async (email) => {
    let userEmail = await Account.findOne({email: email});
    return userEmail;
}
const findByPhone = async (phone) => {
    let userPhone = await Account.findOne({phone: phone});
    return userPhone;
}
const addAccount = async (accountDetail, avatarDetail) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hashSync(accountDetail.password, salt);
    let avatar = null;
    let avatarID= null;
    let imgResult = await cloudinary.uploader.upload(avatarDetail.path);
    avatar = imgResult.secure_url;
    avatarID = imgResult.public_id;
    const newUser = new Account({
        username: accountDetail.username,
        password: hashPass,
        userType: true,
        fname: accountDetail.fname,
        lname: accountDetail.lname,
        email: accountDetail.email,
        address: accountDetail.address,
        phone: accountDetail.phone,
        gender: accountDetail.gender,
        avatar: avatar,
        avatarID: avatarID
    });
    try{
        const savedUser = newUser.save();
        return savedUser;
    }catch (err){
        console.log({message: err});
    }
}
module.exports = {getAccountList, showDetail, findByUsername, validPassword, findByPhone, findByEmail, addAccount}