const { User, School, Subject, Student, Teacher, Guardian, Class, Course, Student_Guardian, Class_Student, Lesson, Attendance, Evaluation, Student_Evaluation, Repeater } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getTeacherData = async (user) => {

    let subjectsIds = [];
    let classesIds = [];
    let subjects = [];
    let classes = [];
    let classesStudents = [];
    let students = []; // {id, number, name}
    let schools = [];

    const teacher = await Teacher.findOne({ where: { userId: user.id } });
    const courses = await Course.findAll({ where: { teacherId: teacher.id } });

    for (course of courses) {
        subjectsIds.push(course.subjectId);
        classesIds.push(course.classId);
    }
    // SUBJECTS
    for (id of subjectsIds) {
        let subject = await Subject.findOne({ where: { id } });
        subjects.push(subject);
    }
    // CLASSES AND CLASS_STUDENTS
    for (id of classesIds) {
        let c = await Class.findOne({ where: { id } });
        let thisClassStudents = await Class_Student.findAll({ where: { classId: id } });
        classes.push(c);
        classesStudents.push(...thisClassStudents);
    }
    // STUDENTS
    for (student of classesStudents) {
        let thisStudent = await Student.findOne({ where: { id: student.studentId } });
        students.push({
            id: thisStudent.id,
            number: student.number,
            name: thisStudent.name
        });
    }
    // SCHOOLS
    for (c of classes) {
        let school = await School.findOne({ where: { id: c.schoolId } });
        schools.push(school);
    }
    // DATA
    return {
        user,
        subjects,
        classes,
        schools,
        students
    };
}

