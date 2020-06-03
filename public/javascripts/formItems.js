/*
    TEACHER'S REGISTER FORM LAYOUT:
    (SCHOOLS SECTION - SS)
     ----------------------- --- ---
    |   SCHOOLS TABS        | + | - |
     ----------------------- --- ---
    |   SELECTED SCHOOL CONTENT     |
     -------------------------------
    (CLASSES SECTION - CS)
     -------------------
    |   SCHOOLS TABS    |
     ----------------------- --- ---
    |   CLASSES TABS        | + | - |
     ----------------------- --- ---
    |   SELECTED CLASS CONTENT      |
     -------------------------------
*/

// VARIABLES/CONSTANTS

let schoolCount = 0; // decreases on school deletion; sole purpose: (in)activate add/del btns
let schoolNumber = 0; // never decreases
let classNumber = 0;
const maxClassesPerSchool = 10;
// BUTTONS
const enter = 13; // keyboard key;
const addSchoolBtn = document.getElementById("add-school");
const delSchoolBtn = document.getElementById("del-school");
const addClassBtn = document.getElementById("add-class");
const delClassBtn = document.getElementById("del-class");
// TABS BUTTONS
let schoolsTabs = document.querySelectorAll("#new-schools .schools-tabs button"); // array of tabs in schools section
let cSchoolsTabs = document.querySelectorAll("#new-classes .schools-tabs button"); // array of schools tabs in classes section
let classesTabs = document.querySelectorAll("#new-classes #classes-tabs button");
// CONTENTS
const schoolsContents = document.getElementsByClassName("school-content"); // HTML collection of divs appended to gray box
const classSchool = document.getElementById("class-school");

// FUNCTIONS CALLS

// ADD SCHOOL (it also adds one class)
window.addEventListener("load", () => addSchool());
addSchoolBtn.addEventListener("mouseup", () => addSchool());
addSchoolBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { addSchool(); }
});
// ADD CLASSES
addClassBtn.addEventListener("mouseup", () => addClass());
addClassBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { addClass(); }
});
// DELETE SCHOOL (it also deletes all classes of deleted school)
delSchoolBtn.addEventListener("mouseup", () => delSchool());
delSchoolBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { delSchool(); }
});
// DELETE CLASSES
delClassBtn.addEventListener("mouseup", () => delClass());
delClassBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { delClass(); }
});


// FUNCTIONS EXPRESSIONS

/*************
    SCHOOLS
*************/

