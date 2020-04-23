let totalcases = document.querySelector(".totalcases");
let died = document.querySelector(".died")
let recovered = document.querySelector(".recovered")


totalcases.textContent = "..."
died.textContent = "..."
recovered.textContent = "..."


fetch("https://api.covid19api.com/world/total").then((resp) => resp.json())
  .then(function(data) {
        let obj = data
        totalcases.textContent = obj.TotalConfirmed;
        died.textContent = obj.TotalDeaths;
        recovered.textContent = obj.TotalRecovered;
    })
  .catch(function(error) {
        totalcases.textContent = "..."
    died.textContent = "..."
    recovered.textContent = "..."
  }); 

$('.carousel').carousel({
  interval: 2500
})