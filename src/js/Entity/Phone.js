import { Container, Assets, Graphics, Ticker } from "pixi.js";
import SVG from "../../Assets/Sprites/Phone.svg";

export default class Phone extends Container{
    constructor() {
        super();
        this.zIndex = 1;
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.drawSVG();

        this.currentCall = null;
        this.incomingCallState = false;
        this.phonePickedUpState = false;

        this.position.set(1630, 707)
        this.rotation = 0;
        this.pivot.x = 316 / 2;
        this.pivot.y = 274 / 2;

        this.ticker = new Ticker();
        this.callTicker = new Ticker();
        this.ringAnimation();
        this.on('pointerdown', this.pickUpPhone.bind(this));

        this.numOfCalls = 0;
        this.currentCallId = 0;

        this.waitNextCall(this.currentCall);
    }

    async drawSVG() {
        const PhoneSVG = await Assets.load({
            src: SVG,
            data: {
                parseAsGraphicsContext: true,
            },
        });
        

        const graphics = new Graphics(PhoneSVG);
        graphics.position.set(0, 0);
        this.addChild(graphics);
    }

    incomingCall() {
        this.currentCall = {};
        this.incomingCallState = true;
        this.ringAnimationStart();
        //animation and sound
    }

    pickUpPhone() {
        if (this.incomingCallState) {
            this.incomingCallState = false;
            this.stopRingAnimation();
            this.currentCall = null;
            this.callTicker.start();
        } 
    }

    phoneCover() {
        if (this.incomingCall) {
            //animate and sound(ring)
        } else {
            //animation and sound(beep)
        }
    }

    ringAnimation() {
        this.rotation = 0;
        let rot = 1;
        this.ticker.add((t) => {
            if (this.rotation < 0.5 && rot == 1) { this.rotation += 0.1 * t.deltaTime}
            else if (this.rotation > 0.5 && rot == 1) { this.rotation -= 0.1 * t.deltaTime; rot = 0}
            else if (this.rotation > -0.5 && rot == 0) { this.rotation -= 0.1 * t.deltaTime}
            else {this.rotation += 0.1; rot = 1}
        })
    }

    ringAnimationStart() {
        this.rotation = 0;
        this.ticker.start();
    }

    stopRingAnimation() {
        this.ticker.stop();
        this.rotation = 0;
    }

    waitNextCall() {
        this.timeToNextCall = Math.random() * 5000 + 2000;
        this.callTicker.start();
        this.callTicker.add((time) => {
            if ((time.lastTime > this.timeToNextCall) && (this.currentCall == null) && (this.currentCallId <= this.numOfCalls -1)) {
                time.stop();
                this.incomingCall();
                console.log("Вызов - ", this.currentCallId)
                this.currentCallId++;
                this.timeToNextCall = Math.random() * 5000 + time.lastTime + 2000;
            }
        });
    }

    
}

