const addChildBtn = document.getElementById("add-child");
const delChildBtn = document.getElementById("del-child");
const enter = 13; // keyboard key;

let childTabs = document.querySelectorAll("#new-child .child-tabs button");
let childCount = 0;
let childNumber = 0; 

// ADD CHILD
window.addEventListener("load", () => addChild());
addChildBtn.addEventListener("mouseup", () => addChild());
addChildBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { addChild(); }
});

// DELETE CHILD
delChildBtn.addEventListener("mouseup", () => delChild());
delChildBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { delChild(); }
});

// FUNCTIONS EXPRESSIONS

const addChild = () => {
    childNumber++;
    childCount++;

    /*********************
        NEW CHILD TAB
    *********************/

    // REMOVE CLASS SELECTED FROM PREVIOUSLY SELECTED TAB (HTML CHILD SECTION ONLY)
    childTabs.forEach(tab => tab.classList.remove("selected"));

    /**** CREATE ELEMENTS ****/

    // HTML CHILD SECTION TAB
    const childTab = document.createElement("button");
    childTab.type = "button";
    childTab.classList.add(`child${childNumber}`, "selected");
    childTab.innerText = `Filho ${childNumber}`;

    /**** APPEND ELEMENTS ****/

    // APPEND EACH NEW TAB TO TABS LIST OF CORRESPONDING FORM SECTION
    const tabsList = document.querySelectorAll(".child-tabs");
    tabsList[0].appendChild(childTab); // child section

    /**** LISTEN TO EVENTS ON ELEMENTS ****/

    // LISTEN TO CLICK ON TAB TO SELECT SCHOOL (SCHOOLS SECTION TAB)
    childTab.addEventListener("mouseup", () => selectChild(childTab));
    childTab.addEventListener("keydown", evt => {
        if (evt.keyCode == enter) { selectChild(childTab); }
    });

    /**************************
        NEW CHILD CONTENT
    **************************/

    // HIDE PREVIOUSLY SELECTED CHILD CONTENT
    const previousChildContents = document.getElementsByClassName("child-content"); // div inside the gray box
    [...previousChildContents].forEach(child => {
        if (!child.hidden) {
            child.hidden = true;
        }
    });

    /**** CREATE ELEMENTS ****/

    // NEW CONTENT DIV
    const childContent = document.createElement("div");
    childContent.classList.add("child-content", `school${childNumber}`);

    // CREATE SCHOOL LOCATION TO APPEND STATE AND MUNICIPALITY SELECTS
    const schoolLocation = document.createElement("div");
    schoolLocation.className = "school-location";

    // CREATE STATE SELECT
    const state = document.createElement("select");
    state.name = `school${childNumber}[]`;
    state.id = `state-school${childNumber}`;
    state.required = true;

    const stateOption = document.createElement("option");
    stateOption.disabled = true;
    stateOption.selected = true;
    stateOption.innerText = "UF";

    // MUNICIPALITY SELECT
    const municipality = document.createElement("select");
    municipality.name = `school${childNumber}[]`;
    municipality.id = `municipality-school${childNumber}`;
    municipality.required = true;
    municipality.disabled = true;

    const municipalityOption = document.createElement("option");
    municipalityOption.disabled = true;
    municipalityOption.selected = true;
    municipalityOption.innerText = "Município";

    // SCHOOL'S NAME SELECT
    const school = document.createElement("select");
    school.name = `school${childNumber}[]`;
    school.id = `school${childNumber}`;
    school.required = true;
    school.disabled = true;

    const schoolOption = document.createElement("option");
    schoolOption.disabled = true;
    schoolOption.selected = true;
    schoolOption.innerText = "Nome da escola";

    // CLASS NAME SELECT
    const classes = document.createElement("select");
    classes.name = '';
    classes.required = true;
    classes.disabled = true;

    const classOption = document.createElement("option");
    classOption.disabled = true;
    classOption.selected = true;
    classOption.innerText = "Turma";

    // STUDENT NAME SELECT
    const student = document.createElement("select");
    student.name = '';
    student.required = true;
    student.disabled = true;

    const studentOption = document.createElement("option");
    studentOption.disabled = true;
    studentOption.selected = true;
    studentOption.innerText = "Nome do aluno";

    /**** APPEND ELEMENTS ****/

    const childGrayBox = document.querySelector("#set-child .gray-box");
    childGrayBox.appendChild(childContent);
    childContent.appendChild(schoolLocation);
    childContent.appendChild(school);
    childContent.appendChild(classes);
    childContent.appendChild(student);

    schoolLocation.appendChild(state);
    schoolLocation.appendChild(municipality);
    school.appendChild(schoolOption);
    classes.appendChild(classOption);
    student.appendChild(studentOption);

    state.appendChild(stateOption);
    municipality.appendChild(municipalityOption);

    /**** CALL OTHER FUNCTIONS / LISTEN TO EVENTS ON ELEMENTS ****/

    // POPULATE SELECTS THROUGH API
    populateStatesSelect(state); // states select
    state.addEventListener("change", () => populateMunicipalitiesSelect(municipality, state)); // municipalities select
    municipality.addEventListener("change", () => populateSchoolsSelect(school, municipality)); // schools select

    // ADD NEIGHBOR SCHOOL'S LOCATION TO THIS SCHOOL
    setTimeout(() => { // wait for populateStatesSelect() response
        setNeighborSchoolLocationToSelf(state, municipality, school, childContent)
    }, 100);

    /*************************
        WRAP EVERYTHING UP
    **************************/

    /**** TOGGLE ADD AND DEL BUTTONS ****/

    if (childCount > 1) {
        delChildBtn.disabled = false;
    }
    if (childCount == 5) {
        addChildBtn.disabled = true;
    }

    /**** UPDATE TABS LIST ****/

    childTabs = document.querySelectorAll("#new-child .child-tabs button");
};