const addSchool = () => {

    /**** UPDATE VARIABLES ****/

    schoolCount++;
    schoolNumber++;
    classNumber++; // one class is added too

    /**** TOGGLE ADD AND DEL BUTTONS ****/

    if (schoolCount == 5) { addSchoolBtn.disabled = true; }
    if (schoolCount > 1) { delSchoolBtn.disabled = false; }

    /***************
        NEW TABS
    ***************/

    // UNSELECT PREVIOUSLY SELECTED TAB
    schoolsTabs.forEach(tab => tab.classList.remove("selected"));

    /**** CREATE ELEMENTS ****/

    // SCHOOL TAB
    const schoolTab = document.createElement("button");
    schoolTab.type = "button";
    schoolTab.classList.add(`school${schoolNumber}`, "selected"); // select newly create school
    schoolTab.innerText = `Escola ${schoolNumber}`;

    // CLASSES SCHOOL TAB
    const cSchoolTab = document.createElement("button");
    cSchoolTab.type = "button";
    cSchoolTab.className = `school${schoolNumber}`;
    cSchoolTab.innerText = `Escola ${schoolNumber}`;
    if (schoolsTabs.length == 0) { cSchoolTab.classList.add("selected"); } // select the first listed school in the classes section

    // CLASS TAB
    const classTab = document.createElement("button");
    classTab.type = "button";
    classTab.className = `school${schoolNumber}`;
    classTab.id = `class${classNumber}`;
    classTab.innerText = "Turma 1";

    if (cSchoolTab.classList.contains("selected")) {

        classSchool.innerText = `Escola ${schoolNumber}`; // school identifier above the class content

        classTab.classList.add("selected"); // select the first class tab of the first listed school
        classTab.hidden = false;
    } else { classTab.hidden = true; } // hide class if it's not from first listed school

    /**** APPEND ELEMENTS ****/

    // APPEND EACH NEW TAB TO TABS LIST OF CORRESPONDING FORM SECTION
    let tabsList = document.querySelectorAll(".schools-tabs"); //////////////////////////////////////
    tabsList[0].appendChild(schoolTab); // schools section
    tabsList[1].appendChild(cSchoolTab); // classes section

    tabsList = document.querySelectorAll("#classes-tabs");
    tabsList[0].appendChild(classTab); // classes section

    /**** LISTEN TO EVENTS ON ELEMENTS ****/

    // LISTEN TO CLICK ON THE SCHOOL TAB
    schoolTab.addEventListener("mouseup", () => selectSchool(schoolTab));
    schoolTab.addEventListener("keydown", evt => {
        if (evt.keyCode == enter) { selectSchool(schoolTab); }
    });

    // LISTEN TO CLICK ON SCHOOL TAB (CLASSES SECTION)
    cSchoolTab.addEventListener("mouseup", () => selectClassesSchool(cSchoolTab));
    cSchoolTab.addEventListener("keydown", evt => {
        if (evt.keyCode == enter) { selectClassesSchool(cSchoolTab); }
    });

    // LISTEN TO CLICK ON CLASS TAB
    classTab.addEventListener("mouseup", () => selectClass(classTab));
    classTab.addEventListener("keydown", evt => {
        if (evt.keyCode == enter) { selectClass(classTab); }
    });

    /**** UPDATE TABS LISTS ****/

    schoolsTabs = document.querySelectorAll("#new-schools .schools-tabs button");
    cSchoolsTabs = document.querySelectorAll("#new-classes .schools-tabs button");
    classesTabs = document.querySelectorAll("#new-classes #classes-tabs button");

    /**************************
        NEW SCHOOL CONTENT
    **************************/

    // HIDE PREVIOUSLY SELECTED SCHOOL CONTENT
    [...schoolsContents].forEach(content => content.hidden = true);

    /**** CREATE ELEMENTS ****/

    // NEW CONTENT DIV
    const schoolContent = document.createElement("div");
    schoolContent.classList.add("school-content", `school${schoolNumber}`);

    // CREATE SCHOOL LOCATION TO APPEND STATE AND MUNICIPALITY SELECTS
    const schoolLocation = document.createElement("div");
    schoolLocation.className = "school-location";

    // CREATE STATE SELECT
    const state = document.createElement("select");
    state.name = `school${schoolNumber}[]`;
    state.id = `state-school${schoolNumber}`;
    state.required = true;

    const stateOption = document.createElement("option");
    stateOption.disabled = true;
    stateOption.selected = true;
    stateOption.innerText = "UF";

    // MUNICIPALITY SELECT
    const municipality = document.createElement("select");
    municipality.name = `school${schoolNumber}[]`;
    municipality.id = `municipality-school${schoolNumber}`;
    municipality.required = true;
    municipality.disabled = true;

    const municipalityOption = document.createElement("option");
    municipalityOption.disabled = true;
    municipalityOption.selected = true;
    municipalityOption.innerText = "Município";

    // SCHOOL'S NAME SELECT
    const school = document.createElement("select");
    school.name = `school${schoolNumber}[]`;
    school.id = `school${schoolNumber}`;
    school.required = true;
    school.disabled = true;

    const schoolOption = document.createElement("option");
    schoolOption.disabled = true;
    schoolOption.selected = true;
    schoolOption.innerText = "Nome da escola";

    // PASS GRADE SELECT
    const passGrade = document.createElement("select");
    passGrade.name = `school${schoolNumber}[]`;
    passGrade.required = true;
    passGrade.disabled = true;

    const passGradeOption = document.createElement("option");
    passGradeOption.disabled = true;
    passGradeOption.selected = true;
    passGradeOption.innerText = "Média para aprovação";

    const scaleTenOption = document.createElement("option");
    scaleTenOption.disabled = true;
    scaleTenOption.innerText = "Escala de 0 a 10 pontos";

    const five = document.createElement("option");
    five.value = 5;
    five.innerText = "5,0 pontos";
    const six = document.createElement("option");
    six.value = 6;
    six.innerText = "6,0 pontos";
    const seven = document.createElement("option");
    seven.value = 7;
    seven.innerText = "7,0 pontos";

    const scaleHundredOption = document.createElement("option");
    scaleHundredOption.disabled = true;
    scaleHundredOption.innerText = "Escala de 0 a 100 pontos";

    const fifty = document.createElement("option");
    fifty.value = 50;
    fifty.innerText = "50 pontos";
    const sixty = document.createElement("option");
    sixty.value = 60;
    sixty.innerText = "60 pontos";
    const seventy = document.createElement("option");
    seventy.value = 70;
    seventy.innerText = "70 pontos";

    // ACADEMIC YEAR DIVISIONS
    const evaluationSystem = document.createElement("p");
    evaluationSystem.innerHTML = 'Sistema de avaliação: <span id="term"></span>'

    const bimonthly = document.createElement("label");
    bimonthly.classList.add("btn-appearance", "disabled");
    bimonthly.id = "bimonthly";
    bimonthly.innerHTML = `Bimestral <input type="radio" name="school${schoolNumber}[]" value="4" required />`
    bimonthly.childNodes[1].disabled = true;

    const trimonthly = document.createElement("label");
    trimonthly.classList.add("btn-appearance", "disabled");
    trimonthly.id = "trimonthly";
    trimonthly.innerHTML = `Trimestral <input type="radio" name="school${schoolNumber}[]" value="3" required />`
    trimonthly.childNodes[1].disabled = true;

    /**** APPEND ELEMENTS ****/

    const schoolsGrayBox = document.querySelector("#set-schools .gray-box");
    schoolsGrayBox.appendChild(schoolContent);
    schoolContent.appendChild(schoolLocation);
    schoolContent.appendChild(school);
    schoolContent.appendChild(passGrade);
    schoolContent.appendChild(evaluationSystem);
    schoolContent.appendChild(bimonthly);
    schoolContent.appendChild(trimonthly);

    schoolLocation.appendChild(state);
    schoolLocation.appendChild(municipality);
    school.appendChild(schoolOption);
    passGrade.appendChild(passGradeOption);
    passGrade.appendChild(scaleTenOption);
    passGrade.appendChild(five);
    passGrade.appendChild(six);
    passGrade.appendChild(seven);
    passGrade.appendChild(scaleHundredOption);
    passGrade.appendChild(fifty);
    passGrade.appendChild(sixty);
    passGrade.appendChild(seventy);

    state.appendChild(stateOption);
    municipality.appendChild(municipalityOption);

    /**** CALL OTHER FUNCTIONS / LISTEN TO EVENTS ON ELEMENTS ****/

    // POPULATE SELECTS THROUGH API
    populateStatesSelect(state); // states select
    state.addEventListener("change", () => populateMunicipalitiesSelect(municipality, state)); // municipalities select
    municipality.addEventListener("change", () => populateSchoolsSelect(school, municipality)); // schools select

    // ADD NEIGHBOR SCHOOL'S LOCATION TO THIS SCHOOL
    setTimeout(() => { // wait for populateStatesSelect() response
        setNeighborSchoolLocationToSelf(state, municipality, school, schoolContent)
    }, 100);

    // ENABLE PASS GRADE SELECT, AND CHANGE THE TAB'S TEXT TO DISPLAY THE SCHOOL'S NAME
    school.addEventListener("change", () => {
        enablePassGradeSelect(passGrade), changeTabText(schoolTab, cSchoolTab, school)
    });

    // ENABLE OPTIONS OF ACADEMIC YEAR DIVISION (RADIO INPUTS)
    passGrade.addEventListener("change", () => enableYearDivisionOptions(bimonthly, trimonthly));

    // LISTEN TO ACADEMIC YEAR DIVISIONS
    bimonthly.addEventListener("click", () => toggleYearDivision(evaluationSystem, bimonthly, trimonthly));
    trimonthly.addEventListener("click", () => toggleYearDivision(evaluationSystem, trimonthly, bimonthly));
};

