// FILE UPLOAD
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// ROUTER
const express = require('express');
const router = express.Router();
// CONTROLLER
const GuardianController = require("../controllers/GuardianController");
// MIDDLEWARES
const ValidateNewUser = require("../middlewares/ValidateNewUser");
const VerifyLoggedInUser = require("../middlewares/VerifyLoggedInUser");
const isGuardian = require("../middlewares/isGuardian");
/*****************************************************************************/
/***********************--------CRUD--------**********************************/
/*****************************************************************************/
router.get("/cadastrar", GuardianController.renderRegistrationForm)
router.post("/cadastrar", upload.single("picture"), ValidateNewUser, GuardianController.registerGuardian);
/*****************************************************************************/
router.use(VerifyLoggedInUser);
router.use(isGuardian);
/*****************************************************************************/
router.get("/", GuardianController.renderHome);
router.get("/home", GuardianController.renderHome);
/*****************************************************************************/
router.get("/atualizar", GuardianController.renderUpdateForm);
router.put("/atualizar", upload.single("picture"), GuardianController.updateGuardian);
/*****************************************************************************/
router.delete("/deletar", GuardianController.deleteGuardian);
/*****************************************************************************/
/*****************************************************************************/
// EXPORT
module.exports = router;