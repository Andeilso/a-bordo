const { User, School, Subject, Student, Teacher, Guardian, Class, Course, Student_Guardian, Class_Student, Lesson, Attendance, Evaluation, Student_Evaluation, Repeater } = require("../models");
const bcrypt = require('bcrypt');

const redirectHome = async (req, res) => {

    const user = req.session.user;
    const isTeacher = await Teacher.findOne({ where: { userId: user.id } });
    const isGuardian = await Guardian.findOne({ where: { userId: user.id } });

    if (isTeacher && isGuardian) {
        return res.redirect("/professor/home");
    } else if (isTeacher) {
        return res.redirect("/professor/home");
    } else {
        return res.redirect("/responsavel/home");
    }
}

module.exports = {

    // GET /
    // GET /login
    renderLogin: (req, res) => {
        // USER HAS ALREADY SUCCESSFULLY LOGGED IN
        if (req.session.user) {
            return redirectHome(req, res);
        } else {
            // TREAT EVENTUAL ERRORS
            const { error } = req.query;
            let msg;

            if (error == 1) { // from IndexController.login
                msg = "Email ou senha inválidos."
            }
            else if (error == 2) { // from middleware VerifyLoggedInUser
                msg = "Você não está logado. Por favor, digite seu email e sua senha e clique em ENTRAR. Caso não possua um cadastro, clique em CADASTRAR."
            }
            // RENDER LOGIN PAGE
            return res.render("index", { error: msg });
        }
    },

    // POST /login
    login: async (req, res) => {
        const { userType, email, password, rememberMe } = req.body;
        const user = await User.findOne(
            {
                where: { email }
            }
        );
        // VERIFY USER'S EMAIL AND PASSWORD
        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.redirect("/login?error=1");
        }
        // SET A SESSION
        req.session.user = user;
        // REMEMBER USER
        const oneWeek = 7 * 24 * 3600 * 1000; // 1 week
        if (rememberMe != undefined) {
            res.cookie("aBordo", email, { maxAge: oneWeek });
        }
        // MANAGE REDIRECTIONS
        const isTeacher = await Teacher.findOne({ where: { userId: user.id } });
        const isGuardian = await Guardian.findOne({ where: { userId: user.id } });

        if (isTeacher && isGuardian) {
            return res.redirect(`/${userType}/home`);
        } else if (isTeacher) {
            return res.redirect(`/professor/home`);
        } else {
            return res.redirect(`/responsavel/home`);
        }
    },

    // GET /cadastrar
    register: async (req, res) => {
        if (!req.session.user) {
            return res.redirect(`/${req.query.usuario}/cadastrar`);
        } else { // user is already logged in
            redirectHome(req, res);
        }
    },

    // GET /logout
    logout: (req, res) => {
        req.session.user = null;
        res.cookie("aBordo", undefined);
        return res.redirect("/login");
    }
};