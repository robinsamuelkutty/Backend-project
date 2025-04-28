var express = require('express');
var router = express.Router();
var productHelper = require("../helpers/product-helpers");
const userHelpers = require("../helpers/user-helpers");  

/* GET home page. */
router.get('/', function(req, res, next) {
 
  productHelper.getAllProducts().then((products) => {
    let user = req.session.user
    res.render("user/view-products", { customer: true, products });
  });
});
router.get('/login', function (req, res, next) {
  // console.log(req.session)
  if (req.session.user) {
    res.redirect('/')


  } else {
    res.render("user/login", { login: true ,loginErr:req.session.userLoginErr})
    req.session.userLoginErr=false
  }



});
router.get('/signup',(req,res)=>{
  res.render("user/signup",{ login: true });
});
router.post('/signup', function (req, res, next) {
  

  userHelpers.doSignup(req.body).then((response) => {
   
    req.session.user=response
    req.session.user.loggedIn=true
    
    res.redirect('/')
    console.log(response);

  })

});
router.post('/login', function (req, res) {

  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      // ulala=true
      req.session.user.loggedIn = true
      req.session.user = response.user
      
      
      res.redirect("/")
    } else {
      
      res.redirect('/login')
      // res.render("user/user-login", { login: true ,loggedIn:false})
    }
    console.log(response)
  })

});
router.get('/logout',(res,req)=>{
   req.session.destroy()
   res.render('/')
})


module.exports = router;



