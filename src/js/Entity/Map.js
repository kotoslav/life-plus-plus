import { Ticker, Container, Graphics, Text, Assets, Sprite } from "pixi.js";
import mapPNG from "../../Assets/Sprites/Map.png";
import carPNG from "../../Assets/Sprites/Car.png";
import Car from "./Car";
import { HEIGHT, WIDTH } from "../utils/consts";
export default class Map extends Container{
	#pasients = [];
	#car = [];
	constructor() 
	{
        super();		
		this.addFullMap();
		
	}
	async addFullMap()
	{
		
		const mapPng = await Assets.load("Assets/Sprites/Map.png");
        const mapSpriteMap = new Sprite(mapPng);
        mapSpriteMap.position.set(696, 5);
        this.addChild(mapSpriteMap);
		
	}
	makeNewCar()
	{
		this.#car.push( new Car(masBitOffMap));
		this.#car[this.#car.length-1].zIndex = 999;
		console.log(this.#car);
        this.addChild(this.#car[this.#car.length-1]);
		return this.#car.length-1;
		//this.#car[this.#car.length-1].goToXY(masPacientXY[0][0],masPacientXY[0][1])
		
	}
	getNewPacient()
	{
		let randomNum;
		while (true){
			const min = 0;
			const max = 17;
			randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
			if(!this.#pasients.includes(randomNum))
			{
				this.#pasients.push(randomNum);
				break;
			}
		}
		return randomNum;		
	}
	
	async goToPacient(idPacient, idCar)
	{
		this.#car[idCar].goToXY(masPacientXY[idPacient][0],masPacientXY[idPacient][1]);
	}
	
}

function findShortestPath(screenMas, start, end) {
	const rows = screenMas.length;
	const cols = screenMas[0].length;
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

// Пример использования:


let masPacientXY = [];

for(let i = 0; i<18; i++)
{
	masPacientXY[i] = [];
}
//1
masPacientXY[0][0]=1316
masPacientXY[0][1]=191

//2
masPacientXY[1][0]=1151 
masPacientXY[1][1]=191

//3
masPacientXY[2][0]=908 
masPacientXY[2][1]=109

//4
masPacientXY[3][0]=822 
masPacientXY[3][1]=109

//5
masPacientXY[4][0]=658 
masPacientXY[4][1]=109

//6
masPacientXY[5][0]=474 
masPacientXY[5][1]=146

//7
masPacientXY[6][0]=287 
masPacientXY[6][1]=146

//8
masPacientXY[7][0]=116 
masPacientXY[7][1]=205

//9
masPacientXY[8][0]=330 
masPacientXY[8][1]=288

//10
masPacientXY[9][0]=517 
masPacientXY[9][1]=302

//11
masPacientXY[10][0]=654 
masPacientXY[10][1]=302

//12
masPacientXY[11][0]=805 
masPacientXY[11][1]=302

//13
masPacientXY[12][0]=903 
masPacientXY[12][1]=302

//14
masPacientXY[13][0]=1046 
masPacientXY[13][1]=302

//15
masPacientXY[14][0]=1313 
masPacientXY[14][1]=411

//16
masPacientXY[15][0]=1168 
masPacientXY[15][1]=411

//17
masPacientXY[16][0]=1007 
masPacientXY[16][1]=448

let masBitOffMap = [];
		for(let i = 0; i < 1373; i++)
		{
			masBitOffMap[i] = [];
			for(let k = 0; k<593; k++)
			{
				masBitOffMap[i][k]=0;
			}
		}
		
		let YMas = [];
		for(let i = 0; i < 13; i++)
		{
			YMas[i] = [];
			
			YMas[i][0] = [];
			YMas[i][0][0] = 0;
			YMas[i][0][1] = 0;
			
			YMas[i][1] = [];
			YMas[i][1][0] = 0;
			YMas[i][1][1] = 0;
		}
		let XMas = [];
		for(let i = 0; i < 10; i++)
		{
			XMas[i] = [];
			
			XMas[i][0] = [];
			XMas[i][0][0] = 0;
			XMas[i][0][1] = 0;
			
			XMas[i][1] = [];
			XMas[i][1][0] = 0;
			XMas[i][1][1] = 0;
		}
		
		//1 - start
		XMas[0][0][0]=17;
		XMas[0][0][1]=205;
		//1 - end
		XMas[0][1][0]=212;
		XMas[0][1][1]=205;
		
		//2 - start
		XMas[1][0][0]=212;
		XMas[1][0][1]=146;
		//2 - end
		XMas[1][1][0]=582;
		XMas[1][1][1]=146;
		
		//3 - start
		XMas[2][0][0]=582;
		XMas[2][0][1]=109;
		//3 - end
		XMas[2][1][0]=1059;
		XMas[2][1][1]=109;
		
		//4 - start
		XMas[3][0][0]=17;
		XMas[3][0][1]=288;
		//4 - end
		XMas[3][1][0]=463;
		XMas[3][1][1]=288;
		
		//5 - start
		XMas[4][0][0]=463;
		XMas[4][0][1]=302;
		//5 - end
		XMas[4][1][0]=1084;
		XMas[4][1][1]=302;
		
		//6 - start
		XMas[5][0][0]=737;
		XMas[5][0][1]=191;
		//6 - end
		XMas[5][1][0]=1371;
		XMas[5][1][1]=191;
		
		//7 - start
		XMas[6][0][0]=1084;
		XMas[6][0][1]=411;
		//7 - end
		XMas[6][1][0]=1372;
		XMas[6][1][1]=411;
		
		//8 - start
		XMas[7][0][0]=1;
		XMas[7][0][1]=448;
		//8 - end
		XMas[7][1][0]=1084;
		XMas[7][1][1]=448;
		
		//9 - start
		XMas[8][0][0]=1084;
		XMas[8][0][1]=522;
		//9 - end
		XMas[8][1][0]=1371;
		XMas[8][1][1]=522;
		
		//10 - start
		XMas[9][0][0]=1084;
		XMas[9][0][1]=556;
		//10 - end
		XMas[9][1][0]=1371;
		XMas[9][1][1]=556;
		
		////////////////////////////////// YMAS
		
		//1 - start
		YMas[0][0][0]=17;
		YMas[0][0][1]=4;
		//1 - end
		YMas[0][1][0]=17;
		YMas[0][1][1]=288;
		
		//2 - start
		YMas[1][0][0]=212;
		YMas[1][0][1]=1;
		//2 - end
		YMas[1][1][0]=212;
		YMas[1][1][1]=288;
		
		//3 - start
		YMas[2][0][0]=370;
		YMas[2][0][1]=1;
		//3 - end
		YMas[2][1][0]=370;
		YMas[2][1][1]=146;
		
		//4 - start
		YMas[3][0][0]=164;
		YMas[3][0][1]=288;
		//4 - end
		YMas[3][1][0]=164;
		YMas[3][1][1]=570;
		
		//5 - start
		YMas[4][0][0]=463;
		YMas[4][0][1]=147;
		//5 - end
		YMas[4][1][0]=463;
		YMas[4][1][1]=570;
		
		//6 - start
		YMas[5][0][0]=542;
		YMas[5][0][1]=302;
		//6 - end
		YMas[5][1][0]=542;
		YMas[5][1][1]=448;
		
		//7 - start
		YMas[6][0][0]=582;
		YMas[6][0][1]=1;
		//7 - end
		YMas[6][1][0]=582;
		YMas[6][1][1]=302;
		
		//8 - start
		YMas[7][0][0]=737;
		YMas[7][0][1]=1;
		//8 - end
		YMas[7][1][0]=737;
		YMas[7][1][1]=448;
		
		//9 - start
		YMas[8][0][0]=829;
		YMas[8][0][1]=448;
		//9 - end
		YMas[8][1][0]=829;
		YMas[8][1][1]=570;
		
		//10 - start
		YMas[9][0][0]=977;
		YMas[9][0][1]=1;
		//10 - end
		YMas[9][1][0]=977;
		YMas[9][1][1]=302;
		
		//11 - start
		YMas[10][0][0]=1059;
		YMas[10][0][1]=1;
		//11 - end
		YMas[10][1][0]=1059;
		YMas[10][1][1]=109;
		
		//12 - start
		YMas[11][0][0]=1084;
		YMas[11][0][1]=302;
		//12 - end
		YMas[11][1][0]=1084;
		YMas[11][1][1]=570;
		
		//13 - start
		YMas[12][0][0]=1244;
		YMas[12][0][1]=1;
		//13 - end
		YMas[12][1][0]=212;
		YMas[12][1][1]=411;
		for(let i = 0; i < 10; i++)
		{
			for(let k = XMas[i][0][0]-1; k <XMas[i][1][0]-1; k++)
			{
				masBitOffMap[k][ XMas[i][0][1] - 1 ] = 1;
			}
		}
		for(let i = 0; i < 13; i++)
		{
			for(let k = YMas[i][0][1]-1; k <YMas[i][1][1]-1; k++)
			{
				masBitOffMap[ YMas[i][0][0] - 1 ][k] = 1;
			}
		}