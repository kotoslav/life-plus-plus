import { Container, Assets, Graphics } from "pixi.js";
import { HEIGHT, WIDTH } from "../utils/consts";
import tableSVG from "../../Assets/Sprites/Table.svg";
import WindowToStreet from "../Entity/WindowToStreet";

export default class MainGame extends Container{
    constructor() {
        super();
        this.addBackground();
        this.addTable();

        const Window = new WindowToStreet();
        this.addChild(Window);

  
    }

    async addBackground() {
        const background = new Graphics();
        background.rect(0, 0, WIDTH, HEIGHT)
        background.fill('818F99');
        this.addChild(background);
    }

    async addTable() {
        const tableSvg = await Assets.load({
            src: tableSVG,
            data: {
                parseAsGraphicsContext: true,
            },
        });
        

        const graphics = new Graphics(tableSvg);
        graphics.position.set(0, HEIGHT - graphics.height);

        const mask = new Graphics();
        mask.rect(0, HEIGHT - graphics.height, WIDTH, graphics.height).fill(0xffffff);
        this.addChild(graphics, mask);
        graphics.setMask({mask: mask});
    }
}