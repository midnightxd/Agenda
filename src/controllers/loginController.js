const {async} = require('regenerator-runtime');
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    console.log(req.session.user);
    res.render('login');
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            });
            return;
        }

        req.flash('success', 'Your account was created');
        req.session.save(() => {
            return res.redirect('/login');
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            });
            return;
        }
        
        req.flash('success', 'Login successful');
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/login');
        })
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}
