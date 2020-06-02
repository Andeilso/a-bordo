module.exports = (req, res, next) => {
    // IF USER SESSION IS NOT SET, REDIRECT TO LOGIN
    if (!req.session.user) {
        return res.redirect("/login?error=2");
    }
    // IF SESSION IS OK (USER IS ALREADY LOGGED IN), GO AHEAD
    return next();
};