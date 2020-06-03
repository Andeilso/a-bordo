const statesSelect = document.getElementById("state-school1");
const municipalitiesSelect = document.getElementById("municipality-school1");
const schoolsSelect = document.getElementById("school1");


const populateStatesSelect = () => {
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

const populateMunicipalitiesSelect = () => {
    statesSelect.addEventListener("change", () => {

        municipalitiesSelect.removeAttribute("disabled");
        let nodesMunicipalitiesSelect = municipalitiesSelect.childNodes;
        [...nodesMunicipalitiesSelect].map(node => node.remove());

        let selectedState = statesSelect.options[statesSelect.selectedIndex].value;

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = `http://educacao.dadosabertosbr.com/api/cidades/${selectedState}`;

        fetch(proxyUrl + targetUrl)
            .then(res => res.json())
            .then(municipalities => {

                municipalities.forEach(municipality => {

                    let codeName = municipality.split(":");
                    let name = codeName[1];

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
            })
            .catch(error => {
                console.log(error);
            });
    })
}

const populateSchoolsSelect = () => {
    municipalitiesSelect.addEventListener("change", () => {

        schoolsSelect.removeAttribute("disabled");
        let nodesSchoolsSelect = schoolsSelect.childNodes;
        [...nodesSchoolsSelect].map(node => node.remove());

        let selectedMunicipality = municipalitiesSelect.options[municipalitiesSelect.selectedIndex].value;
        let codeName = selectedMunicipality.split(":");
        let code = codeName[0];

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
            })
            .catch(error => {
                console.log(error);
            });
    })
}

populateStatesSelect();
populateMunicipalitiesSelect();
populateSchoolsSelect();