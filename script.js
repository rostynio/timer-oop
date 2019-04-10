const timer = document.querySelector("#timer");

class mainTimer{
    constructor(seconds){
        this.seconds = seconds;
        this.startTime = this.seconds;
        this.render();
    }

    countDown(){
        this.timeleft = setInterval(()=>{
            if(this.startTime>0){
                this.startTime -= 1;
            } else {
                clearInterval(this.timeleft);
                this.resetTimer();
                this.timeleft = null;
                return
            }
            this.showTime(this.startTime);
            this.animatedTimeLine();
        },1000)
        }

    showTime(seconds){
        const minutes = Math.floor(seconds / 60);
        const remaindSeconds = seconds % 60;
        this.blockTimer.innerText = `${minutes}:${remaindSeconds < 10 ? '0' : ''}${remaindSeconds}`;
    }

    resetTimer(){
        this.timeline.style.width = `${100}%`;
        this.startTime = this.seconds;
        this.showTime(this.seconds);
        this.button.textContent = "Start";
    }

    stopTimer() {
        clearInterval(this.timeleft);
    }
    
    animatedTimeLine(){
        const lineWidth = this.timeline.offsetWidth;
        const step = Math.round((this.width)/(this.seconds));
        this.timeline.style.width = (lineWidth - step) >= 0 ? `${lineWidth - step}px` : `${0}px`;
    }

    createTimeLine(){
        this.timeline = document.createElement("div");
        this.timeline.classList += "timeline";
        return this.timeline;
    }

    pressedButton() {
        if (this.button.textContent == "Start") {
            this.button.textContent = "Stop";
            this.countDown();
        }

        else {
            this.button.textContent = "Start";
            this.stopTimer();
        }
    }

    

    render(){
        timer.classList += " wrapper";
        this.blockTimer = document.createElement('div');
        this.blockTimer.classList.add("timer-block");
        timer.append(this.blockTimer);
        this.button = document.createElement("button");
        this.button.classList.add("button");
        this.button.textContent = "Start";
        timer.append(this.button);
        this.button.addEventListener("click", this.pressedButton.bind(this));
        this.showTime(this.seconds);
        timer.append(this.createTimeLine());
        this.width = this.timeline.offsetWidth;
    }
    
 
    }

    const timerFirst = new mainTimer(5);

class secondTimer extends mainTimer {
    constructor(seconds, defaultStart = false){
        super(seconds);
        this.defaultStart = defaultStart;
        this.startParametr();
    }

    startParametr() {
        if(this.defaultStart) {
            this.button.textContent = "Start";
            this.pressedButton()
        } else {
            this.button.textContent = "Stop";
            this.pressedButton();
        }
    }
}

    const timerSecond = new secondTimer(1000, true);

