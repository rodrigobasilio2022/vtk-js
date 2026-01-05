import test from 'tape';
import testUtils from 'vtk.js/Sources/Testing/testUtils';

import 'vtk.js/Sources/Rendering/Misc/RenderingAPIs';
import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';
import vtkRTAnalyticSource from 'vtk.js/Sources/Filters/Sources/RTAnalyticSource';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import { FieldAssociations } from 'vtk.js/Sources/Common/DataModel/DataSet/Constants';

test.onlyIfWebGL('Test HardwareSelector Volume', (tapeContext) => {
  const gc = testUtils.createGarbageCollector(tapeContext);
  tapeContext.ok('rendering', 'vtkHardwareSelector TestHardwareSelectorVolume');

  const container = document.querySelector('body');
  const renderWindowContainer = gc.registerDOMElement(
    document.createElement('div')
  );
  container.appendChild(renderWindowContainer);

  const renderWindow = gc.registerResource(vtkRenderWindow.newInstance());
  const renderer = gc.registerResource(vtkRenderer.newInstance());
  renderWindow.addRenderer(renderer);
  renderer.setBackground(0.32, 0.34, 0.43);

  const source = gc.registerResource(vtkRTAnalyticSource.newInstance());
  const size = 50;
  source.setWholeExtent([0, size, 0, size, 0, size]);
  source.update();
  const imageData = source.getOutputData();
  const range = imageData.getPointData().getScalars().getRange();

  const mapper = gc.registerResource(vtkVolumeMapper.newInstance());
  mapper.setInputConnection(source.getOutputPort());
  mapper.setSampleDistance(1.0);

  const volume = gc.registerResource(vtkVolume.newInstance());
  volume.setMapper(mapper);

  // Make the volume opaque everywhere so the first ray entry should be a hit.
  const ctfun = vtkColorTransferFunction.newInstance();
  ctfun.addRGBPoint(range[0], 1.0, 1.0, 1.0);
  ctfun.addRGBPoint(range[1], 1.0, 1.0, 1.0);
  const ofun = vtkPiecewiseFunction.newInstance();
  ofun.addPoint(range[0], 1.0);
  ofun.addPoint(range[1], 1.0);
  volume.getProperty().setRGBTransferFunction(0, ctfun);
  volume.getProperty().setScalarOpacity(0, ofun);
  volume.getProperty().setScalarOpacityUnitDistance(0, 1.0);
  volume.getProperty().setInterpolationTypeToFastLinear();

  renderer.addVolume(volume);

  const glwindow = gc.registerResource(renderWindow.newAPISpecificView());
  glwindow.setContainer(renderWindowContainer);
  renderWindow.addView(glwindow);
  glwindow.setSize(400, 400);

  renderer.resetCamera();
  renderer.resetCameraClippingRange();
  renderWindow.render();

  const sel = glwindow.getSelector();
  sel.setFieldAssociation(FieldAssociations.FIELD_ASSOCIATION_POINTS);
  sel.setCaptureZValues(true);

  return sel
    .selectAsync(renderer, 200, 200, 200, 200)
    .then((res) => {
      tapeContext.ok(res.length >= 1, 'Selected at least one prop');

      const volumeNode = res.find(
        (node) => node.getProperties().prop === volume
      );
      tapeContext.ok(!!volumeNode, 'Volume is present in selection');

      const { worldPosition, displayPosition } = volumeNode.getProperties();
      tapeContext.ok(
        worldPosition && typeof worldPosition.length === 'number',
        'Has worldPosition'
      );
      tapeContext.ok(
        displayPosition && typeof displayPosition.length === 'number',
        'Has displayPosition'
      );

      const bounds = imageData.getBounds();
      tapeContext.ok(
        worldPosition[0] >= bounds[0] - 1e-3 &&
          worldPosition[0] <= bounds[1] + 1e-3,
        'worldPosition x is within bounds'
      );
      tapeContext.ok(
        worldPosition[1] >= bounds[2] - 1e-3 &&
          worldPosition[1] <= bounds[3] + 1e-3,
        'worldPosition y is within bounds'
      );
      tapeContext.ok(
        worldPosition[2] >= bounds[4] - 1e-3 &&
          worldPosition[2] <= bounds[5] + 1e-3,
        'worldPosition z is within bounds'
      );
      tapeContext.ok(
        displayPosition[2] >= 0.0 && displayPosition[2] <= 1.0,
        'displayPosition z is normalized'
      );
    })
    .finally(() => {
      gc.releaseResources();
    });
});
