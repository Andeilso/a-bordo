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
        if (!req.session.user) {
            return res.render("index");
        } else { // user is already logged in
            redirectHome(req, res);
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
        // VERIFY USER
        if (!user || !bcrypt.compareSync(password, user.password)) {
            let error = "Email ou senha inválidos."
            return res.render("index", { error });
        }
        // SET A SESSION
        req.session.user = user;
        // REMEMBER USER
        const oneWeek = 7 * 24 * 3600 * 1000; // 1 week
        if (rememberMe != "undefined") {
            res.cookie("aBordo", user.email, { maxAge: oneWeek });
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
        return res.redirect("/login");
    }
};