const delSchool = () => {
    // IDENTIFY SCHOOL TO DELETE
    let school;
    schoolsTabs.forEach(tab => {
        if (tab.classList.contains("selected")) { school = tab; }
    });
    // CONFIRM DELETION
    if (!confirm(`Tem certeza que deseja deletar a ${school.innerText}?`)) { return; }

    schoolCount--;

    // TOGGLE ADD AND DEL BUTTONS
    addSchoolBtn.disabled = false;
    if (schoolCount == 1) { delSchoolBtn.disabled = true; }

    /******************
        REMOVE TABS
    ******************/

    // UNSELECT SCHOOL
    school.classList.remove("selected");

    // REMOVE SCHOOL TABS
    school.remove(); // schools section
    cSchoolsTabs.forEach(tab => { // classes section
        if (tab.classList.contains(school.className)) { tab.remove(); }
        else { tab.classList.remove("selected"); } // only the first remaining one shall be selected
    });
    // REMOVE CLASSES TABS
    classesTabs.forEach(tab => {
        if (tab.classList.contains(school.className)) { tab.remove(); }
        else { tab.classList.remove("selected"); }  // only the first remaining one shall be selected
    });

    //  UPDATE TABS LISTS
    schoolsTabs = document.querySelectorAll("#new-schools .schools-tabs button");
    cSchoolsTabs = document.querySelectorAll("#new-classes .schools-tabs button");
    classesTabs = document.querySelectorAll("#new-classes #classes-tabs button");

    /**** SELECT ONE OF THE REMAINING SCHOOLS/CLASSES ****/

    // SELECT LAST SCHOOL IN THE LIST
    schoolsTabs[schoolsTabs.length - 1].classList.add("selected");
    // IN THE CLASSES SECTION, SELECT THE FIRST SCHOOL
    cSchoolsTabs[0].classList.add("selected");
    // SELECT THE FIRST CLASS OF THE FIRST SCHOOL
    classesTabs[0].classList.add("selected");

    /**** TOGGLE CLASSES TABS VISIBILITIES ****/

    // DISPLAY SELECTED SCHOOL'S CLASSES' TABS
    classesTabs.forEach(tab => {
        tab.classList.contains(cSchoolsTabs[0].classList[0]) ? tab.hidden = false : tab.hidden = true;
    });

    /****  DISPLAY SCHOOL IDENTIFIER (NAME OR NUMBER) BEFORE ITS CLASSES CONTENTS ****/

    classSchool.innerText = cSchoolsTabs[0].innerText;

    /******************************************************
        REMOVE SCHOOL CONTENT (FROM SCHOOL SECTION FORM)
    ******************************************************/

    [...schoolsContents].forEach(content => {
        if (!content.hidden) { content.remove(); }
    });

    // DISPLAY CONTENT OF THE LAST SCHOOL IN THE LIST
    schoolsContents[schoolsContents.length - 1].hidden = false;
};

