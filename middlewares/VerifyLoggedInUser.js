module.exports = (req, res, next) => {
    // IF USER SESSION IS NOT SET, REDIRECT TO LOGIN
    if (!req.session.user) {
        let error = "Você não está logado. Por favor, digite seu email e sua senha e clique em ENTRAR. Caso não possua um cadastro, clique em CADASTRAR."
        return res.render("index", { error });
    }
    // IF SESSION IS OK (USER IS ALREADY LOGGED IN), GO AHEAD
    next();
};