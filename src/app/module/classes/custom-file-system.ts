
export class CustomFileSystem {

  constructor(){}

  static publicPath(){
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    return dir
  }
  static exceededLimit(files:File[], sizeLimit: number) {
    return files.filter(file => file.size>sizeLimit);
  }
  // static fileListToFiles(fileList: FileList[]){
  //   fileList.filter()
  // }
}
