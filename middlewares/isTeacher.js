const { Teacher } = require("../models");

module.exports = async (req, res, next) => {
    const user = req.session.user;
    const teacher = await Teacher.findOne({ where: { userId: user.id } });

    if (!teacher) {
        return res.send("Acesso negado, porque você não tem cadastro como professor.")
    }
    next();
}