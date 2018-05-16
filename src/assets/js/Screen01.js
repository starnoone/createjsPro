import G from './gloable.js';
export default function Screen01(queue,stage){
	this.queue = queue;
	this.stage = stage;
	this.flowers = [];
	this.paths = [];
	this.curI = 0;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();

}

Screen01.prototype._init = function(){
	G.screenLocked = 1;
	//花朵 flower
	this._flower();
	//文字
	this._showText();

	
}

Screen01.prototype._flower = function(){
	//位置花朵
	var flowerPath = [
		[307,403],
		[421,316],
		[571,266],
		[741,261],
		[866,356],
		[1041,331],
		[1051,171]
	];
	//添加花朵
	for(let i=0;i<7;i++){
		let flower = new createjs.Bitmap(this.queue.getResult('01_flower'));
		flower.regX = flower.regY = 31;
		flower.x = flowerPath[i][0];
		flower.y = flowerPath[i][1];
		this.container.addChild(flower);
		this.flowers.push(flower);
	}

	//解锁路径 x,y,deg
	var path = [
		[332,375,-40],
		[466,288,-18],
		[625,244,0],
		[783,281,30],
		[930,350,-15],
		[1040,270,-90]
	];
	//添加路径
	for(let k=0;k<6;k++){
		let pathObj = new createjs.Bitmap(this.queue.getResult('01_path'));
		pathObj.setTransform(path[k][0], path[k][1], .6, .6, path[k][2]);
		pathObj.alpha = 0.3;
		this.container.addChild(pathObj);
		this.paths.push(pathObj);
	}
	

	//鼠标触屏事件
	this.stage.addEventListener('stagemousemove',(evt)=>{
		//当前鼠标经过位置
		let x = evt.stageX;
		let y = evt.stageY;
		for(let i=0;i<7;i++){
			let posX = flowerPath[i][0];
			let posY = flowerPath[i][1];
			//鼠标经过花朵
			if(x>=posX && x<=posX+62 && y>=posY && y<=posY+62){
				//经过当前索引值花朵
				if(this.curI === i){
					if(this.curI === 0){
						createjs.Ticker.setFPS(60);
					}
					//添加花瓣旋转动画
					createjs.Tween.get(this.flowers[i],{loop:true},true)
					.to({
						rotation:360
					},1500);
					this.curI = this.curI+1;

					//路径变亮
					try{
						createjs.Tween.get(this.paths[i-1])
						.to({
							alpha:1
						},1000)
					}catch(e){
						console.log(e)
					}
				}
			}
		}

	})
}

Screen01.prototype._showText = function(){
	this.text01 = new createjs.Bitmap(this.queue.getResult('01_text'));
	this.text.x = 540;
	this.text.y = 520;
	this.container.addChild(text01);
}