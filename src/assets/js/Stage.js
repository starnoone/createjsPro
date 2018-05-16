import G from './gloable.js';
export default function Stage(canvasId = 'stage'){
	this.canvasId = canvasId;
	this._init();
}

Stage.prototype._init = function(){
	//实例化舞台
	this.stage = new createjs.Stage(this.canvasId);
	//开启事件
	createjs.Touch.enable(this.stage);
}