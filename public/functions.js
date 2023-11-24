console.log("linked coorecly");

function button(){
$(".button").on("click" , function(){ 
    let clickedButton = $(this).text();
    console.log (clickedButton) })
}


  




// // import {currentLists , listNamesEncoded} from "./index.js";


// // console.log(currentLists);

//             let numberOfButtons = document.querySelectorAll(".button").length;
//             console.log (numberOfButtons);
            
//             // let allButtons = document.querySelectorAll(".button");

//             // allButtons.forEach(function(botton) {
//             //     botton.addEventListener("click" , function() {
//             //     let buttonText = this.innnerHTML;
//             //     alert(buttonText)
//             //     })
//             // })

//             // for (let i = 0 ; i < numberOfButtons ; i++) {
//             //     document.querySelectorAll(".button")[i].addEventListener("click" , function(){
//             //         let buttonInnerHTML = this.id;

//             //         alert (buttonInnerHTML)
//             //     })
//             // }

//             for (let i = 0 ; i < numberOfButtons ; i++) {
//                 $(".button")[i].on("click" , function(){
//                     let buttonInnerHTML = this.textContent;
//                     console.log (buttonInnerHTML);
//             })}
            
//             // console.log(document.getElementById("button0"));
//             // console.log(document.getElementsByClassName("button")[1]);
            

//             //JQuery

//             console.log($("#button0").text)

//         //    let allButtons = $(".button").length

//         //     $(".button").on("click", function(this){ 
//         //             alert(this.text)})

        