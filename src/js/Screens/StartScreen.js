import { Container, Text } from "pixi.js";

export default class StartScreen extends Container{
    constructor(app) {
        super();
        this.x = 0;
        this.y = 0;
        this.buttonText = new Text({text: "Начать игру"});
        this.addChild(this.buttonText);
        this.buttonText.x = app.screen.width / 2;
        this.buttonText.y = app.screen.height / 2;
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
    }
}