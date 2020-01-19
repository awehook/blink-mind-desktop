export function WindowData(files) {
  this.files = files;

  this.addFiles = filePath => {
    this.files.push(filePath);
  };
}
