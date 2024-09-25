const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";
 
const dropdowns = document.querySelectorAll(".dropdown select");
const subBtn = document.querySelector("form button");
const icon = document.querySelector("i");

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

const msg = document.querySelector(".mess");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);
        // let flagImg = document.createElement("img");
        // flagImg.src = `shttps://flagsapi.com/${countryList[currCode]}/flat/32.png`;
        // newOption.pend(flagImg);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let newSrc = `https://flagsapi.com/${countryList[currCode]}/flat/32.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// icon.addEventListener("click", () => {
//     console.log("icon clicked.");
//     let temp = fromCurr;
//     console.log(temp);
//     fromCurr = toCurr;
    
//     toCurr = temp;
// });

subBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    icon.setAttribute("class", "fa-solid fa-spinner");
    let amount = document.querySelector("#amount");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <= 0){
        amtVal = 1;
        amount.value = "1";
    }

    
    
    // console.log(fromCurr.value, toCurr.value, `${BASE_URL}${fromCurr.value}.json`)
    // console.log(`${BASE_URL}${fromCurr.value.toLowerCase()}.json`);
    const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL); // response : A promise in JSON format.
    let data = await response.json(); // data : A JavaScript Object.
    
    let exchange = data[fromCurr.value.toLowerCase()];
    let finalAmount = amtVal * exchange[toCurr.value.toLowerCase()];

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
    icon.setAttribute("class", "fa-solid fa-arrow-right-arrow-left");
});