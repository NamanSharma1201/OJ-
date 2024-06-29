import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import fs from "fs";
import { exec } from "child_process";

export const executeCode = async function (req, res) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const { code, input } = req.body;

  if (!code) {
    return res.render("home", { output: "Error: Code required", code, input });
  }

  const inputPath = path.join(__dirname, "../Inputs");
  const codePath = path.join(__dirname, "../Codes");
  const outputPath = path.join(__dirname, "../Outputs");

  const id = uuid();
  const fileName = path.join(codePath, `${id}.cpp`);
  const inputfile = path.join(inputPath, `${id}.txt`);
  const outputfile = path.join(outputPath, `${id}.exe`);

  try {
    fs.writeFileSync(fileName, code);
    fs.writeFileSync(inputfile, input);

    const compileCode = new Promise((resolve, reject) => {
      exec(
        `g++ ${fileName} -o ${outputfile} && cd ${outputPath} && ${id}.exe < ${inputfile}`,
        (error, stdout, stderr) => {
          if (error) {
            reject({ error, stderr });
          } else if (stderr) {
            reject(stderr);
          } else {
            resolve(stdout);
          }
        }
      );
    });

    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Execution timed out")), 5000);
    });

    const output = await Promise.race([timeout, compileCode]);

    res.render("home", { output, code, input });
  } catch (err) {
    console.error("Error executing code:", err);
    res.render("home", { output: `Error: ${err}`, code, input });
  } finally {
    try {
      const filesToDelete = [fileName, inputfile, outputfile];
      filesToDelete.forEach((file) => {
        fs.unlinkSync(file);
      });
    } catch (deleteErr) {
      console.error("Error deleting files:", deleteErr);
    }
  }
};
