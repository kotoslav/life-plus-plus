import { Container, Assets, Graphics } from "pixi.js";
import { HEIGHT, WIDTH } from "../utils/consts";
import tableSVG from "../../Assets/Sprites/Table.svg";
import WindowToStreet from "../Entity/WindowToStreet";
import loadLevel from "../Levels/loadLevel";
import Journal from "../Entity/Journal";
import Phone from "../Entity/Phone";
import Dialogue from "../Entity/Dialogue";
import Map from '../Entity/Map';

export default class MainGame extends Container{
    constructor(root) {
        super();
        this.addBackground();
        this.addTable();
		
		let Mape = new Map();
		const car1 = Mape.makeNewCar();
		const pacient1 = Mape.getNewPacient();
		Mape.goToPacient(pacient1,car1);
		this.addChild(Mape)
        //добавление окна
        const windowEntity = new WindowToStreet(); 
        this.addChild(windowEntity);

        //Сущность журнала
        this.journalEntity = new Journal(this);
        this.addChild(this.journalEntity);

        this.phoneEntity = new Phone(this);
        this.addChild(this.phoneEntity);

        this.dialogueWindow = new Dialogue(this);
        this.addChild(this.dialogueWindow)

        //выбор уровня
        this.level = loadLevel('level1'); 
        this.phoneEntity.setCalls(this.level.dialogs);
		
        this.waitNextCall();
  
    }

	async makeNewCar(Mape) {
		await Mape.makeNewCar();
	}
	
	async getNewPacient(Mape) {
		Mape.getNewPacient();
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

    startDialogue(dialogue) {
        this.dialogueWindow.dialogueStart(dialogue);
    }

    waitNextCall() {
        this.phoneEntity.waitNextCall();
    }

    addTaskToJournal(task) {
        this.journalEntity.addTask(task);
    }


}