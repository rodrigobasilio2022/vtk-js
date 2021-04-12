import {
	VtkAlgorithm,
	VtkObject
} from 'vtk.js/Sources/macro';

export enum ShapeType {
	TRIANGLE,
	STAR,
	ARROW_4,
	ARROW_6
}

/**
 *
 */
interface IArrow2DSourceInitialValues {
	base?: number;
	height?: number;
	width?: number;
	thickness?: number;
	center?: number[];
	pointType?: string;
	origin?: number[];
	direction?: number[];
}

type vtkAlgorithm = VtkObject & Omit<VtkAlgorithm,
	'getInputData' |
	'setInputData' |
	'setInputConnection' |
	'getInputConnection' |
	'addInputConnection' |
	'addInputData' > ;

export interface vtkArrow2DSource extends vtkAlgorithm {
	/**
	 * Get the cap the base of the cone with a polygon.
	 * @default 0
	 */
	getBase(): number;

	/**
	 * Get the center of the cone.
	 * @default [0, 0, 0]
	 */
	getCenter(): number[];

	/**
	 * Get the center of the cone.
	 */
	getCenterByReference(): number[];

	/**
	 * Get the orientation vector of the cone.
	 * @default [1.0, 0.0, 0.0]
	 */
	getDirection(): number[];

	/**
	 * Get the orientation vector of the cone.
	 */
	getDirectionByReference(): number[];

	/**
	 * Get the height of the cone.
	 * @default 1.0
	 */
	getHeight(): number;

	/**
	 * Get the base thickness of the cone.
	 * @default 0.5
	 */
	getThickness(): number;

	/**
	 * Get the number of facets used to represent the cone.
	 * @default 6
	 */
	getWidth(): number;

	/**
	 * Expose methods
	 * @param inData 
	 * @param outData 
	 */
	requestData(inData: any, outData: any): void;

	/**
	 * Turn on/off whether to cap the base of the cone with a polygon.
	 * @param {Number} base The value of the 
	 */
	setBase(base: number): boolean;

	/**
	 * Set the center of the cone.
	 * It is located at the middle of the axis of the cone.
	 * !!! warning
	 *     This is not the center of the base of the cone!
	 * @param {Number} x The x coordinate.
	 * @param {Number} y The y coordinate.
	 * @param {Number} z The z coordinate.
	 * @default [0, 0, 0]
	 */
	setCenter(x: number, y: number, z: number): boolean;

	/**
	 * Set the center of the cone.
	 * It is located at the middle of the axis of the cone.
	 * !!! warning
	 *     This is not the center of the base of the cone!
	 * @param {Number[]}  center 
	 * @default [0, 0, 0]
	 */
	setCenterFrom(center: number[]): boolean;

	/**
	 * Set the direction for the arrow.
	 * @param {Number} x The x coordinate.
	 * @param {Number} y The y coordinate.
	 * @param {Number} z The z coordinate.
	 */
	setDirection(x: number, y: number, z: number): boolean;

	/**
	 * Set the direction for the arrow 2D.
	 * @param {Number[]} direction The direction coordinates.
	 */
	setDirection(direction: number[]): boolean;

	/**
	 * Set the direction for the arrow 2D.
	 * @param {Number[]} direction The direction coordinates.
	 */
	setDirectionFrom(direction: number[]): boolean;

	/**
	 * Set the height of the cone.
	 * This is the height along the cone in its specified direction.
	 * @param {Number} height The height value.
	 */
	setHeight(height: number): boolean;

	/**
	 * Set the base thickness of the cone.
	 * @param {Number} thickness 
	 */
	setThickness(thickness: number): boolean;

	/**
	 * Set the number of facets used to represent the cone.
	 * @param {Number} width 
	 */
	setWidth(width: number): boolean;
}

/**
 * Method used to decorate a given object (publicAPI+model) with vtkArrow2DSource characteristics.
 *
 * @param publicAPI object on which methods will be bounds (public)
 * @param model object on which data structure will be bounds (protected)
 * @param {IArrow2DSourceInitialValues} [initialValues] (default: {})
 */
export function extend(publicAPI: object, model: object, initialValues?: IArrow2DSourceInitialValues): void;

/**
 * Method used to create a new instance of vtkArrow2DSource.
 * @param {IArrow2DSourceInitialValues} [initialValues] for pre-setting some of its content
 */
export function newInstance(initialValues?: IArrow2DSourceInitialValues): vtkArrow2DSource;

/**
 * vtkArrow2DSource creates a cone centered at a specified point and pointing in a specified direction.
 * (By default, the center is the origin and the direction is the x-axis.) Depending upon the resolution of this object,
 * different representations are created. If resolution=0 a line is created; if resolution=1, a single triangle is created;
 * if resolution=2, two crossed triangles are created. For resolution > 2, a 3D cone (with resolution number of sides)
 * is created. It also is possible to control whether the bottom of the cone is capped with a (resolution-sided) polygon,
 * and to specify the height and thickness of the cone.
 */
export declare const vtkArrow2DSource: {
	newInstance: typeof newInstance,
	extend: typeof extend,
};
export default vtkArrow2DSource;
