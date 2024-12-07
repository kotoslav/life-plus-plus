import { Container } from "pixi.js";

export default class Screen extends Container{
    #currentScreen;
    #app;
    constructor(app) {
        super();
        this.#app = app;
        this.#currentScreen = new Container();
        this.addChild(this.#currentScreen);
    }

    changeScreen(sceneClass){ 
        this.removeChild(this.#currentScreen);
        this.#currentScreen = new sceneClass(this.#app);
        console.log(this.#currentScreen);
        this.addChild(this.#currentScreen);
    }

}

