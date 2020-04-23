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

loader.classList.add("hide-all")
row.classList.add("hide-all");
countryname.classList.add("hide-all")

let clearall = () => {
    totalcases.textContent = "..."
    died.textContent = "..."
    recovered.textContent = "..."
    activecases.textContent = "..."
    newcases.textContent = "..."
    critical.textContent = "..."
    tests.textContent = "..."
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
                totalcases.textContent = caseObj.total;
                activecases.textContent = caseObj.active;
                died.textContent = deathObj.total;
                recovered.textContent = caseObj.recovered;
                newcases.textContent = caseObj.new;
                critical.textContent = caseObj.critical;
                tests.textContent = testObj.total;
                row.classList.remove("hide-all");
                countryname.classList.remove("hide-all")

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
