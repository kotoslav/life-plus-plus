import { Container } from "pixi.js";
import {WIDTH, HEIGHT} from "../utils/consts";

export default class Screen extends Container{
    #currentScreen;
    #app;
    constructor(app) {
        super();
        this.#app = app;
        this.#currentScreen = new Container();
        this.addChild(this.#currentScreen);
        this.scaleToContainer();

        //this.#app.ticker.add(this.update);
    }

    changeScreen(sceneClass){ 
        this.removeChild(this.#currentScreen);
        this.#currentScreen = new sceneClass(this);
        this.addChild(this.#currentScreen);
        this.scaleToContainer();
    }

    actualWidth() {
        const { width, height } = this.#app.screen;
        const isWidthConstrained = width < height * 16 / 9;
        return isWidthConstrained ? width : height * 16 / 9;
      }
    
    actualHeight() {
        const { width, height } = this.#app.screen;
        const isHeightConstrained = width * 9 / 16 > height;
        return isHeightConstrained ? height : width * 9 / 16;
      }

    scaleToContainer() {
        this.width = WIDTH;
        this.height = HEIGHT;
        this.scale.x = this.actualWidth() / WIDTH;
        this.scale.y = this.actualHeight() / HEIGHT;
        this.x = this.#app.screen.width / 2 - this.actualWidth() / 2;
        this.y = this.#app.screen.height / 2 - this.actualHeight() / 2;
    }

}