const selectSchool = (schoolTab) => {
    // UNSELECT PREVIOUSLY SELECTED TAB
    schoolsTabs.forEach(tab => tab.classList.remove("selected"));

    // TOGGLE SCHOOLS CONTENTS VISIBILITY
    [...schoolsContents].forEach(content => {
        content.classList.contains(schoolTab.className) ? content.hidden = false : content.hidden = true;
    });

    // SELECT CLICKED SCHOOL
    schoolTab.classList.add("selected");
};

const setNeighborSchoolLocationToSelf = (statesSelect, municipalitiesSelect, schoolsSelect, schoolContent) => {
    // LOOK FOR PREVIOUS NEIGHBOR
    let index, neighbor = null;

    for (let i = 0; i < schoolsContents.length; i++) {
        if (schoolsContents[i] == schoolContent) { index = i; } // found own index
    }
    if (index > 0) { neighbor = schoolsContents[index - 1]; } // there is a previously created school
    if (!neighbor) { return; }

    // GET NEIGHBOR'S LOCATION CONTENT
    const location = neighbor.childNodes[0];
    const state = location.childNodes[0]; // neighbor's statesSelect
    const municipality = location.childNodes[1]; // neighbor's municipalitiesSelect

    /**************************************
        ADD STATE FROM NEIGHBOR TO SELF
    **************************************/

    let selectedIndex = state.selectedIndex;
    const selectedState = state.options[selectedIndex]; // neighbor's selected option
    const selectableState = statesSelect.options[selectedIndex]; // option in statesSelect

    if (selectedState &&
        !selectedState.disabled &&
        selectableState
    ) {
        selectableState.selected = true;
        populateMunicipalitiesSelect(municipalitiesSelect, statesSelect);
    }

    /*********************************************
        ADD MUNICIPALITY FROM NEIGHBOR TO SELF
    *********************************************/

    setTimeout(() => { // wait for populateMunicipalitiesSelect() response
        selectedIndex = municipality.selectedIndex;
        const selectedMunicipality = municipality.options[selectedIndex]; // neighbor's selected option
        const selectableMunicipality = municipalitiesSelect.options[selectedIndex]; // option in municipalitiesSelect

        if (selectedMunicipality &&
            !selectedMunicipality.disabled &&
            selectableMunicipality
        ) {
            selectableMunicipality.selected = true;
            populateSchoolsSelect(schoolsSelect, municipalitiesSelect);
        }
    }, 500);
};

