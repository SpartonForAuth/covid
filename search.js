let info = document.querySelector(".info-section");
info.classList.add("hide-all")
let totalcases = document.querySelector(".totalcases");
let died = document.querySelector(".died")
let recovered = document.querySelector(".recovered")
let activecases = document.querySelector(".activecases")

let row = document.querySelector(".row")
let button = document.querySelector(".search-button")
let input = document.querySelector(".search-bar")
let newcases = document.querySelector(".newcases");
let tests = document.querySelector(".tests");
let critical = document.querySelector(".critical");
let countryname = document.querySelector(".country-name");
let loader = document.querySelector(".loading-gif")


const listholder = document.querySelector(".listholder");


loader.classList.add("hide-all")
row.classList.add("hide-all");
countryname.classList.add("hide-all")
info.classList.remove("hide-all")


fetch("https://covid-193.p.rapidapi.com/countries", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "1781c610c0mshbd6c983e8a64db9p16444ejsnab6727330783"
        }
    })
    .then(response => response.json()).then(data => {
        let html = "";
        for (let i = 0; i < data.response.length; i++) {
            html += `<option value="${data.response[i]}">`
        }
        listholder.innerHTML = html
    })


let clearall = () => {
    totalcases.textContent = "..."
    died.textContent = "..."
    recovered.textContent = "..."
    activecases.textContent = "..."
    newcases.textContent = "..."
    critical.textContent = "..."
    tests.textContent = "..."
}

let funmake = (card,limit)=>{
        let i=1;
        var a = setInterval(() => {
            card.textContent = i;
            i=i*2;
            if (i > limit) {
                clearInterval(a);
                card.textContent = limit;

            }
        }, 50)
}

let searchcountry = (country) => {

    fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "1781c610c0mshbd6c983e8a64db9p16444ejsnab6727330783"
            }
        })
        .then(resp => resp.json()).then((data) => {

            if (data.results === 0) {
                alert("You might mispelled or try short code for the country you want to search")
            } else {
                let obj = data.response[0]
                let caseObj = obj.cases;
                let deathObj = obj.deaths;
                let testObj = obj.tests;
                row.classList.remove("hide-all");
                countryname.classList.remove("hide-all")

//                totalcases.textContent = caseObj.total;
//                activecases.textContent = caseObj.active;
//                died.textContent = deathObj.total;
//                recovered.textContent = caseObj.recovered;
//                newcases.textContent = caseObj.new;
//                critical.textContent = caseObj.critical;
//                tests.textContent = testObj.total;


                funmake(totalcases, caseObj.total);
                funmake(activecases, caseObj.active);
                funmake(died, deathObj.total);
                funmake(recovered, caseObj.recovered);
                funmake(newcases, caseObj.new);
                funmake(critical, caseObj.critical);
                funmake(tests, testObj.total);






                input.value = ""
                countryname.textContent = country.toUpperCase()
                //                input.focus()
            }



            loader.classList.add("hide-all")

        })
        .catch(err => {
            console.log(err);
            loader.classList.add("hide-all")

        });

}



button.addEventListener('click', (e) => {
    row.classList.add("hide-all");
    loader.classList.remove("hide-all")
    countryname.classList.add("hide-all")
    clearall();
    e.preventDefault()
    searchcountry(input.value.toLowerCase().trim())
})
