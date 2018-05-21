import G from './gloable.js';
export default function Screen04(queue,stage){
	this.queue = queue;
	this.stage = stage;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();
}

Screen04.prototype._init = function(){
	G.screenLocked =4;
	//背景图
	createjs.Tween.get(G.ground)
	.to({
		x:-150
	},5500);

	this._girlWalk();
	this._showText();
}

Screen04.prototype._girlWalk = function(){
	G.girlAni.gotoAndPlay('walk');
	createjs.Tween.get(G.girlAni)
	.to({
		x:600
	},5500)
	.call(()=>{
		G.girlAni.gotoAndPlay('stand');
		this._showBtn();
	});
	this.container.addChild(G.girlAni);
}

Screen04.prototype._showText = function(){
	this.text01 = new createjs.Bitmap(this.queue.getResult('05_text01'));
	this.text01.alpha = 0;
	this.text01.x = 230;
	this.text01.y = 1880;
	createjs.Tween.get(this.text01)
	.wait(2000)
	.to({
		alpha: 1
	}, 1500);

	this.text02 = new createjs.Bitmap(this.queue.getResult('05_text02'));
	this.text02.alpha = 0;
	this.text02.x = 390
	this.text02.y = 1960;
	createjs.Tween.get(this.text02)
	.wait(4000)
	.to({
		x: 370,
		alpha: 1 
	}, 1800)

	this.container.addChild(this.text01, this.text02);
}

Screen04.prototype._showBtn = function(){
	this.optipbtn = new createjs.Bitmap(this.queue.getResult('screen_optipbtn'));
	this.optipbtn.x = 1015;
	this.optipbtn.y = 2200;
	this.optipbtn.alpha = 0;

	this.optipcircle = new createjs.Bitmap(this.queue.getResult('screen_optipcircle'));
	this.optipcircle.x = 1050;
	this.optipcircle.y = 2235;
	this.optipcircle.regX = 35;
	this.optipcircle.regY = 35;
	this.optipcircle.alpha = 0;

	new Promise((resolve,reject)=>{
		createjs.Tween.get(this.optipbtn)
		.to({
			alpha:1
		},500)
		.call(()=>{
			resolve();
		})
		createjs.Tween.get(this.optipcircle)
		.to({
			alpha:1
		},500)
		.call(()=>{
			resolve();
		})
	})
	.then(()=>{
		//外圈闪烁动画
		createjs.Tween.get(this.optipcircle,{loop:true})
		.to({
			alpha:0,
			scaleX:1.5,
			scaleY:1.5
		},1000)
	})

	this.container.addChild(this.optipbtn,this.optipcircle);


	//按钮点击事件
	this.optipbtn.addEventListener('click',()=>{
		//按钮消失
		createjs.Tween.get(this.optipcircle)
		.to({
			alpha:0
		},200)
		createjs.Tween.get(this.optipbtn)
		.to({
			alpha:0
		},200)
		.call(()=>{
			this.container.removeChild(this.optipbtn,this.optipcircle)
		})

		//文字消失
		createjs.Tween.get(this.text01)
		.to({
			alpha:0,
			x:220
		},1000) 
		createjs.Tween.get(this.text02)
		.to({
			alpha:0,
			x:390
		},1000)
		.call(()=>{
			this.container.removeChild(this.text01,this.text02);
		});

		//小女孩跑出屏幕
		G.girlAni.gotoAndPlay('run');
		createjs.Tween.get(G.girlAni)
		.to({
			x:1400
		},5500)
		.call(()=>{
			G.screen = 5;
			//移除背景
			this.container.removeChild(this.ground,this.ground_bg);
		})
	})
}