const enablePassGradeSelect = passGradesSelect => passGradesSelect.disabled = false;

const changeTabText = (tab, cSchoolTab, select) => {

    const selected = select.options[select.selectedIndex];

    tab.innerText = selected.innerText;
    cSchoolTab.innerText = selected.innerText;
    if (cSchoolTab.classList.contains("selected")) {
        classSchool.innerText = selected.innerText;
    }
};

const enableYearDivisionOptions = (label1, label2) => {
    if (label1.childNodes[1].disabled) {
        label1.classList.remove("disabled");
        label1.childNodes[1].disabled = false;
        label2.classList.remove("disabled");
        label2.childNodes[1].disabled = false;
    }
};

const toggleYearDivision = (title, yearDivision, alternative) => {
    yearDivision.classList.add("selected");
    alternative.classList.remove("selected");

    title.childNodes[1].innerText = yearDivision.innerText; // add text to span element
};

// APIs

const populateStatesSelect = (statesSelect) => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            states.forEach(state => {

                const option = document.createElement("option");
                option.value = state.sigla;
                option.textContent = state.nome;

                statesSelect.appendChild(option);
            })
        })
        .catch(error => {
            console.log(error);
        });
};

const populateMunicipalitiesSelect = (municipalitiesSelect, statesSelect) => {

    [...municipalitiesSelect.options].map(option => option.remove()); // remove other state's municipalities

    const selectedState = statesSelect.options[statesSelect.selectedIndex].value;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = `http://educacao.dadosabertosbr.com/api/cidades/${selectedState}`;

    fetch(proxyUrl + targetUrl)
        .then(res => res.json())
        .then(municipalities => {

            municipalities.forEach(municipality => {
                const name = municipality.split(":")[1];

                const option = document.createElement("option");
                option.value = municipality;
                option.textContent = name;

                municipalitiesSelect.appendChild(option);
            });
            const option = document.createElement("option");
            option.textContent = "Município";
            option.selected = "selected";
            option.disabled = "disabled";

            municipalitiesSelect.prepend(option);
            municipalitiesSelect.disabled = false;
        })
        .catch(error => {
            console.log(error);
        });
};