module.exports = {

    // GET professor/
    // GET professor/home
    renderHome: async (req, res) => {
        // USER IS LOGGED IN
        const user = req.session.user;
        // GET TEACHER'S DATA
        let data = await getTeacherData(user);
        // RENDER PAGE WITH DATA
        return res.render("teacher", data);
    },

    // GET professor/cadastrar
    renderRegistrationForm: async (req, res) => {
        // USER HAS ALREADY SUCCESSFULLY LOGGED IN
        if (req.session.user) {
            return res.redirect("/professor/home");
        } else {
            // RENDER REGISTRATION FORM
            const subjects = await Subject.findAll();
            res.render("teacher/register", { subjects });
        }
    },

    // POST professor/cadastrar
    registerTeacher: async (req, res) => {
        // CREATE USER
        const { forename, surname, email, phone, password } = req.body;

        const picture = req.file ? req.file.filename : "default.jpg";
        const validPhone = phone.length == 15 ? phone : null;

        const user = await User.create(
            {
                forename: forename.toUpperCase(),
                surname: surname.toUpperCase(),
                email: email.toLowerCase(),
                phone: validPhone,
                password: bcrypt.hashSync(password, saltRounds),
                picture
            }
        );
        // MAKE THE USER A TEACHER
        const teacher = await Teacher.create({ userId: user.id });

        // CREATE SCHOOLS
        const reqBodySchool = Object.keys(req.body).filter( // [ "school1", "school2", "school3" ]
            key => key.substr(0, 6) == "school"
        );
        let schoolsList = [];
        for (school of reqBodySchool) { // req.body[ school ] = [ 0=state, 1=municipality, 2=name, 3=passingGrade, 4=academicTerms ]
            schoolsList.push(
                {
                    name: req.body[school][2],
                    passingGrade: req.body[school][3],
                    academicTerms: req.body[school][4],
                    state: req.body[school][0],
                    municipality: req.body[school][1]
                }
            );
        };
        const schools = await School.bulkCreate(schoolsList);

        // CREATE CLASSES
        const reqBodyClass = Object.keys(req.body).filter( // [ "class1-school1", "class2-school1", "class1-school2" ]
            key => key.substr(0, 5) == "class"
        );
        let classesList = [];
        for (let i = 0; i < schools.length; i++) {
            let schoolClasses = reqBodyClass.filter(
                key => key.includes(`school${i + 1}`)
            );
            for (aClass of schoolClasses) { // req.body[ aClass ] = [ 0=year, 1=levelOfEducation-grade, 2=code ]
                let eduLvl = req.body[aClass][1].split("-"); // ex.: [ "Ensino Fundamental ", " 6º ano" ]

                classesList.push(
                    {
                        schoolId: schools[i].id, // ASSOCIATE CLASSES TO A SCHOOL
                        code: req.body[aClass][2],
                        year: req.body[aClass][0],
                        levelOfEducation: eduLvl[0].trim(),
                        grade: eduLvl[1].trim()
                    }
                );
            };
        };
        const classes = await Class.bulkCreate(classesList);

        // CREATE COURSES
        const reqBodySubjects = Object.keys(req.body).filter( // [ "subjects-class1-school1", "subjects-class2-school1", "subjects-class1-school2" ]
            key => key.substr(0, 8) == "subjects"
        );
        let coursesList = [];
        for (let i = 0; i < classes.length; i++) {
            let classSubjects = reqBodySubjects.filter(
                key => key.includes(reqBodyClass[i]) // reqBodyClass = [ "class1-school1", "class2-school1", "class1-school2" ]
            );
            const subjectsIds = req.body[classSubjects]; // array containing the subjects ids of only one class
            for (subjectId of subjectsIds) {

                coursesList.push(
                    {
                        teacherId: teacher.id,
                        subjectId,
                        classId: classes[i].id
                    }
                );
            }
        }
        const courses = await Course.bulkCreate(coursesList);

        // CREATE STUDENTS
        const reqBodyStudent = Object.keys(req.body).filter( // [ "student1-class1-school1", "student2-class1-school1", "student1-class2-school1" ]
            key => key.substr(0, 7) == "student"
        );
        for (let i = 0; i < classes.length; i++) {
            let classStudents = reqBodyStudent.filter(
                key => key.includes(reqBodyClass[i]) // reqBodyClass = [ "class1-school1", "class2-school1", "class1-school2" ]
            );
            for (aStudent of classStudents) { // req.body[ aStudent ] = [ 0=number, 1=name, 2=checkbox_on, 3=retaken_course_subjectId, ... ]

                let newStudent = await Student.create(
                    {
                        name: req.body[aStudent][1].trim().toUpperCase()
                    }
                );

                // ASSOCIATE STUDENT TO CLASS
                await Class_Student.create(
                    {
                        classId: classes[i].id,
                        studentId: newStudent.id,
                        number: req.body[aStudent][0]
                    }
                );

                // CREATE REPEATER
                if (req.body[aStudent][2] == "on") { // checkbox checked

                    let classCourses = courses.filter(
                        course => course.classId == classes[i].id
                    );
                    for (let j = 3; j < aStudent.length; j++) { // from index 3, there's a list of subjects ids the student is repeating

                        for (course of classCourses) {

                            if (course.subjectId == req.body[aStudent][j]) {

                                await Repeater.create(
                                    {
                                        studentId: newStudent.id,
                                        courseId: course.id
                                    }
                                );
                            }
                        }
                    }
                }
            }
        }
        // SET A SESSION FOR THE TEACHER USER
        req.session.user = user;
        // AND REDIRECT HOME
        return res.redirect("/professor/home");
    },

    // GET professor/fazer-chamada
    renderAttendanceSheet: async (req, res) => {
        // USER IS LOGGED IN
        const user = req.session.user;
        // GET TEACHER'S DATAS
        let data = await getTeacherData(user);
        // RENDER PAGE WITH DATA
        return res.render("teacher/take-attendance", data);
    },

    // POST professor/fazer-chamada
    recordAttendances: (req, res) => {

    },

    // GET professor/lancar-notas
    renderGradeBook: async (req, res) => {
        // USER IS LOGGED IN
        const user = req.session.user;
        // GET TEACHER'S DATAS
        let data = await getTeacherData(user);
        // RENDER PAGE WITH DATA
        return res.render("teacher/grade", data);
    },

    // POST professor/lancar-notas
    recordGrades: (req, res) => {

    },

    // GET professor/diario-de-classe
    renderRecordBook: async (req, res) => {
        // USER IS LOGGED IN
        const user = req.session.user;
        // GET TEACHER'S DATAS
        let data = await getTeacherData(user);
        // RENDER PAGE WITH DATA
        return res.render("teacher/records", data);
    },

    // GET professor/atualizar
    renderUpdateForm: async (req, res) => {
        // LOAD USER FROM DB
        // PASS OBJECT USER INTO RENDER METHOD
        return res.render("teacher/update");
    },

    // PUT professor/atualizar
    updateTeacher: async (req, res, next) => {
        // GET REQ.BODY CONTENT
        // AND UPDATE DATA IN DB
        // const result = await User.update({
        //     // DATA TO UPDATE
        // },
        // {
        //     where: {
        //         id
        //     }
        // });
    },

    // DELETE professor/deletar
    deleteTeacher: async (req, res) => {
        // RETRIEVE USER ID,
        // AND DELETE ONLY TEACHER USER TYPE
        // OR DELETE USER FROM DB
        // const result = await User.destroy(
        //     {
        //         where: {

        //         }
        //     }
        // );
    },
};