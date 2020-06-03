const { User } = require("../models");

module.exports = async (req, res, next) => {
    if (req.cookies.aBordo && req.session.user == null) {
        const user = await User.findOne({ where: { email: req.cookies.aBordo } });
        if (user) {
            req.session.user = user;
        }
    }
    return next();
}