const populateSchoolsSelect = (schoolsSelect, municipalitiesSelect) => {

    [...schoolsSelect.options].map(option => option.remove()); // remove other municipality's schools

    const selectedMunicipality = municipalitiesSelect.options[municipalitiesSelect.selectedIndex].value;
    const code = selectedMunicipality.split(":")[0];

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = `http://educacao.dadosabertosbr.com/api/escolas/buscaavancada?cidade=${code}`;

    fetch(proxyUrl + targetUrl)
        .then(res => res.json())
        .then(schools => {

            schools[1].forEach(school => {

                const option = document.createElement("option");
                option.value = school.nome;
                option.textContent = school.nome;

                schoolsSelect.appendChild(option);
            });
            const option = document.createElement("option");
            option.textContent = "Nome da escola";
            option.selected = "selected";
            option.disabled = "disabled";

            schoolsSelect.prepend(option);
            schoolsSelect.disabled = false;
        })
        .catch(error => {
            console.log(error);
        });
};

/*************
    CLASSES
*************/

const selectClassesSchool = (schoolTab) => {
    // UNSELECT SELECTED TABS
    cSchoolsTabs.forEach(sTab => sTab.classList.remove("selected"));
    classesTabs.forEach(cTab => cTab.classList.remove("selected"));

    let schoolClasses = [];
    classesTabs.forEach(cTab => {
        if (cTab.className == schoolTab.className) {
            classSchool.innerText = schoolTab.innerText; // school name/number before its classes contents
            schoolClasses.push(cTab);

            // TOGGLE CLASSES' TABS VISIBILITIES
            cTab.hidden = false;
        } else { cTab.hidden = true; } // hide classes that don't belong to selected school
    });

    // SELECT THE FIRST CLASS OF SELECTED SCHOOL
    schoolClasses[0].classList.add("selected"); // select the first class of the selected school
    // selectClass(cTab); ???????????????????????? MAY BE HANDY WHEN WOKING WITH THE CONTENTS

    // CLASS COUNT
    let classCount = schoolClasses.length;

    // TOGGLE ADD AND DEL BUTTONS
    classCount < maxClassesPerSchool ? addClassBtn.disabled = false : addClassBtn.disabled = true;
    classCount == 1 ? delClassBtn.disabled = true : delClassBtn.disabled = false;

    // SELECT CLICKED SCHOOL TAB
    schoolTab.classList.add("selected");
}

