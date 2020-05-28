const { User, Subject } = require("../models");

module.exports = async (req, res, next) => {

    const { email, phone, password } = req.body;

    let errors = [];
    let regex;

    // CHECK IF IT'S INDEED A NEW USER
    const invalidEmail = await User.findOne({ where: { email } });
    if (invalidEmail) {
        errors.push(`O email ${email} já está cadastrado.`);
    }

    // CHECK EMAIL FORMAT
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(email).toLowerCase())) {
        errors.push("Digite um email válido.");
    }
    // CHECK PHONE LENGTH
    if (phone.length > 5 && phone.length < 15) {
        errors.push(`O número de telefone está incompleto.`);
    }
    // VALIDATE PASSWORD
    if (password.length < 8) {
        errors.push("A senha deve conter pelo menos 8 caracteres.");
    }
    regex = /[0-9]/;
    if (!regex.test(password)) {
        errors.push("A senha deve conter pelo menos 1 dígito.");
    }
    regex = /[a-z]/;
    if (!regex.test(password)) {
        errors.push("A senha deve conter pelo menos 1 letra minúscula.");
    }
    regex = /[A-Z]/;
    if (!regex.test(password)) {
        errors.push("A senha deve conter pelo menos 1 letra maiúscula.");
    }
    regex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?@,.\/]/;
    if (!regex.test(password)) {
        errors.push("A senha deve conter pelo menos 1 caractere especial válido.");
    }

    // THROW EVENTUAL ERRORS
    if (errors.length > 0) {
        const subjects = await Subject.findAll();
        console.log(subjects);
        return res.render("guardian/register", { errors, subjects });
    }

    next();
}