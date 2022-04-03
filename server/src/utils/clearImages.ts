import fs from "fs";
import path from "path";

export const clearImages = () => {
  const directory = path.join(__dirname, "..", "..", "public");

  const isDirExists = fs.existsSync(directory);
  if (!isDirExists) {
    fs.mkdirSync(directory);
    return;
  }

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
};
