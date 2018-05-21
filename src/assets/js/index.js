import G from './gloable';
import '../scss/index.scss';
import Load from './load';
import Stage from './Stage';
import Screen01 from './Screen01';
import Screen02 from './Screen02';
import Screen03 from './Screen03';
import Screen04 from './Screen04';
import Screen05 from './Screen05';
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
			//实例化场景1
			var screen01 = new Screen01(queueObj.queue,stageObj.stage);
		break;
		case 2:
			if(G.screenLocked == 2){
				break;
			}
			
			//实例化场景2
			var screen02 = new Screen02(queueObj.queue,stageObj.stage);
		break;
		case 3:
			if(G.screenLocked == 3){
				break;
			}
			//实例化场景3
			var screen03 = new Screen03(queueObj.queue,stageObj.stage);
		break;
		case 4:
			if(G.screenLocked == 4){
				break;
			}
			//实例化场景4
			var screen04 = new Screen04(queueObj.queue,stageObj.stage);
		break;
		case 5:
			if(G.screenLocked == 5){
				break;
			}
			//实例化场景5
			var screen05 = new Screen05(queueObj.queue,stageObj.stage);
		break;
	}

	//实时更新
	stageObj.stage.update();
}
