window.addEventListener('DOMContentLoaded', function () {
  var image = document.getElementById('image');
  var cropBoxData;
  var canvasData;
  var cropper;

  $('#modal').on('shown.bs.modal', function () {
    cropper = new Cropper(image, {
      autoCropArea: 0.5,
      dragMode: 'move',
      aspectRatio: 3 / 3,
      restore: false,
      guides: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      ready: function () {
        cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
      }
    });
  }).on('hidden.bs.modal', function () {
    cropBoxData = cropper.getCropBoxData();
    canvasData = cropper.getCanvasData();
    cropper.destroy();
  });
});
