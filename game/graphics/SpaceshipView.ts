import View = require("core/IView");

export class SpaceshipView implements View.ash.core.IView {

		public x:number = 0;
		public y: number = 0;
		public width: number = 20;
		public height: number = 20;
		public rotation: number = 0;
        public graphics: CanvasRenderingContext2D = null;

        constructor(graphics: CanvasRenderingContext2D) {
            this.initialise(graphics);
        }

        public initialise(graphics: CanvasRenderingContext2D) {
			this.graphics = graphics;
			this.draw();
			return this;
		}

		public draw() {
			var graphics = this.graphics;
			
			graphics.save();
			graphics.beginPath();
			graphics.translate( this.x, this.y );
			graphics.rotate( this.rotation );
			graphics.fillStyle =  "#FFFFFF";
			graphics.moveTo( 8, 0 );
			graphics.lineTo( -7, 7 );
			graphics.lineTo( -4, 0 );
			graphics.lineTo( -7, -7 );
			graphics.lineTo( 10, 0 );
			graphics.fill();
			graphics.restore();
		}

}
