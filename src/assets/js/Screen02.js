import G from './gloable.js';
export default function Screen02(queue,stage){
	this.queue = queue;
	this.stage = stage;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();
}

Screen02.prototype._init = function(){
	G.screenLocked = 2;
	//背景图下移
	createjs.Tween.get(this.stage)
	.wait(1500)
	.to({
		y:-595
	},3500)

	
	//月亮
	this._showMoon();
	//城墙
	this._showBlock();
	//女孩
	this._showGril();
	//云朵
	this._showCloud();
}
//女孩
Screen02.prototype._showGril = function(){
	this.girlContainer = new createjs.Container();
	createjs.Ticker.setFPS(15);
	//女孩精灵图
	let girlSprite = new createjs.SpriteSheet({
		images:[this.queue.getResult('02_girl')],
		frames:{
			width: 135,
			height:100,
			count: 48
		},
		animations: {
			stand: [0,20],
			walk: [21,36],
			run: [37,47]
		}
	});
	//实例化精灵图
	G.girlAni = new createjs.Sprite(girlSprite,'walk');
	G.girlAni.x = 450;
	G.girlAni.y = 968;
	new Promise((resolve,reject)=>{
		//走路动画
		createjs.Tween.get(G.girlAni)
		.wait(3500)
		.to({
			x:580
		},4000)
		.call(()=>{
			//站立
			G.girlAni.gotoAndPlay('stand');
			resolve();
		})
	})
	.then(()=>{
		return this._showText();
	})
	.then(()=>{
		setTimeout(()=>{
			this._showBtn();
		},1000)
	})
	this.girlContainer.addChild(G.girlAni);
	this.container.addChild(this.girlContainer);
}

//按钮
Screen02.prototype._showBtn = function(){
	this.optipbtn = new createjs.Bitmap(this.queue.getResult('screen_optipbtn'));
	this.optipbtn.x = 1015;
	this.optipbtn.y = 1015;
	this.optipbtn.alpha = 0;

	this.optipcircle = new createjs.Bitmap(this.queue.getResult('screen_optipcircle'));
	this.optipcircle.x = 1050;
	this.optipcircle.y = 1050;
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

	//btn点击事件
	this.optipbtn.addEventListener('click',()=>{
		//按钮消失
		this.container.removeChild(this.optipbtn);
		this.container.removeChild(this.optipcircle);
		//文字消失
		new Promise((resolve,reject)=>{
			createjs.Tween.get(this.text01)
			.to({
				x: 230,
				alpha: 0
			},1500);
			createjs.Tween.get(this.text02)
			.to({
				x: 320,
				alpha: 0
			},1500)
			.call(()=>{
				resolve();
			})
		})
		.then(()=>{
			this.container.removeChild(this.text01,this.text02);
			return new Promise((resolve,reject)=>{
				//屏幕抖动
				let count = 0;
				let bgAni = createjs.Tween.get(this.stage,{loop:true})
				.to({
					x:-5,
					y:-600
				},200)
				.call(()=>{
					if(count===6){
						resolve();
						bgAni.pause();
					}
					createjs.Tween.get(this.stage)
					.to({
						x:0,
						y:-595
					},200);
					count++;
				})
			})
		})
		.then(()=>{
			//背景下移
			createjs.Tween.get(this.stage)
			.to({
				y:-1810
			},7000);
			//墙体脱落
			createjs.Tween.get(this.block02)
			.to({
				y:1160,
				alpha:0
			},2000);
			createjs.Tween.get(this.block03)
			.to({
				y:1500,
				rotation:-30
			},2000)
			.call(()=>{
				createjs.Tween.get(this.block03)
				.to({
					y:1550,
					alpha:0
				},2000)
			});
			//女孩掉落
			createjs.Tween.get(G.girlAni)
			.to({
				y:2250
			},10000)
			.call(()=>{
				createjs.Tween.get(G.girlAni)
				.to({
					y:2260
				},2000)
			})
			//云朵下落
			this.girlCloud = new createjs.Bitmap(this.queue.getResult('02_cloud01'));
			this.girlCloud.x = 620;
			this.girlCloud.y = 1030;
			this.girlCloud.scaleX = .2;
			this.girlCloud.scaleY = .2;
			this.girlCloud.alpha = .8;
			this.girlContainer.addChild(this.girlCloud);
			createjs.Tween.get(this.girlCloud)
			.to({
				y:2312
			},10000)
			.call(()=>{
				createjs.Tween.get(this.girlCloud)
				.to({
					alpha:0
				},200)
				.call(()=>{
					this.container.removeChild(this.girlCloud);

					//将场景控制值设置为 场景三
					G.screen = 3;
				})
			})
		})
		

	})

}
//文字
Screen02.prototype._showText = function(){
	return new Promise((resolve,reject)=>{
		this.text01 = new createjs.Bitmap(this.queue.getResult('02_text01'));
		this.text01.alpha = 0;
		this.text01.x = 230;
		this.text01.y = 730;
		createjs.Tween.get(this.text01)
		.wait(500)
		.to({
			x: 250,
			alpha: 1
		},1500);

		this.text02 = new createjs.Bitmap(this.queue.getResult('02_text02'));
		this.text02.alpha = 0;
		this.text02.x = 320;
		this.text02.y = 750;
		createjs.Tween.get(this.text02)
		.wait(2000)
		.to({
			x: 350,
			alpha: 1
		},1500)
		.call(()=>{
			resolve();
		});

		this.container.addChild(this.text01,this.text02);
	})
}

