import { Container, Graphics, Sprite, Assets, Text, buildRectangle } from "pixi.js";
import { DIALOGUE_BUTTON_HEIGHT, DIALOGUE_BUTTON_WIDTH, HEIGHT, WIDTH } from "../utils/consts";
import { FancyButton } from "@pixi/ui";
import messageBoxSVG from "../../Assets/Sprites/MessageBox.svg"

export default class Dialogue extends Container {
    constructor() {
        super();
        this.dialogue = null;
        this.zIndex = 2;
        this.visible = false;

        this.message = '';
        this.chatContainer = new Container();
        this.chatContainer.x = 358;
        this.chatContainer.y = 35;
        this.chatContainer.zIndex = 3;
        this.addChild(this.chatContainer);

        this.messageContainer = new Container();
        this.messageContainer.x = 668;
        this.messageContainer.y = 35;
        this.messageContainer.scale.x = 1.15;
        this.messageContainer.zIndex = 3;
        this.drawMessageSVG(this.messageContainer);
        this.addChild(this.messageContainer);


        //this.drawShadow();
        //setInterval(this.removeChildren.bind(this), 3000);
    }


    async drawMessageSVG(cont) {
        const messageSVG = await Assets.load({
            src: messageBoxSVG,
            data: {
                parseAsGraphicsContext: true,
            },
        });
        

        const graphics = new Graphics(messageSVG);
        graphics.position.set(0, 0);
        cont.addChild(graphics);
    }

    dialogueStart(dialogue) {
        this.dialogue = dialogue;
        this.drawShadow();
        this.drawDialogueContainer();
        this.visible = true;
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

    async drawButtonsAndMessage(buttonSpace) {
        this.drawMessage();
        buttonSpace.removeChildren();
        let currYButtonCoord = 0;

        this.dialogue.conversation.forEach((val, key) => {
            const dialogueButton = new FancyButton({
                defaultView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, DIALOGUE_BUTTON_HEIGHT, 60).fill("ECEAEC"),
                hoverView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, DIALOGUE_BUTTON_HEIGHT, 60).fill("ECEAFF"),
                text: new Text({text: key, style: {
                    fill: "000000", 
                    fontSize: 32, 
                    fontFamily: "StampatelloFaceto",
                    wordWrap: true, 
                    wordWrapWidth: DIALOGUE_BUTTON_WIDTH - 120}}),
            });
            buttonSpace.addChild(dialogueButton);
            dialogueButton.y = currYButtonCoord;
            currYButtonCoord += 50 + DIALOGUE_BUTTON_HEIGHT;

            dialogueButton.onPress.connect(() => { 
                this.message = this.dialogue.conversation.get(dialogueButton.text);
                this.dialogue.conversation.delete(dialogueButton.text);
                this.drawButtonsAndMessage(buttonSpace);
            })
        });

        const declineButton = new FancyButton({
            defaultView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, DIALOGUE_BUTTON_HEIGHT, 60).fill("ECEAEC"),
            hoverView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, DIALOGUE_BUTTON_HEIGHT, 60).fill("FFEAEC"),
            text: new Text({text: this.dialogue.decline, style: {
                fill: "000000", 
                fontSize: 32, 
                fontFamily: "StampatelloFaceto",
                wordWrap: true, 
                wordWrapWidth: DIALOGUE_BUTTON_WIDTH - 120}}),
        });
        buttonSpace.addChild(declineButton);
        declineButton.y = currYButtonCoord;
        currYButtonCoord += 50 + DIALOGUE_BUTTON_HEIGHT;

        const acceptButton = new FancyButton({
            defaultView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, DIALOGUE_BUTTON_HEIGHT, 60).fill("ECEAEC"),
            hoverView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, DIALOGUE_BUTTON_HEIGHT, 60).fill("ECFFEC"),
            text: new Text({text: this.dialogue.accept, style: {
                fill: "000000", 
                fontSize: 32, 
                fontFamily: "StampatelloFaceto",
                wordWrap: true, 
                wordWrapWidth: DIALOGUE_BUTTON_WIDTH - 120}}),
        });
        buttonSpace.addChild(acceptButton);
        acceptButton.y = currYButtonCoord;
        currYButtonCoord += 50 + DIALOGUE_BUTTON_HEIGHT;
        

        declineButton.onPress.connect(() => { this.dialogueEnd() })
    }

    async drawMessage(){
        this.messageContainer.removeChildren();
        this.drawMessageSVG(this.messageContainer);

        const text = new Text({
            text: this.message, style: {
            fill: "000000", 
            fontSize: 32, 
            fontFamily: "StampatelloFaceto",
            wordWrap: true, 
            wordWrapWidth: 850}
        })
        text.x = 60;
        text.y = 30;
        text.zIndex = 1;

        this.messageContainer.addChild(text);
    

    }

    async drawDialogueContainer() {
        this.message = this.dialogue.greet;

        const avatar = new Sprite(await Assets.load(this.dialogue.avatar));
        this.chatContainer.addChild(avatar);
        avatar.position.set(0, 160);

        const buttonSpace = new Container();
        buttonSpace.x = 500;
        buttonSpace.y = 278;
        this.chatContainer.addChild(buttonSpace);

        this.drawButtonsAndMessage(buttonSpace);

        
    }



    
}