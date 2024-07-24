class Clock extends HTMLElement{
    constructor(props){
        super();
        if(!customElements.get('custom-clock')){
            customElements.define('custom-clock', Clock);
        }
        //shadow root ataching
        const shadow=this.attachShadow({mode:"open"});
        
        //css file connecting
        this.connectCSS(shadow,`@import url('src/styles/clockStyle.css');`);
        this.connectCSS(shadow,`@import url('src/styles/arrowsStyle.css')`);
        
        
        //clock container creation
        this.clockContainer=document.createElement("div");
        this.clockContainer.id="clockContainer";
        this.clockContainer.classList.add("clockContainer");

        this.initClock(shadow);
        



        // this.timeHolder=document.createElement("h1");
        // this.timeHolder.id="timeHolder";
        // this.timeHolder.classList.add("timeHolderCSS");
        // clockContainer.appendChild(this.timeHolder);
        this.addTimeHolder(this.clockContainer);


        shadow.appendChild(this.clockContainer);
        
        
        
    }
    connectCSS(shadow,url){
        const style = document.createElement('style');
        style.textContent = url;
        shadow.appendChild(style);
    }
    addTimeHolder(clockContainer=this.clockContainer){
        
        this.timeHolder=document.createElement("h1");
        this.timeHolder.id="timeHolder";
        this.timeHolder.classList.add("timeHolderCSS");
        clockContainer.appendChild(this.timeHolder);
    }
    initClock(shadow){
        const clockDiv=document.createElement("div");
        clockDiv.classList.add("clockDiv");
        const initHoursMarkers=(shadow)=>{
            const myDivs=[];
            const mySubDivs=[];
  
  
            for(let i=0;i<6;i++){
                myDivs.push(document.createElement("div"));
                myDivs[i].id=`myDiv${i}`;
            }
            for(let i=0;i<12;i++){
                mySubDivs.push(document.createElement("div"));
            }
            
            mySubDivs.forEach(subDiv => subDiv.classList.add("subHoursMarksDivStyle"));
            const RotatedDivsStyle = document.createElement('style');
            
            myDivs.forEach((div,i) => {
                
                 
                div.classList.add("hoursMarksDivStyle");
                div.appendChild(mySubDivs[2*i]);
                div.appendChild(mySubDivs[2*i+1]);
                
               // div.style.transform = `rotate(${i*30}deg)`;
                RotatedDivsStyle.textContent+=`#myDiv${i}{transform: rotate(${i*30}deg);}\n`
                    
                clockDiv.appendChild(div);
                  
                
              });
            shadow.appendChild(RotatedDivsStyle);
            
        }
        const initArrows=shadow=>{
            this.secondArrow=document.createElement("div");
            this.secondArrow.classList.add("second_arrow");

            const secondArrowInnerDiv=document.createElement("div");
            secondArrowInnerDiv.id="secondArrowInnerDiv";

            this.secondArrow.appendChild(secondArrowInnerDiv);


            this.minuteArrow=document.createElement("div");
            this.minuteArrow.classList.add("minute_arrow");
            
            const minuteArrowInnerDiv=document.createElement("div");
            minuteArrowInnerDiv.id="minuteArrowInnerDiv";
            this.minuteArrow.appendChild(minuteArrowInnerDiv);



            this.hourArrow=document.createElement("div");
            this.hourArrow.classList.add("hour_arrow");

            const hourArrowInnerDiv=document.createElement("div");
            hourArrowInnerDiv.id="hourArrowInnerDiv";
            
            this.hourArrow.appendChild(hourArrowInnerDiv);

            
            
            const centralElipse=document.createElement("div");
            centralElipse.classList.add("centralElipse");





            clockDiv.appendChild(centralElipse);
            clockDiv.appendChild(this.secondArrow);     
            clockDiv.appendChild(this.minuteArrow);
            clockDiv.appendChild(this.hourArrow);
 
        }

        initHoursMarkers(shadow);
        initArrows(shadow);
        this.clockContainer.appendChild(clockDiv);
    }
    updateClockState=function(){
        const time=new Date();
     
  
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        let isAM = h < 12;


        h = h <= 12 ? h : h - 12;
        this.timeHolder.innerHTML=`${h<10?"0"+h:h}:${m<10?"0"+m:m}:${s<10?"0"+s:s} ${isAM?"AM":"PM"}`;
        this.secondArrow.style.transform = `rotate(${s * 6}deg)`;
        this.minuteArrow.style.transform = `rotate(${m * 6 + s / 10}deg)`;
        this.hourArrow.style.transform = `rotate(${h * 30 + m / 2}deg)`;
    }
    runTimer(){
        const run=()=>{
            this.updateClockState();
            setTimeout(run,1000);
        }
        run();
    }
}
export default Clock;

//console.log(customElements.get('custom-clock')??(customElements.define('custom-clock', Clock),"defined succesfully"));

// const clockElement = document.createElement('custom-clock');


// document.body.appendChild(clockElement);

// clockElement.runTimer();

// const clockArray=[];

// for (let i = 0; i < 10; i++) {
    
//     clockArray.push(document.createElement('custom-clock'));
    
// }
// clockArray.forEach((clock)=>{
//     document.body.appendChild(clock);
//     clock.runTimer();
// });


