import { Container, Assets, Graphics } from "pixi.js";
import windowSVG from "../../Assets/Sprites/Window.svg";
import { HEIGHT } from "../utils/consts";

export default class WindowToStreet extends Container {
    constructor() {
        super();
        this.addWindowSVG();
    }

    async addWindowSVG() {
        const windowSvg = await Assets.load({
            src: windowSVG,
            data: {
                parseAsGraphicsContext: true,
            },
        });

        const graphics = new Graphics(windowSvg);
        graphics.position.set(0, 0);
        const mask = new Graphics();
        mask.rect(0, 0, 609, 526).fill(0xffffff);


        this.addChild(graphics, mask);

        graphics.setMask({mask: mask})
    }

}