#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, "..");
const packageJsonPath = path.join(projectRoot, "package.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query, defaultValue) {
  return new Promise((resolve) => {
    const question = defaultValue ? `${query} (${defaultValue}) ` : `${query} `;
    rl.question(question, (answer) => {
      resolve(answer || defaultValue);
    });
  });
}

async function main() {
  console.log("Welcome to the project setup script!");

  const projectName = await askQuestion(
    "What would you like to name your project?",
    "my-new-project"
  );

  console.log("How should dependencies be installed?");
  console.log("1. Install latest versions of all dependencies");
  console.log("2. Stick to the versions in package.json");
  const installChoice = await askQuestion("Enter your choice (1 or 2):", "2");

  rl.close();

  updatePackageJson(projectName);

  if (installChoice === "1") {
    installDependencies("latest");
  } else {
    installDependencies("exact");
  }

  initializeGit();
  createEnvFile();
  selfDestruct();
}

function updatePackageJson(projectName) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  packageJson.name = projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Project name updated to "${projectName}" in package.json`);
}

function installDependencies(choice) {
  console.log("Installing dependencies...");
  const command = choice === "latest" ? "pnpm update --latest" : "pnpm install";

  const installProcess = exec(command, { cwd: projectRoot });

  installProcess.stdout.on("data", (data) => {
    console.log(data);
  });

  installProcess.stderr.on("data", (data) => {
    console.error(data);
  });

  installProcess.on("close", (code) => {
    if (code === 0) {
      console.log("Dependencies installed successfully.");
    } else {
      console.error(`Dependency installation failed with code ${code}.`);
    }
  });
}

function initializeGit() {
  exec("git init", { cwd: projectRoot }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error initializing git: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Git init stderr: ${stderr}`);
      return;
    }
    console.log(`Git stdout: ${stdout}`);
    console.log("Git repository initialized.");
  });
}

function createEnvFile() {
  const envContent = `
# Example .env file
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
    `;
  fs.writeFileSync(path.join(projectRoot, ".env.example"), envContent.trim());
  console.log(".env.example file created with placeholder values.");
}

function selfDestruct() {
  try {
    // Remove bin and setup script from package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    delete packageJson.bin;
    delete packageJson.scripts.setup;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("Cleaned up package.json.");

    // Delete the cli directory
    fs.rmSync(path.join(__dirname), { recursive: true, force: true });
    console.log("CLI directory removed.");
  } catch (error) {
    console.error("Error during self-destruction:", error);
  }
}

main().catch((err) => {
  console.error("An error occurred:", err);
  rl.close();
});
