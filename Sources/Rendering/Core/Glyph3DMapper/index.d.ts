import { Bounds, Nullable, vtkPipelineConnection } from '../../../types';
import vtkMapper, { IMapperInitialValues } from '../Mapper';
import { OrientationModes, ScaleModes } from './Constants';

interface IPrimitiveCount {
  points: number;
  verts: number;
  lines: number;
  triangles: number;
}

export interface IGlyph3DMapperInitialValues extends IMapperInitialValues {
  orient?: boolean;
  orientationMode?: OrientationModes;
  orientationArray?: string;
  scaling?: boolean;
  scaleFactor?: number;
  scaleMode?: ScaleModes;
  scaleArray?: string;
  matrixArray?: number[];
  normalArray?: number[];
  colorArray?: number[];
}

export interface vtkGlyph3DMapper extends vtkMapper {
  /**
   * Get the bounds for this mapper as [xmin, xmax, ymin, ymax,zmin, zmax].
   * @return {Bounds} The bounds for the mapper.
   */
  getBounds(): Bounds;

  /**
   *
   */
  buildArrays(): void;

  /**
   *
   */
  getPrimitiveCount(): IPrimitiveCount;

  /**
   * Get scale mode
   * @default `SCALE_BY_MAGNITUDE`
   */
  getScaleMode(): ScaleModes;

  /**
   * Get scale factor to scale object by.
   */
  getScaleFactor(): number;

  /**
   * Get scale mode as string
   */
  getScaleModeAsString(): string;

  /**
   * Sets the name of the array to use as scale values.
   * @param {String} arrayName Name of the array
   */
  setScaleArray(arrayName: Nullable<string>): boolean;

  /**
   * Gets the name of the array used as scale values.
   */
  getScaleArray(): string;

  /**
   * Get scale mode as array
   */
  getScaleArrayData(): number[];

  /**
   * An orientation array is a vtkDataArray with 3 components. The first
   * component is the angle of rotation along the X axis. The second component
   * is the angle of rotation along the Y axis. The third component is the
   * angle of rotation along the Z axis. Orientation is specified in X,Y,Z
   * order but the rotations are performed in Z,X an Y.
   *
   * This definition is compliant with SetOrientation method on vtkProp3D.
   *
   * By using vector or normal there is a degree of freedom or rotation left
   * (underconstrained). With the orientation array, there is no degree of
   * freedom left.
   */
  getOrientationMode(): OrientationModes;

  /**
   * Get orientation as string
   */
  getOrientationModeAsString(): string;

  /**
   * Get orientation as array
   */
  getOrientationArrayData(): number[];

  /**
   * Sets the name of the array to use as orientation.
   * @param {String} arrayName Name of the array
   */
  setOrientationArray(arrayName: Nullable<string>): boolean;

  /**
   * Gets the name of the array used as orientation values.
   */
  getOrientationArray(): string;

  /**
   * Orientation mode indicates if the OrientationArray provides the direction
   * vector for the orientation or the rotations around each axes.
   * @param {OrientationModes} orientationMode The orientation mode.
   */
  setOrientationMode(orientationMode: OrientationModes): boolean;

  /**
   * Set orientation mode to `DIRECTION`
   */
  setOrientationModeToDirection(): boolean;

  /**
   * Set orientation mode to `ROTATION`
   */
  setOrientationModeToRotation(): boolean;

  /**
   * Set orientation mode to `MATRIX`
   */
  setOrientationModeToMatrix(): boolean;

  /**
   * Specify scale factor to scale object by.
   * @param {Number} scaleFactor The value of the scale factor.
   */
  setScaleFactor(scaleFactor: number): boolean;

  /**
   * Either scale by individual components (`SCALE_BY_COMPONENTS`) or magnitude
   * (`SCALE_BY_MAGNITUDE`) of the chosen array to `SCALE` with or disable scaling
   * using data array all together (`SCALE_BY_MAGNITUDE`).
   * @param {ScaleModes} scaleMode
   * @default SCALE_BY_MAGNITUDE
   */
  setScaleMode(scaleMode: ScaleModes): boolean;

  /**
   * Set scale to `SCALE_BY_MAGNITUDE`
   */
  setScaleModeToScaleByMagnitude(): boolean;

  /**
   * Set scale to `SCALE_BY_CONSTANT`
   */
  setScaleModeToScaleByComponents(): boolean;

  /**
   * Set scale to `SCALE_BY_CONSTANT`
   */
  setScaleModeToScaleByConstant(): boolean;

  /**
   * Convenient method to set the source glyph connection
   * @param {vtkPipelineConnection} outputPort The output port of the glyph source.
   */
  setSourceConnection(outputPort: vtkPipelineConnection): void;
}

/**
 * Method use to decorate a given object (publicAPI+model) with vtkGlyph3DMapper characteristics.
 *
 * @param publicAPI object on which methods will be bounds (public)
 * @param model object on which data structure will be bounds (protected)
 * @param {IGlyph3DMapperInitialValues} [initialValues] (default: {})
 */
export function extend(
  publicAPI: object,
  model: object,
  initialValues?: IGlyph3DMapperInitialValues
): void;

/**
 * Method use to create a new instance of vtkGlyph3DMapper
 * @param {IGlyph3DMapperInitialValues} [initialValues] for pre-setting some of its content
 */
export function newInstance(
  initialValues?: IGlyph3DMapperInitialValues
): vtkGlyph3DMapper;

export declare const vtkGlyph3DMapper: {
  newInstance: typeof newInstance;
  extend: typeof extend;
  OrientationModes: typeof OrientationModes;
  ScaleModes: typeof ScaleModes;
};
export default vtkGlyph3DMapper;
