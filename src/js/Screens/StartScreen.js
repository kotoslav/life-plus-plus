import { Container, Graphics, Text } from "pixi.js";
import MainGame from "./MainGame";
import { HEIGHT, WIDTH } from "../utils/consts";

export default class StartScreen extends Container{
    constructor(root) {
        super();
        this.addBackground();
        this.addButtonStart();
        this.root = root;
    }

    addBackground() {
        const background = new Graphics();
        this.addChild(background);
        background.rect(0, 0, WIDTH, HEIGHT);
        background.fill('#aaaaaa');
    }

    addButtonStart() {
        const buttonText = new Text({text: "Начать игру"});
        this.addChild(buttonText);
        buttonText.x = WIDTH / 2;
        buttonText.y = HEIGHT / 2;
        buttonText.pivot.x = buttonText.width / 2;
        buttonText.pivot.y = buttonText.height / 2;

        buttonText.eventMode = 'static';
        buttonText.cursor = 'pointer';
        buttonText.on('pointerdown', this.onButtonStartClick.bind(this));
    }

    onButtonStartClick() {
        this.root.changeScreen(MainGame);
    }

}

