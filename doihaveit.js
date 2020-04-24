const contentholder = document.querySelector(".content-displayer");
contentholder.classList.add("hide-all");
const container = document.querySelector(".question-container");
const submit = document.querySelector(".submit-button button");
const nocorona = document.querySelector(".no-corona")
const hascorona = document.querySelector(".has-corona")
const timerpage = document.querySelector(".timer-page")
const analy = document.querySelector(".just-loading")
const body = document.querySelector("body")
//just make an error here to solve next

analy.classList.add("hide-all")
nocorona.classList.add("hide-all");
hascorona.classList.add("hide-all");
container.classList.add("hide-all");
submit.classList.add("hide-all");
contentholder.classList.remove("hide-all")
let start = () => {
    contentholder.classList.add("hide-all");
    container.classList.remove("hide-all");
    submit.classList.remove("hide-all")
    timerpage.classList.add("hide-all")
    const questiontemplate1 = document.querySelector('#question-template1').innerHTML;
    const questiontemplate2 = document.querySelector('#question-template2').innerHTML;

    const nocoronadata = [[3], [1, 2], [4], [1], [2], [1,2]]

    const data = [
        {
            qid: 0,
            question: "Are you experiencing any of the following symptoms?",
            options: [{
                value: "Cough",
                id: 0
        }, {
                value: "Fever",
                id: 1,
                checked: "checked",
                active: "active"
        }, {
                value: "Difficulty in Breathing",
                id: 2
        }, {
                value: "None of the Above",
                id: 3
        }]
    },
        {
            qid: 1,
            question: "Are you living in a red-zone area? or Does you area has higher COVID-19 positive cases ?",
            options: [{
                value: "Yes",
                id: 0,
                checked: "checked",
                active: "active"
        }, {
                value: "No",
                id: 1
        }, {
                value: "I'm in Quarantine",
                id: 2
        }]
    },
        {
            qid: 2,
            question: "Have you ever had any of the following?",
            options: [{
                value: "Diabetes",
                id: 0,
                checked: "checked",
                active: "active"
        }, {
                value: "Hypertension",
                id: 1
        }, {
                value: "Lung disease",
                id: 2
        }, {
                value: "Heart Disease",
                id: 3
        }, {
                value: "None of the Above",
                id: 4
        }]
    },
        {
            qid: 3,
            question: "Have you traveled anywhere internationally in the last 14 days?",
            options: [{
                value: "yes",
                id: 0,
                checked: "checked",
                active: "active"
        }, {
                value: "No",
                id: 1
        }]
    },
        {
            qid: 4,
            question: "Which of the following apply to you?",
            options: [{
                value: "I am a healthcare worker and I examined a COVID-19 confirmed case without protective gear",
                id: 0,
                checked: "checked",
                active: "active"
        }, {
                value: "I have recently interacted or lived with someone who has tested positive for COVID -19",
                id: 1
        }, {
                value: "None of the above",
                id: 2
        }]
    },
        {
            qid: 5,
            question: "Have you feel tiredness always along with a mild fever or high fever and dry cough?",
            options: [{
                value: "Yes",
                id: 0,
                checked: "checked",
                active: "active"
        }, {
                value: "No",
                id: 1
        }, {
                value: "None of the above",
                id: 2
        }]
    }
]


    let res = new Array(data.length);
    res=[1,0,0,0,0,0]

    data.forEach((obj, i) => {
        let html;
        if (i % 2 === 0) {
            html = Mustache.render(questiontemplate1, {
                qid: data[i].qid,
                question: data[i].question,
                options: data[i].options
            })
        } else { 
            html = Mustache.render(questiontemplate2, {
                qid: data[i].qid,
                question: data[i].question,
                options: data[i].options
            })
        }
        container.insertAdjacentHTML('beforeend', html)
    })

    

    $('input').on("click", (e) => {
        let option = e.target.id.split(" ")
        ques = parseInt(option[0]);
        res[ques] = parseInt(option[2])
        
//    $('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
//       $('html, body').stop();
//   });

        const qbox = e.target.parentNode.parentNode.parentNode
            .parentNode

        
        let a = $(qbox).offset().top - $(window).scrollTop();
        
        if(a<0){
                    $('html, body').animate({
                scrollTop:window.pageYOffset + qbox.offsetHeight +a
            }, 1000);
        }else{
            
            $('html, body').animate({
                scrollTop:window.pageYOffset+qbox.offsetHeight
            }, 1000,function(){
       $('html, body').off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
   });
        }








    })

    const checkDisease = () => {
        timerpage.classList.add("hide-all");
        analy.classList.add("hide-all")
        //call ravi gaadi code
        let count = 0;
        for (let i = 0; i < nocoronadata.length; i++) {
            if (nocoronadata[i].indexOf(res[i]) > -1) {
                count++;
            }
        }
        if (count >= 4) {
            nocorona.classList.remove("hide-all")
            hascorona.classList.add("hide-all")
        } else {

            nocorona.classList.add("hide-all")
            hascorona.classList.remove("hide-all")
        }


    }


    submit.addEventListener('click', () => {
        container.classList.add("hide-all");
        contentholder.classList.remove("hide-all")
        analy.classList.remove("hide-all");
        submit.classList.add("hide-all")
        setTimeout(() => {
            checkDisease();
        }, 2000)
    })

}





setTimeout(() => {
    start();
}, 5000)
