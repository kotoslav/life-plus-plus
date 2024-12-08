import { Container, Graphics, Sprite, Assets } from "pixi.js";
import { HEIGHT, WIDTH } from "../utils/consts";

export default class Dialogue extends Container {
    constructor() {
        super();
        this.dialogue = null;
        this.zIndex = 2;

        this.message = '';
        this.chatContainer = new Container();
        this.addChild(this.chatContainer);



        //this.drawShadow();
        //setInterval(this.removeChildren.bind(this), 3000);
    }

    dialogueStart(dialogue) {
        this.dialogue = dialogue;
        this.drawShadow();
        this.drawDialogueContainer();
    }

    drawShadow() {
        const graphics = new Graphics();
        graphics.rect(0, 0, WIDTH, HEIGHT);
        graphics.fill("#00000080");
        this.addChild(graphics);
    }

    async drawDialogueContainer() {
        this.chatContainer.x = 358;
        this.chatContainer.y = 35;
        this.chatContainer.zIndex = 3;
        this.message = this.dialogue.greet;

        const message = this.message;
        const questions = this.dialogue.conversation;
        const avatar = new Sprite(await Assets.load(this.dialogue.avatar));
        this.chatContainer.addChild(avatar);
        avatar.position.set(0, 160);



        
    }



    
}