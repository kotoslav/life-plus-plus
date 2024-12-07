import { Application, Container } from 'pixi.js';
import Screen from './Screens/Screen';
import StartScreen from './Screens/StartScreen';

(async () =>
{
    const app = new Application();
    await app.init({ background: '#bbbbbb', height: window.innerHeight, width: window.innerWidth, autoResize: true });
    document.body.appendChild(app.canvas);



	const root = new Screen(app);
    root.changeScreen(StartScreen);
	app.stage.addChild(root);

})();