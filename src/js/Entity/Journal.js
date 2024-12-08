import { Container, Assets, Graphics } from "pixi.js";
import SVG from "../../Assets/Sprites/Journal.svg";

export default class Journal extends Container{
    constructor() {
        super();
        this.tasks = [];
        this.key = 0;
        this.zIndex = 1;
        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.drawSVG();
    }

    getTasks() {
        return this.tasks;
    }

    getTaskByKey(key){
        const task = this.tasks.find( t => t.id == key);
        return task;
    }

    addTask(task){
        this.tasks.push({
            ...task, id: this.key
        });
        this.key++;
    }
    
    removeTaskByKey(key) {
        this.tasks.filter( t => t.id !== key);
    }

    async drawSVG() {
        const JournalSVG = await Assets.load({
            src: SVG,
            data: {
                parseAsGraphicsContext: true,
            },
        });
        

        const graphics = new Graphics(JournalSVG);
        graphics.position.set(1083, 675);
        this.addChild(graphics);
    }
}