const delChild = () => {
    // IDENTIFY SCHOOL TO DELETE
    let child;
    childTabs.forEach(tab => {
        const classList = tab.classList;
        [...classList].forEach(c => {
            if (c == "selected") { child = tab; }
        });
    });
    // CONFIRM DELETION
    if (!confirm(`Tem certeza que deseja deletar a ${child.innerText}?`)) { return; }

    childCount--;

    /************************
        REMOVE SCHOOL TAB
    ************************/

    // REMOVE TAB BUTTON FROM SCHOOLS TABS
    child.remove(); // in the child section
    const tabsCSec = document.querySelectorAll("#new-classes .child-tabs button");
    tabsCSec.forEach(tab => { // in the classes section
        if (tab.innerText == child.innerText) { tab.remove(); }
    });

    //  UPDATE TABS LIST
    childTabs = document.querySelectorAll("#new-child .child-tabs button");

    // SELECT TO LAST TAB IN THE LIST
    childTabs[childTabs.length - 1].classList.add("selected");

    // IN THE CLASSES SECTION, SELECT THE FIRST TAB
    tabsCSec[0].classList.add("selected");

    /*****************************************************
        REMOVE SCHOOL CONTENT (FROM SCHOOL SECTION FORM)
    *****************************************************/

    const childContents = document.getElementsByClassName("child-content");
    [...childContents].forEach(child => {
        if (!child.hidden) { child.remove(); }
    });

    // DISPLAY CONTENT OF THE LAST SCHOOL IN THE LIST
    childContents[childContents.length - 1].hidden = false;

    /*********************************
        TOGGLE ADD AND DEL BUTTONS
    *********************************/

    addChildBtn.disabled = false;
    if (childCount == 1) { delChildBtn.disabled = true; }
};

const selectChild = (tab) => {
    // UNSELECT PREVIOUSLY SELECTED TAB
    childTabs.forEach(tab => tab.classList.remove("selected"));

    // TOGGLE SCHOOLS CONTENTS VISIBILITY
    const childContents = document.getElementsByClassName("child-content");

    [...childContents].forEach(content => {
        content.classList[1] == tab.className ? content.hidden = false : content.hidden = true;
    });

    // ADD SELECTED CLASS CLICKED TAB
    tab.classList.add("selected");
};

const setNeighborSchoolLocationToSelf = (statesSelect, municipalitiesSelect, schoolsSelect, childContent) => {
    // LOOK FOR PREVIOUS NEIGHBOR
    let index, neighbor = null;
    const childContents = document.getElementsByClassName("child-content");

    for (let i = 0; i < childContents.length; i++) {
        if (childContents[i] == childContent) { index = i; } // found own index
    }
    if (index > 0) { neighbor = childContents[index - 1]; } // there is a previously created child
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

const changeTabText = (tab, cChildTab, select) => {

    const selected = select.options[select.selectedIndex];

    tab.innerText = selected.innerText;
    cChildTab.innerText = selected.innerText;
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