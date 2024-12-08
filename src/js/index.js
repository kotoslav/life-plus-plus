import { Application} from 'pixi.js';
import Screen from './Screens/Screen';
import StartScreen from './Screens/StartScreen';

(async () =>
{
    const app = new Application();

    globalThis.__PIXI_APP__ = app;

    await app.init({ background: '#000000', resizeTo: window });
    document.body.appendChild(app.canvas);

	const root = new Screen(app);
    root.changeScreen(StartScreen);
	app.stage.addChild(root);

    window.addEventListener('resize', root.scaleToContainer.bind(root));
    
    
})();