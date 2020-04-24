let totalcases = document.querySelector(".totalcases");
let died = document.querySelector(".died")
let recovered = document.querySelector(".recovered")


totalcases.textContent = "..."
died.textContent = "..."
recovered.textContent = "..."


fetch("https://api.covid19api.com/world/total").then((resp) => resp.json())
    .then(function (data) {
        let obj = data
        let i=1;
    let j=1;
    let k=1;
        var a = setInterval(() => {
            totalcases.textContent = i;
            i=i*2;
            if (i > obj.TotalConfirmed) {
                clearInterval(a);
                totalcases.textContent = obj.TotalConfirmed;

            }
        }, 50)
        var b = setInterval(() => {
            died.textContent = k;
            k=k*2;
            if (k > obj.TotalDeaths) {
                clearInterval(b);
                died.textContent = obj.TotalDeaths;

            }
        }, 50)
        var c = setInterval(() => {
            recovered.textContent = j;
            j=j*2;
            if (j > obj.TotalConfirmed) {
                clearInterval(c);
                recovered.textContent = obj.TotalRecovered;

            }
        }, 50)

    })
    .catch(function (error) {
        totalcases.textContent = "..."
        died.textContent = "..."
        recovered.textContent = "..."
    });

$('.carousel').carousel({
    interval: 2500
})
