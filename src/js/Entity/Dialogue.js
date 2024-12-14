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


        this.messageContainer = new Container();
        this.messageContainer.x = 668;
        this.messageContainer.y = 35;
        this.messageContainer.zIndex = 3;

        this.drawMessageSVG(0);
        this.addChild(this.messageContainer);

        this.chatContainer = new Container();
        this.chatContainer.x = 358;
        this.chatContainer.y = 0;

        console.log(this.messageContainer.y)

        this.chatContainer.zIndex = 3;
        this.addChild(this.chatContainer);


        //this.drawShadow();
        //setInterval(this.removeChildren.bind(this), 3000);
    }


    async drawMessageSVG(height) {
        /*
        const messageSVG = await Assets.load({
            src: messageBoxSVG,
            data: {
                parseAsGraphicsContext: true,
            },
        });
        
        

        const graphics = new Graphics(messageSVG);
        */

        const graphics = new Graphics();
        graphics.roundRect(0, 0, 1220, height + 60, 60).fill("ECEAEC"),
        graphics.position.set(0, 0);
        this.messageContainer.addChild(graphics);
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
            const text = new Text({text: key, style: {
                fill: "000000", 
                fontSize: 32, 
                fontFamily: "StampatelloFaceto",
                wordWrap: true, 
                wordWrapWidth: DIALOGUE_BUTTON_WIDTH - 120}});
            const dialogueButton = new FancyButton({
                defaultView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, text.height + 20, 60).fill("ECEAEC"),
                hoverView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, text.height + 20, 60).fill("ECEAFF").stroke({ width: 1, color: "DCDAEF" }),
                text 
            });
            buttonSpace.addChild(dialogueButton);
            dialogueButton.y = currYButtonCoord;
            currYButtonCoord += 20 + text.height + 20;

            dialogueButton.onPress.connect(() => { 
                this.message = this.dialogue.conversation.get(dialogueButton.text);
                this.dialogue.conversation.delete(dialogueButton.text);
                this.drawButtonsAndMessage(buttonSpace);
            })
        });

        const declineText = new Text({text: this.dialogue.decline, style: {
            fill: "000000", 
            fontSize: 32, 
            fontFamily: "StampatelloFaceto",
            wordWrap: true, 
            wordWrapWidth: DIALOGUE_BUTTON_WIDTH - 120}});
        const declineButton = new FancyButton({
            defaultView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, declineText.height + 20, 60).fill("ECEAEC"),
            hoverView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, declineText.height + 20, 60).fill("FFEAEC").stroke({ width: 1, color: "EFDADC" }),
            text: declineText,
        });
        buttonSpace.addChild(declineButton);
        declineButton.y = currYButtonCoord;
        currYButtonCoord += 20 + declineText.height + 20;

        const acceptText = new Text({text: this.dialogue.accept, style: {
            fill: "000000", 
            fontSize: 32, 
            fontFamily: "StampatelloFaceto",
            wordWrap: true, 
            wordWrapWidth: DIALOGUE_BUTTON_WIDTH - 120}});

        const acceptButton = new FancyButton({
            defaultView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, acceptText.height + 20, 60).fill("ECEAEC"),
            hoverView: new Graphics().roundRect(0, 0, DIALOGUE_BUTTON_WIDTH, acceptText.height + 20, 60).fill("ECFFEC").stroke({ width: 1, color: "DCEFDC" }),
            text: acceptText,
        });
        buttonSpace.addChild(acceptButton);
        acceptButton.y = currYButtonCoord;
        currYButtonCoord += 20 + acceptText.height + 20;
        

        declineButton.onPress.connect(() => { this.dialogueEnd() })
    }

    async drawMessage(){
        this.messageContainer.removeChildren();

        const text = new Text({
            text: this.message, style: {
            fill: "000000", 
            fontSize: 32, 
            fontFamily: "StampatelloFaceto",
            wordWrap: true, 
            wordWrapWidth: 1095}
        })
        text.x = 60;
        text.y = 30;
        text.zIndex = 1;
        this.messageContainer.height = text.height;
        this.chatContainer.y = text.height - 90;
        this.drawMessageSVG(text.height);
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