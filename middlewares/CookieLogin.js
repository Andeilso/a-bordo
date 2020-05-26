const { User } = require("../models");

module.exports = async (req, res, next) => {
    if (req.cookies.aBordo != "undefined" && req.session.user == null) {
        const email = req.cookies.aBordo;
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            req.session.user = user;
        }
    }
    next();
}