import G from './gloable.js';
export default function Screen05(queue,stage){
	this.queue = queue;
	this.stage = stage;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();
}

Screen05.prototype._init = function(){
	G.screenLocked =5;
	//背景图
	this.bg = new createjs.Bitmap(this.queue.getResult('06_bg'));
	this.bg.y = 1810;
	this.container.addChild(this.bg);
	new Promise((resolve,reject)=>{
		//人物跑
		G.girlAni.gotoAndPlay('run');
		G.girlAni.x = 0;
		G.girlAni.y = 2250;
		createjs.Tween.get(G.girlAni)
		.to({
			x:600
		},5500)
		.call(()=>{
			G.girlAni.gotoAndPlay('stand');
			resolve();
		})
	})
	.then(()=>{
		//文字
		this._showText();
		//光
		this._girlLight();
	});

	this.container.addChild(G.girlAni);
}

Screen05.prototype._showText= function(){
	this.text01 = new createjs.Bitmap(this.queue.getResult('06_text01'));
	this.text01.x = 304;
	this.text01.y = 1980;
	this.text01.alpha = 0;
	createjs.Tween.get(this.text01)
	.wait(2000)
	.to({
		y: 2000,
		alpha: 1
	},1000);

	this.text02 = new createjs.Bitmap(this.queue.getResult('06_text02'));
	this.text02.x = 525;
	this.text02.y = 2120;
	this.text02.alpha = 0;
	createjs.Tween.get(this.text02)
	.to({
		alpha: 1
	},1000);

	this.container.addChild(this.text01, this.text02);
}

Screen05.prototype._girlLight= function(){
	//光精灵图
	let girlLight = new createjs.SpriteSheet({
		images:[this.queue.getResult('06_girllights')],
		frames:{
			width:180,
			height:150,
			count:30
		},
		animations:{
			shining: [0,29]
		}
	});

	this.girlLightAni = new createjs.Sprite(girlLight,'shining');
	this.girlLightAni.x = 500;
	this.girlLightAni.y = 2200;

	this.container.addChild(this.girlLightAni);

}
