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

const enter = 13; // keyboard key;

const addSchoolBtn = document.getElementById("add-school");
const delSchoolBtn = document.getElementById("del-school");

let schoolsTabs = document.querySelectorAll("#new-schools .schools-tabs button"); // schools section

let schoolCount = 0; // decreases on school deletion
let schoolNumber = 0; // never decreases

// FUNCTIONS CALLS

// ADD SCHOOL
window.addEventListener("load", () => addSchool());
addSchoolBtn.addEventListener("mouseup", () => addSchool());
addSchoolBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { addSchool(); }
});
// DELETE SCHOOL
delSchoolBtn.addEventListener("mouseup", () => delSchool());
delSchoolBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { delSchool(); }
});


// FUNCTIONS EXPRESSIONS

const addSchool = () => {

    /**** UPDATE VARIABLES ****/

    schoolNumber++;
    schoolCount++;

    /*********************
        NEW SCHOOL TAB
    *********************/

    // REMOVE CLASS SELECTED FROM PREVIOUSLY SELECTED TAB (HTML SCHOOLS SECTION ONLY)
    schoolsTabs.forEach(tab => tab.classList.remove("selected"));

    /**** CREATE ELEMENTS ****/

    // HTML SCHOOLS SECTION TAB
    const schoolTab = document.createElement("button");
    schoolTab.type = "button";
    schoolTab.classList.add(`school${schoolNumber}`, "selected");
    schoolTab.innerText = `Escola ${schoolNumber}`;

    // HTML CLASSES SECTION TAB
    const cSchoolTab = document.createElement("button");
    cSchoolTab.type = "button";
    cSchoolTab.className = `school${schoolNumber}`;
    cSchoolTab.innerText = `Escola ${schoolNumber}`;

    if (schoolsTabs.length == 0) { cSchoolTab.classList.add("selected") }; // the first school tab of the classes section is selected when new school is added

    /**** APPEND ELEMENTS ****/

    // APPEND EACH NEW TAB TO TABS LIST OF CORRESPONDING FORM SECTION
    const tabsList = document.querySelectorAll(".schools-tabs");
    tabsList[0].appendChild(schoolTab); // schools section
    tabsList[1].appendChild(cSchoolTab); // classes section

    /**** LISTEN TO EVENTS ON ELEMENTS ****/

    // LISTEN TO CLICK ON TAB TO SELECT SCHOOL (SCHOOLS SECTION TAB)
    schoolTab.addEventListener("mouseup", () => selectSchool(schoolTab));
    schoolTab.addEventListener("keydown", evt => {
        if (evt.keyCode == enter) { selectSchool(schoolTab); }
    });

    // LISTEN TO CLICK ON TAB TO SELECT THE SCHOOL CLASSES (CLASSES SECTION TAB)
    cSchoolTab.addEventListener("mouseup", () => selectSchoolClasses(cSchoolTab));
    cSchoolTab.addEventListener("keydown", evt => {
        if (evt.keyCode == enter) { selectSchoolClasses(cSchoolTab); }
    });

    /**************************
        NEW SCHOOL CONTENT
    **************************/

    // HIDE PREVIOUSLY SELECTED SCHOOL CONTENT
    const previousSchoolsContents = document.getElementsByClassName("school-content"); // div inside the gray box
    [...previousSchoolsContents].forEach(school => {
        if (!school.hidden) {
            school.hidden = true;
        }
    });

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

    /*************************
        WRAP EVERYTHING UP
    **************************/

    /**** TOGGLE ADD AND DEL BUTTONS ****/

    if (schoolCount > 1) {
        delSchoolBtn.disabled = false;
    }
    if (schoolCount == 5) {
        addSchoolBtn.disabled = true;
    }

    /**** UPDATE TABS LIST ****/

    schoolsTabs = document.querySelectorAll("#new-schools .schools-tabs button");
};

const delSchool = () => {
    // IDENTIFY SCHOOL TO DELETE
    let school;
    schoolsTabs.forEach(tab => {
        const classList = tab.classList;
        [...classList].forEach(c => {
            if (c == "selected") { school = tab; }
        });
    });
    // CONFIRM DELETION
    if (!confirm(`Tem certeza que deseja deletar a ${school.innerText}?`)) { return; }

    schoolCount--;

    /************************
        REMOVE SCHOOL TAB
    ************************/

    // REMOVE TAB BUTTON FROM SCHOOLS TABS
    school.remove(); // in the schools section
    const tabsCSec = document.querySelectorAll("#new-classes .schools-tabs button");
    tabsCSec.forEach(tab => { // in the classes section
        if (tab.innerText == school.innerText) { tab.remove(); }
    });

    //  UPDATE TABS LIST
    schoolsTabs = document.querySelectorAll("#new-schools .schools-tabs button");

    // SELECT TO LAST TAB IN THE LIST
    schoolsTabs[schoolsTabs.length - 1].classList.add("selected");

    // IN THE CLASSES SECTION, SELECT THE FIRST TAB
    tabsCSec[0].classList.add("selected");

    /*****************************************************
        REMOVE SCHOOL CONTENT (FROM SCHOOL SECTION FORM)
    *****************************************************/

    const schoolsContents = document.getElementsByClassName("school-content");
    [...schoolsContents].forEach(school => {
        if (!school.hidden) { school.remove(); }
    });

    // DISPLAY CONTENT OF THE LAST SCHOOL IN THE LIST
    schoolsContents[schoolsContents.length - 1].hidden = false;

    /*********************************
        TOGGLE ADD AND DEL BUTTONS
    *********************************/

    addSchoolBtn.disabled = false;
    if (schoolCount == 1) { delSchoolBtn.disabled = true; }
};

const selectSchool = (tab) => {
    // UNSELECT PREVIOUSLY SELECTED TAB
    schoolsTabs.forEach(tab => tab.classList.remove("selected"));

    // TOGGLE SCHOOLS CONTENTS VISIBILITY
    const schoolsContents = document.getElementsByClassName("school-content");

    [...schoolsContents].forEach(content => {
        content.classList[1] == tab.className ? content.hidden = false : content.hidden = true;
    });

    // ADD SELECTED CLASS CLICKED TAB
    tab.classList.add("selected");
};

const setNeighborSchoolLocationToSelf = (statesSelect, municipalitiesSelect, schoolsSelect, schoolContent) => {
    // LOOK FOR PREVIOUS NEIGHBOR
    let index, neighbor = null;
    const schoolsContents = document.getElementsByClassName("school-content");

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