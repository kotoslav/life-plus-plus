import { Ticker, Container, Graphics, Text, Assets, Sprite } from "pixi.js";

import carPNG from "../../Assets/Sprites/Car.png";
import { HEIGHT, WIDTH } from "../utils/consts";
export default class Car extends Container{
	#positionStart;
	#mapa;
	
	constructor(masBitOffMap) 
	{
        super();
		this.#mapa=masBitOffMap;
		this.addNewCar();
		this.setToChurch()
		
	}
	async addNewCar()
	{
		const carPng = await Assets.load("Assets/Sprites/Car.png");
		const carSprite = new Sprite(carPng);
		carSprite.pivot.x = carSprite.width / 2;
		carSprite.pivot.y = carSprite.height / 2;
		let circle = new Graphics()
		.circle(0, 0,25)
		.fill('red');
		carSprite.zIndex=9999;
		this.addChild(carSprite,circle);
	}
	async setToChurch()
	{
		this.position.set(1124+696, 556+5);
		this.#positionStart = [1124-1, 556-1]
	}
	async goToXY(posX, posY)
	{
		this.ticker = new Ticker;
		this.ticker.start();
		let counter = 0;
		
		const shortestPath = await this.WayToXY(this.#mapa,this.#positionStart,[posX-1,posY-1])
		console.log(this.#mapa[1123][555]);
		this.x = 0;
		this.y = 0;
		this.ticker.add((time) =>
		{
			console.log(true);
			if(this.x-696==posX-1 && this.y-5==posY-1)
			{	
				this.ticker.stop();
			}
			else
			{   
				if(this.x > 696 + shortestPath[counter][0])
				{
					this.rotation = 3.1425;
					this.scale.y = -1;
				}
				else if(this.x < 696 + shortestPath[counter][0])
				{
					this.rotation = 0;
					this.scale.y = 1;
				}
				else if(this.y > 5 + shortestPath[counter][1])
				{
					this.rotation = 4.7;
					this.scale.y = 1;
				}
				else if(this.y < 5 + shortestPath[counter][1])
				{
					this.rotation = 1.6;
					this.scale.y = 1;
				}
				this.x = 696 + shortestPath[counter][0];
				this.y = 5 + shortestPath[counter][1];
				counter++;
			}
		});
	}
	async WayToXY(screenMas, start, end)
	{
		
		const rows = screenMas.length;
		const cols = screenMas[0].length;
		console.log(rows);
		const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
		const queue = [[...start]];
		const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
		visited[start[0]][start[1]] = true;
		const path = Array.from({ length: rows }, () => Array(cols).fill(null));

		while (queue.length) 
		{
			const [x, y] = queue.shift();

			// Если достигли конца, собираем путь
			if (x === end[0] && y === end[1]) 
			{
				const resultPath = [];
				let current = end;
				while (current) 
				{
					resultPath.push(current);
					current = path[current[0]][current[1]];
				}
				return resultPath.reverse(); // Возвращаем от начала до конца
			}

			for (const [dx, dy] of directions) 
			{
				const newX = x + dx;
				const newY = y + dy;

				if (
				newX >= 0 && newX < rows &&
				newY >= 0 && newY < cols &&
				screenMas[newX][newY] === 1 &&
				!visited[newX][newY]
				) 
				{
					visited[newX][newY] = true;
					queue.push([newX, newY]);
					path[newX][newY] = [x, y]; // Сохраняем путь
				}
			}
		}

		return []; // Если путь не найден
	}
}