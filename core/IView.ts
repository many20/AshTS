export module ash.core {

    export interface IView {
        x: number;
		y: number;
		width: number;
		height: number;
		rotation: number;
        graphics: CanvasRenderingContext2D;

        draw();
    }

}