//月亮
Screen02.prototype._showMoon = function(){
	this.moon = new createjs.Bitmap(this.queue.getResult('02_moon'));
	this.moon.x = 860;
	this.moon.y = 585;
	this.container.addChild(this.moon);
}
//城墙
Screen02.prototype._showBlock = function(){
	this.block01 = new createjs.Bitmap(this.queue.getResult('02_block01'));
	this.block01.x = -70;
	this.block01.y = 1055;

	this.block02 = new createjs.Bitmap(this.queue.getResult('02_block02'));
	this.block02.x = 570;
	this.block02.y = 1055;

	this.block03 = new createjs.Bitmap(this.queue.getResult('02_block03'));
	this.block03.x = 636;
	this.block03.y = 1055;

	this.block04 = new createjs.Bitmap(this.queue.getResult('02_block04'));
	this.block04.x = 830;
	this.block04.y = 900;

	this.container.addChild(this.block01,this.block02,this.block03,this.block04);
}
//云朵
Screen02.prototype._showCloud = function(){
	this.cloudContainer = new createjs.Container();
	this.cloud01 = new createjs.Bitmap(this.queue.getResult('02_cloud01'));
	this.cloud01.x = 15;
	this.cloud01.y = 1065;
	this.cloud01.alpha = 0.8;

	this.cloud02 = new createjs.Bitmap(this.queue.getResult('02_cloud02'));
	this.cloud02.x = 100;
	this.cloud02.y = 1065;
	this.cloud02.alpha = 0.8;

	this.cloud03 = new createjs.Bitmap(this.queue.getResult('02_cloud03'));
	this.cloud03.x = 200;
	this.cloud03.y = 1065;
	this.cloud03.alpha = 0.8;

	this.cloud04 = new createjs.Bitmap(this.queue.getResult('02_cloud04'));
	this.cloud04.x = 300;
	this.cloud04.y = 1065;
	this.cloud04.alpha = 0.8;

	this.cloudContainer.addChild(this.cloud01,this.cloud02,this.cloud03,this.cloud04);
	this.container.addChild(this.cloudContainer);
	this.cloudContainer.x = 120;
	createjs.Tween.get(this.cloudContainer)
	.to({
		x:0
	},16000)
}

