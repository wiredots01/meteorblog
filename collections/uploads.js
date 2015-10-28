var createThumb = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('100', '100').stream().pipe(writeStream);
};

var createMedium = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('350', '200').stream().pipe(writeStream);
};

var createLarge = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('500', '500').stream().pipe(writeStream);
};



Images = new FS.Collection("images", {
  stores: [
  	new FS.Store.FileSystem("thumbs", {path: "~/uploads/thumbs", transformWrite: createThumb }),
  	new FS.Store.FileSystem("medium", {path: "~/uploads/medium", transformWrite: createMedium }),
  	new FS.Store.FileSystem("large", {path: "~/uploads/large", transformWrite: createLarge }),
  	new FS.Store.FileSystem("images", {path: "~/uploads"})
  ]
});