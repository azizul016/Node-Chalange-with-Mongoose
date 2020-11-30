const fs = require("fs");
const path = require("path");
const myFilePath = path.join(__dirname, "files", "sample.txt");
const newFilePath = path.join(__dirname, "files", "sample2.txt");
/////adding a new file
if (fs.existsSync(myFilePath)) {
  fs.appendFile(myFilePath, " I am programmer", function (){
      console.log("New File added");
  });
}
else{
    fs.writeFile(myFilePath, "Hi", function(){
        console.log("New file added");
    })
}

//// removing file
if(fs.existsSync(myFilePath)){
    fs.unlink(myFilePath, function(){
        console.log("File is removed");
    })
}else{
    console.log("File is already removed");
}

//Changed file name;
if (fs.existsSync(myFilePath)) {
  fs.rename(myFilePath, newFilePath, function () {
    console.log("File name is changed");
  });
}else{
    console.log("File name already changed");
}

////created new file;
const myNewFilePath = path.join(__dirname, "folder", "sample.txt");

const myDirPath = path.join(__dirname, "folder");

if (!fs.existsSync(myDirPath)) {
  fs.mkdir(myDirPath, {}, function () {
    console.log("New folder created");

    if (fs.existsSync(myNewFilePath)) {
      fs.appendFile(myNewFilePath, " This is new text", function () {
        console.log("New text added");
      });
    } else {
      fs.writeFile(myNewFilePath, "New text file created", function () {
        console.log("new text file created");
      });
    }
  });
} else {
  console.log("Folder is already created");
  if (fs.existsSync(myNewFilePath)) {
    fs.appendFile(myNewFilePath, " This is new text", function () {
      console.log("New text added");
    });
  } else {
    fs.writeFile(myNewFilePath, "New text file created", function () {
      console.log("new text file created");
    });
  }
}

////folder removed

////for seeing what is file;
fs.readdir(myDirPath, function (err, files) {
  if (err) {
    console.log(err.message);
    return;
  }
  for (const file of files) {
    console.log(path.join(__dirname, "folder", file));
  }
});

//////for removing folder at first read file then remove file and then folder

if(fs.existsSync(myDirPath)){
  fs.readdir(myDirPath, "utf-8", function (err, files) {
    if (err) {
      console.log(err.message);
      return;
    }
    for (const file of files) {
      fs.unlinkSync(path.join(__dirname, "folder", file));
    }
    fs.rmdir(myDirPath, function (err) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("Directory is removed");
    });
  });
}else{
  console.log("Directory is already removed");
}


// fs.createWriteStream()