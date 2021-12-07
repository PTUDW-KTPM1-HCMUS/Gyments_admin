const Account = require('./AccountModel');

const getAccountList = async(reqPage, option, username) => {
    let accounts = [];
    let activeAccounts = [];
    let bannedAccounts = [];
    let pages = [];
    try{
        if (username.length != 0){
            accounts = await Account.find({username: username}).lean();
            activeAccounts = await Account.find({username: username, status: true}).lean();
            bannedAccounts = await Account.find({username: username, status: false}).lean();
        }
        else{
            if (option === 'All'){
                accounts = await Account.find().lean();
                activeAccounts = await Account.find({status: true}).lean();
                bannedAccounts = await Account.find({status: false}).lean();
            }else if (option === 'Users'){
                accounts = await Account.find({userType: false}).lean();
                activeAccounts = await Account.find({status: true, userType: false}).lean();
                bannedAccounts = await Account.find({status: false, userType: false}).lean();
            }else if (option === 'Administrators'){
                accounts = await Account.find({userType: true}).lean();
                activeAccounts = await Account.find({status: true, userType: true}).lean();
                bannedAccounts = await Account.find({status: false, userType: true}).lean();
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
module.exports = {getAccountList, showDetail}