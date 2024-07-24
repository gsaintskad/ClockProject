class Clock extends HTMLElement{
    constructor(props){
        super();
        if(!customElements.get('custom-clock')){
            customElements.define('custom-clock', Clock);
        }
        //shadow root ataching
        const shadow=this.attachShadow({mode:"open"});
        
        //css file connecting
        const style = document.createElement('style');
        style.textContent = `
        @import url('src/styles/clockStyle.css');
        `;
        shadow.appendChild(style);
        
        
        //clock container creation
        const clockContainer=document.createElement("div");
        clockContainer.id="clockContainer";
       
        
        clockContainer.classList.add("clockContainer");
        



        this.timeHolder=document.createElement("h1");
        this.timeHolder.id="timeHolder";
        this.timeHolder.classList.add("timeHolderCSS");
        clockContainer.appendChild(this.timeHolder);
        
        shadow.appendChild(clockContainer);
        
        
        
    }
    updateClockState=function(){
        const time=new Date();
     
  
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        let isAM = h < 12;


        h = h <= 12 ? h : h - 12;
        this.timeHolder.innerHTML=`${h<10?"0"+h:h}:${m<10?"0"+m:m}:${s<10?"0"+s:s} ${isAM?"AM":"PM"}`;
        // second_arrow.style.transform = `rotate(${s * 6}deg)`;
        // minute_arrow.style.transform = `rotate(${m * 6 + s / 10}deg)`;
        // hour_arrow.style.transform = `rotate(${h * 30 + m / 2}deg)`;
    }
    runTimer(){
        const run=()=>{
            this.updateClockState();
            setTimeout(run,1000);
        }
        run();
    }
}


console.log(customElements.get('custom-clock')??(customElements.define('custom-clock', Clock),"defined succesfully"));

const clockElement = document.createElement('custom-clock');


document.body.appendChild(clockElement);

clockElement.runTimer();


