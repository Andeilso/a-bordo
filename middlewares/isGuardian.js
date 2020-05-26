const { Guardian } = require("../models");

module.exports = async (req, res, next) => {
    const user = req.session.user;
    const guardian = await Guardian.findOne({ where: { userId: user.id } });

    if (!guardian) {
        return res.send("Acesso negado, porque você não tem cadastro como o responsável de nenhum aluno.")
    }
    next();
}