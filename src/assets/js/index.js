import G from './gloable';
import '../scss/index.scss';
import Load from './load';
import Stage from './Stage';
import Screen01 from './Screen01';

import './resize.js';


var queueObj = new Load();
var stageObj = new Stage();

//主要流程控制
createjs.Ticker.addEventListener('tick',handleTick);
function handleTick(){
	switch(G.screen){
		case 1:
			if(G.screenLocked == 1){
				break;
			}
			//添加背景
			var bg = new createjs.Bitmap(queueObj.queue.getResult('home_bg'));
			stageObj.stage.addChild(bg);
			//实例化场景1
			var screen01 = new Screen01(queueObj.queue,stageObj.stage);
		break;
	}

	//实时更新
	stageObj.stage.update();
}