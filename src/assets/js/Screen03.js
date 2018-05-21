import G from './gloable.js';
export default function Screen03(queue,stage){
	this.queue = queue;
	this.stage = stage;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();
}

Screen03.prototype._init = function(){
	G.screenLocked = 3;
	this._showLight();
	this._showText()
	.then(()=>{
		this._showBtn();
	});
}

Screen03.prototype._showText = function(){
	return new Promise((resolve,reject)=>{
		this.text01 = new createjs.Bitmap(this.queue.getResult('03_text01'));
		this.text01.alpha = 0;
		this.text01.x = 400;
		this.text01.y = 2045;
		createjs.Tween.get(this.text01)
		.to({
			alpha:1
		},1500)
		this.text02 = new createjs.Bitmap(this.queue.getResult('03_text02'));
		this.text02.alpha = 0;
		this.text02.x = 450;
		this.text02.y = 2045;
		createjs.Tween.get(this.text02)
		.wait(1500)
		.to({
			alpha:1,
			x:430
		},1500)
		.call(()=>{
			resolve();
		})
		this.container.addChild(this.text01,this.text02);
	})
}

//按钮
Screen03.prototype._showBtn = function(){
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

	//点击事件
	this.optipbtn.addEventListener('click',()=>{
		G.lightStage = 'false';
		//文字消失
		new Promise((resolve,reject)=>{
			createjs.Tween.get(this.text02)
			.to({
				alpha:0,
				x:450
			},1500)
			createjs.Tween.get(this.text01)
			.to({
				alpha:0,
				x : 395
			},1500)
			.call(()=>{
				resolve();
				this.container.removeChild(this.text01,this.text02);
			})
		})
		.then(()=>{
			this._showBranch();
		})
	})

}

Screen03.prototype._showLight = function(){
	this.light = new createjs.Bitmap(this.queue.getResult('04_light'));
	this.light.x = 140;
	this.light.y = 1800;
	this.light.alpha = 0;
	new Promise((resolve,reject)=>{
		createjs.Tween.get(this.light)
		.to({
			alpha: .4
		}, 1500)
		.call(()=>{
			resolve();
		});
	})
	.then(()=>{
		_lightAni(this.light);
	})
	this.container.addChild(this.light);
	function _lightAni(light){
		if(G.lightStage == 'false'){
			return 0;
		}
		new Promise((resolve,reject)=>{
			createjs.Tween.get(light)
			.to({
				alpha: .9,
				x:160
			}, 1500)
			.call(()=>{
				resolve();
			})
		})
		.then(()=>{
			createjs.Tween.get(light)
			.to({
				alpha: .4,
				x:140
			}, 1500)
			.call(()=>{
				_lightAni(light);
			});
		});
	}
}

Screen03.prototype._showBranch = function(){
	this.branch = new createjs.Bitmap(this.queue.getResult('04_branch'));
	this.branch.x = 1400;
	this.branch.y = 1825;
	createjs.Tween.get(this.branch)
	.to({
		x:-1400
	}, 4000);

	let timmer = setTimeout(()=>{
		G.screen = 4;
		//移除光线
		createjs.Tween.get(this.light)
		.to({
			alpha:0
		},2000)
		.call(()=>{
			this.container.removeChild(this.light);
		});
		//替换背景
		createjs.Tween.get(G.bg)
		.to({
			alpha:0
		},2000);
		createjs.Tween.get(G.ground)
		.to({
			alpha:1
		},2000);
		createjs.Tween.get(G.ground_bg)
		.to({
			alpha:1
		},2000);

		clearTimeout(timmer);
	},2000)
	this.container.addChild(this.branch);
}
