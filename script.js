async function fetchCharacter(name) {
    const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
    if (response.ok) {
        const data = await response.json();
        if (data.count > 0) {
            console.log(data); // to print the data in consol
            return data.results[0];
        } else {
            throw new Error(`Character data not found: ${name}`);
        }
    } else {
        throw new Error(`Error fectching character: ${response.statusText}`); 
    }
}
async function comparecharacter() {
    const character1Id = document.getElementById("character1").value;
    const character2Id = document.getElementById("character2").value;
    try {
        const character1 = await fetchCharacter(character1Id);
        const character2 = await fetchCharacter(character2Id);

        const character1mass = parseInt(character1.mass, 10);
        const character2mass = parseInt(character2.mass, 10);
        const character1height = parseInt(character1.height,10);
        const character2height = parseInt(character2.height,10);

        if (isNaN(character1mass) || isNaN(character2mass) || isNaN(character1height) || isNaN(character2height)){
            throw new Error('Unable to parse character mass or height');
        }

        const heaviercharacter = character1mass > character2mass ? character1 : character2;
        const tallercharacter = character1height > character2height ? character1 : character2;
        const heaviermessage = `${heaviercharacter.name} is heavier based on mass.`;
        const tallermessage = `${tallercharacter.name} is taller based on height.`;

        let olderMessage;
        if(character1.birth_year === "unknown" || character2.birth_year==="unknown"){
            olderMessage = "the older character cannot be determined. ";
        }else{
            const birthYear1= parseFloat(character1.birth_year);
            const birthYear2= parseFloat(character2.birth_year);
            if(birthYear1 === birthYear2){
                olderMessage = `${character1.name} and ${character2.name} have the same birth year.`;

            }
            else{
                const olderCharacter = birthYear1> birthYear2? character1:character2;
                olderMessage =`${olderCharacter.name} is older  based on birth year.`;
            }
        }
        console.log(olderMessage,heaviermessage,tallermessage);
        const comparisonResult=`
        <div class="row">
            <div class="col-md-6">
                <h3>${character1.name}</h3>
                <p>Height:${character1.height} cm</p>
                <p>Mass:${character1.mass} kg</p>
                <p>Birth year:${character1.birth_year}</p>
            </div>
            <div class="col-md-6">
                <h3>${character2.name}</h3>
                <p>Height:${character2.height} cm</p>
                <p>Mass:${character2.mass} kg</p>
                <p>Birth year:${character2.birth_year}</p>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col text-centre">
                <h4>${heaviermessage}</h4>
                <h4>${tallermessage}</h4>
                <h4>${olderMessage}</h4>
            </div>
        </div>
        `;
        document.querySelector(".comparison-result").innerHTML= comparisonResult;

    } catch (error) {
        alert(error);
    }
}