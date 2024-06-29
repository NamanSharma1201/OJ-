import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const makeFolders = () => {
  const inputPath = path.join(__dirname, "../Inputs");
  const codePath = path.join(__dirname, "../Codes");
  const outputPath = path.join(__dirname, "../Outputs");

  if (!fs.existsSync(inputPath)) {
    fs.mkdirSync(inputPath, { recursive: true });
  }

  if (!fs.existsSync(codePath)) {
    fs.mkdirSync(codePath, { recursive: true });
  }

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
};

export default makeFolders;
