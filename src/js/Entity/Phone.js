import { Container, Assets, Graphics, Ticker, Sprite } from "pixi.js";
import SVG from "../../Assets/Sprites/Phone.png";

export default class Phone extends Container{
    constructor(root) {
        super();

        this.root = root;
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
        this.ringAnimationInit();
        this.on('pointerdown', this.pickUpPhone.bind(this));

        this.numOfCalls = 0;
        this.calls = [];
        this.currentCallId = 0;
    }

    async drawSVG() {
        const PhoneSVG = await Assets.load(SVG);
        

        const graphics = new Sprite(PhoneSVG);
        graphics.position.set(0, 0);
        this.addChild(graphics);
    }

    setCalls(calls) {
        if (calls.length > 0) {
            this.numOfCalls = calls.length;
        }
        this.calls = calls;
        this.waitNextCall(this.currentCall);
    }

    incomingCall() {
        this.currentCall = this.calls[this.currentCallId];
        this.incomingCallState = true;
        this.ringAnimationStart();
        // const avatar = this.calls[this.currentCallId].avatar;
        // avatar.x = 0;
        // avatar.y = 0;
        // this.addChild(avatar);
        //animation and sound
    }

    pickUpPhone() {
        if (this.incomingCallState) {
            this.incomingCallState = false;
            this.stopRingAnimation();
            this.root.startDialogue(this.currentCall);

            //this.currentCall = null;
            //this.waitNextCall();
        } 
    }

    phoneCover() {
        if (this.incomingCall) {
            //animate and sound(ring)
        } else {
            //animation and sound(beep)
        }
    }

    ringAnimationInit() {
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

    callInterval() {
        this.incomingCall();
        this.currentCallId++;
    };


    waitNextCall() {
        if (this.currentCallId <= this.numOfCalls -1) {
            setTimeout(this.callInterval.bind(this), 2000);
        }
    }

    
}

