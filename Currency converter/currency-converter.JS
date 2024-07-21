let BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdowns= document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
let body=document.querySelector("body");
let container=document.querySelector(".container");
let selectContainer=document.querySelectorAll(".select-container");
let toogle=document.querySelector("#mode");

for(let select of dropdowns){
    for (let currCode in countryList){
        let newOptions=document.createElement("option");
        newOptions.innerText=currCode;
        newOptions.value=currCode;
        if(select.name=="from"&& currCode=="USD"){
            newOptions.selected="selected";
        }
        else if(select.name=="to"&& currCode=="INR"){
            newOptions.selected="selected";
        }
        select.append(newOptions);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

 let updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;

}
let updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==""|| amtVal<1){
        amtVal="1";
        amount.value="1";
    }
    let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data= await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmt} ${toCurr.value}`;

}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();

});

window.addEventListener("load",()=>{
    updateExchangeRate();
});


toogle.onclick=()=>{
    if(body.style.backgroundColor==="black"){
        body.style.backgroundColor="white";
        body.style.color="white";
        container.style.backgroundColor="black";
        toogle.style.borderColor="black";
        toogle.innerText="Change to dark mode"; 
        toogle.style.backgroundColor="white"
        toogle.style.color="black"; 
        selectContainer.forEach(container => {
            container.style.backgroundColor = "white";
        });

        dropdowns.forEach(drops=>{
            drops.style.backgroundColor="white";
            drops.style.color="black";
        });
        
        

    }
    else{
        body.style.backgroundColor="black";
        body.style.color="black";
        container.style.backgroundColor="white";
        toogle.style.borderColor="black";
        toogle.innerText="Change to light mode";
        toogle.style.backgroundColor="black";
        toogle.style.color="white";
        
        selectContainer.forEach(container => {
            container.style.backgroundColor = "black";
        });
        dropdowns.forEach(drops=>{
            drops.style.backgroundColor="black";
            drops.style.color="white";
        });
        
          

        
        
        
       
    }
}

