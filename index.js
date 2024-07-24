import Clock from './clock.js';

console.log(customElements.get('custom-clock')??(customElements.define('custom-clock', Clock),"defined succesfully"));

const creationButton=document.getElementById("creationButton");
const clockContainer=document.getElementById("clockContainer");

const clockArray=[];

document.addEventListener("DOMContentLoaded",function(){
    creationButton.onclick=()=>{
        clockArray.push(document.createElement("custom-clock"));
        clockArray[clockArray.length-1].runTimer();
        clockContainer.appendChild(clockArray[clockArray.length-1]);
    }
});
// const clockArray=[];

// for (let i = 0; i < 10; i++) {
    
//     clockArray.push(document.createElement('custom-clock'));
    
// }
// clockArray.forEach((clock)=>{
//     document.body.appendChild(clock);
//     clock.runTimer();
// });

