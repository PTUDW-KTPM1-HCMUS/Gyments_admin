const service = require("./UserService");

class UserController {
  //[GET] Account Page
  async showUserManagement(req, res) {
    try {
      let currentPage = req.query.page || 1;
      let option = req.query.options || "All";
      let username = req.query.username || "";
      const [accounts, activeAccounts, bannedAccounts, pages] =
        await service.getAccountList(currentPage, option, username, req.user);
      let previous =
        Math.ceil(parseInt(currentPage) - 1) < 1
          ? 1
          : Math.ceil(parseInt(currentPage) - 1);
      let next =
        Math.ceil(parseInt(currentPage) + 1) > pages.length
          ? pages.length
          : Math.ceil(parseInt(currentPage) + 1);
      let length = true; // check if search for 1 user or multiple
      if (username.length != 0 || accounts.length === 1) length = false;
      res.render("users/views/management", {
        accounts,
        activeAccounts,
        bannedAccounts,
        pages,
        currentPage,
        previous,
        next,
        option,
        username,
        length,
      });
    } catch (err) {
      console.log({ message: err });
    }
  }

  // async getUserDetail(req, res){
  //     try{
  //         const detail = await service.showDetail(req.params.userID);
  //         res.render('users/views/account', {detail});
  //     }catch (err){
  //         console.log({message: err});
  //     }
  // }
  getAddAccountPage(req, res) {
    const username_existed = req.query["username_existed"] !== undefined;
    const pass_dont_match = req.query["pass_dont_match"] !== undefined;
    const email_existed = req.query["email_existed"] !== undefined;
    res.render("users/views/addAccount", {
      username_existed,
      pass_dont_match,
      email_existed,
    });
  }

  getProfilePage(req, res) {
    const phone_existed = req.query["phone_existed"] !== undefined;
    const email_existed = req.query["email_existed"] !== undefined;
    const wrong_pass = req.query["wrong_pass"] !== undefined;
    const wrong_confirm = req.query["wrong_confirm"] !== undefined;
    const changepass_success = req.query["changepass_success"] !== undefined;
    res.render("users/views/profile", { phone_existed, email_existed, wrong_confirm, wrong_pass,changepass_success });
  }

  // [POST] add new account
  async addAccount(req, res) {
    const check = await service.findByUsername(req.body.username);
    if (check) {
      res.redirect("addAccount?username_existed");
    } else {
      const check_mail = await service.findByEmail(req.body.email);
      if (check_mail) {
        res.redirect("addAccount?email_existed");
      } else {
        if (req.body.password !== req.body.confirmPassword) {
          res.redirect("addAccount?pass_dont_match");
        } else {
          const newAccount = await service.addAccount(req.body);
          res.render("users/views/addAccount", { newAccount });
        }
      }
    }
  }

  async changename(req, res) {
    const newName = req.body.newName;
    await service.changename(newName, req.user._id);
    req.session.passport.user.name = newName;
    res.redirect("/user/profile");
  }

  async changeemail(req, res) {
    const newEmail = req.body.newEmail;
    const check_email = await service.findByEmail(newEmail);
    if (check_email) {
      res.redirect("/user/profile?email_existed");
    } else {
      await service.changeemail(newEmail, req.user._id);
      req.session.passport.user.email = newEmail;
      res.redirect("/user/profile");
    }
  }

  async changeaddress(req, res) {
    const newAddress = req.body.newAddress;
    await service.changeaddress(newAddress, req.user._id);
    req.session.passport.user.address = newAddress;
    res.redirect("/user/profile");
  }

  async changephone(req, res) {
    const newPhone = req.body.newPhone;
    const check_phone = await service.findByPhone(newPhone);
    if (check_phone) {
      res.redirect("/user/profile?phone_existed");
    } else {
      await service.changephone(newPhone, req.user._id);
      req.session.passport.user.phone = newPhone;
      res.redirect("/user/profile");
    }
  }

  async changeavatar(req, res) {
    const newAvatar = await service.changeavatar(req.file, req.user._id);
    req.session.passport.user.avatar = newAvatar;
    res.redirect("/user/profile");
  }

  async banAccount(req, res) {
    const bannedUser = await service.banAccount(req.params.id);
    const previousURL = req.get("referer");
    res.redirect(previousURL);
  }

  async unbanAccount(req, res) {
    const unbanUser = await service.unbanAccount(req.params.id);
    const previousURL = req.get("referer");
    res.redirect(previousURL);
  }

  async changepassword(req, res) {
    const { oldpassword, newpassword, confirmpassword } = req.body;
    if (await service.validPassword(oldpassword, req.user) === null) {
      return res.redirect("/user/profile?wrong_pass");
    } else {
      if (newpassword !== confirmpassword) {
        return res.redirect("/user/profile?wrong_confirm");
      } else {
        await service.changepass(req.user.username, newpassword);
        return res.redirect("/user/profile?changepass_success");
      }
    }
  }
}

module.exports = new UserController;