const addClass = () => {

    classNumber++;

    /**** IDENTIFY SELECTED SCHOOL TAB ****/

    let school;
    cSchoolsTabs.forEach(tab => {
        if (tab.classList.contains("selected")) { school = tab; }
    });
    // UNSELECT SCHOOL
    school.classList.remove("selected");
    // UNSELECT PREVIOUSLY SELECTED CLASS
    classesTabs.forEach(tab => tab.classList.remove("selected"));

    /**** GET THE NUMBER OF CLASSES BELONGING TO SELECTED SCHOOL ****/

    let classCount = 1; // a class has already been created with the school
    classesTabs.forEach(tab => {
        if (tab.classList.contains(school.className)) { classCount++; }
    });

    /**** TOGGLE ADD AND DEL BUTTONS ****/

    if (classCount == maxClassesPerSchool) { addClassBtn.disabled = true; }
    delClassBtn.disabled = false;

    /*********************
        NEW CLASS TAB
    *********************/

    /**** CREATE ELEMENT ****/

    const classTab = document.createElement("button");
    classTab.type = "button";
    classTab.classList.add(school.className, "selected");
    classTab.id = `class${classNumber}`;
    classTab.innerText = `Turma ${classCount}`;

    /**** APPEND ELEMENT ****/

    const tabsList = document.querySelector("#classes-tabs"); /////////////////////////
    tabsList.appendChild(classTab);

    /**** LISTEN TO EVENT ON ELEMENT ****/

    classTab.addEventListener("mouseup", () => selectClass(classTab));
    classTab.addEventListener("keydown", evt => {
        if (evt.keyCode == enter) { selectClass(classTab); }
    });

    /**** UPDATE TABS LIST ****/

    classesTabs = document.querySelectorAll("#new-classes #classes-tabs button");

    /***********************
        NEW CLASS CONTENT
    ***********************/

    // CREATE NEW CONTENT HERE /////////////////////////////////

    /************************
        WRAP EVERYTHING UP
    ************************/

    // SELECT SCHOOL
    school.classList.add("selected"); // it's at the end because school.className is added to new elements
};

const delClass = () => {
    // IDENTIFY CLASS TO DELETE
    let delClass;
    classesTabs.forEach(tab => {
        if (tab.classList.contains("selected")) { delClass = tab; }
    });

    // CONFIRM DELETION
    if (!confirm(`Tem certeza que deseja deletar a ${delClass.innerText}?`)) { return; }

    /******************
        REMOVE TABS
    ******************/

    delClass.remove();
    //  UPDATE TABS LISTS
    classesTabs = document.querySelectorAll("#new-classes #classes-tabs button");

    /**** IDENTIFY SELECTED SCHOOL TAB ****/

    let school;
    cSchoolsTabs.forEach(tab => {
        if (tab.classList.contains("selected")) { school = tab; }
    });
    // UNSELECT SCHOOL
    school.classList.remove("selected");

    // SELECT LAST CLASS IN THE LIST
    let schoolClasses = [];
    classesTabs.forEach(tab => {
        if (tab.classList.contains(school.className)) {
            schoolClasses.push(tab);
        }
    });
    school.classList.add("selected");
    schoolClasses[schoolClasses.length - 1].classList.add("selected");

    let classCount = schoolClasses.length; // to toggle add/del btns

    // TOGGLE ADD AND DEL BUTTONS
    addClassBtn.disabled = false
    classCount == 1 ? delClassBtn.disabled = true : delClassBtn.disabled = false;

    /******************************************************
        REMOVE CLASS CONTENT
    ******************************************************/

    // [...schoolsContents].forEach(content => {
    //     if (!content.hidden) { content.remove(); }
    // });

    // // DISPLAY CONTENT OF THE LAST SCHOOL IN THE LIST
    // schoolsContents[schoolsContents.length - 1].hidden = false;
};

const selectClass = (tab) => {
    // UNSELECT PREVIOUSLY SELECTED TAB
    classesTabs.forEach(tab => tab.classList.remove("selected"));

    // TOGGLE CLASSES CONTENTS VISIBILITY
    // [...classesContents].forEach(content => {
    //     content.classList.contains(tab.className) ? content.hidden = false : content.hidden = true;
    // });

    // SELECT CLICKED CLASS
    tab.classList.add("selected");
};







const checkboxes = document.getElementsByClassName("checkbox");

[...checkboxes].forEach(checkbox => {
    checkbox.addEventListener("change", () => showCourseRetakeList(checkbox));
});

const showCourseRetakeList = (checkbox) => {

    const hiddenElementId = checkbox.dataset.tdId;
    const repeatCourses = document.getElementById(hiddenElementId);

    checkbox.checked ? repeatCourses.hidden = false : repeatCourses.hidden = true;

};