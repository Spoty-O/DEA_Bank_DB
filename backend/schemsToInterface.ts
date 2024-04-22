import pkg from "joi-to-typescript";
const { convertFromDirectory } = pkg;

async function types(): Promise<void> {
  // eslint-disable-next-line no-console
  console.log("Running joi-to-typescript...");

  // Configure your settings here
  const result = await convertFromDirectory({
    schemaDirectory: "./src/schemas",
    typeOutputDirectory: "./src/interfaces",
    debug: true,
  });

  if (result) {
    // eslint-disable-next-line no-console
    console.log("Completed joi-to-typescript");
  } else {
    // eslint-disable-next-line no-console
    console.log("Failed to run joi-to-typescript");
  }
}

types();
