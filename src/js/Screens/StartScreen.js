import { Container, Graphics, Text } from "pixi.js";

export default class StartScreen extends Container{
    constructor(parentNode) {
        super();
        this.buttonText = new Text({text: "Начать игру"});
        this.background = new Graphics();
        this.addChild(this.background);
        this.addChild(this.buttonText);
        this.background.rect(0, 0, window.innerWidth, window.innerHeight);
        this.background.fill('#aaaaaa');
        this.buttonText.x = this.width / 2;
        this.buttonText.y = this.height / 2;
        this.buttonText.pivot.x = this.buttonText.width / 2;
        this.buttonText.pivot.y = this.buttonText.height / 2;
    }
}