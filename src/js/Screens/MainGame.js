import { Container, Assets, Graphics } from "pixi.js";
import { HEIGHT, WIDTH } from "../utils/consts";
import tableSVG from "../../Assets/Sprites/Table.svg";
import WindowToStreet from "../Entity/WindowToStreet";
import loadLevel from "../Levels/loadLevel";
import Journal from "../Entity/Journal";
import Phone from "../Entity/Phone";

export default class MainGame extends Container{
    constructor(root) {
        super();
        this.addBackground();
        this.addTable();

        //добавление окна
        const windowEntity = new WindowToStreet(); 
        this.addChild(windowEntity);

        //Сущность журнала
        const journalEntity = new Journal();
        this.addChild(journalEntity );

        const phoneEntity = new Phone();
        this.addChild(phoneEntity);

        //выбор уровня
        this.level = loadLevel('level1', {journalEntity, phoneEntity}); 
  
    }

    async addBackground() {
        const background = new Graphics();
        background.rect(0, 0, WIDTH, HEIGHT);
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