import { dialogs } from "./Dialogs";
import { Ticker } from "pixi.js";

export default class Level1{
    constructor({journalEntity, phoneEntity}) {
        this.journal = journalEntity;
        this.phone = phoneEntity;
        this.dialogs = dialogs;
        this.phone.numOfCalls = this.dialogs.length;


        
    }

    // waitNextCall() {
    //     this.timeToNextCall = Math.random() * 5000 + 2000;
    //     this.ticker.add((time) => {
    //         if ((time.lastTime > this.timeToNextCall) && (this.phone.currentCall == null) && (this.currentCall <= this.numOfCalls -1)) {
    //             time.stop();
    //             this.phone.incomingCall(this.ticker);
    //             console.log("Вызов - ", this.currentCall)
    //             this.currentCall++;
    //             this.timeToNextCall = Math.random() * 5000 + time.lastTime + 2000;
    //         }
    //     });
    // }
}