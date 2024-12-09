import { Container, Graphics, Sprite, Assets, Text } from "pixi.js";
import { DIALOGUE_BUTTON_HEIGHT, DIALOGUE_BUTTON_WIDTH, HEIGHT, WIDTH } from "../utils/consts";
import { FancyButton } from "@pixi/ui";

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

    dialogueEnd() {
        this.dialogue = null;
        this.removeChildren();
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

        const declineButton = new FancyButton({
            defaultView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, DIALOGUE_BUTTON_HEIGHT, 60).fill("ECEAEC"),
            hoverView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, DIALOGUE_BUTTON_HEIGHT, 60).fill("FFEAEC"),
            text: new Text({text: this.dialogue.decline, style: {
                fill: "000000", 
                fontSize: 32, 
                fontFamily: "StampatelloFaceto",
                wordWrap: true, 
                wordWrapWidth: 625}}),
        });
        
        

        const buttonSpace = new Container();
        buttonSpace.x = 500;
        buttonSpace.y = 128;
        this.chatContainer.addChild(buttonSpace);

        buttonSpace.addChild(declineButton);

        declineButton.onPress.connect(() => { this.dialogueEnd() })
        
    }



    
}