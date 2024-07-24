class Clock extends HTMLElement{
    constructor(props){
        super();

        //shadow root ataching
        const shadow=this.attachShadow({mode:"open"});
        
        //clock container creation
        const clockContainer=document.createElement("div");
        clockContainer.id="clockContainer";
        console.log(document.styleSheets.length);

        clockContainer.classList.add("clockContainer");
        
        shadow.appendChild(clockContainer);
        



    }
}
customElements.define('custom-clock', Clock);

const clockElement = document.createElement('custom-clock');
clockElement.style["width"]="100%";
clockElement.style["height"]="100%";

document.body.appendChild(clockElement);