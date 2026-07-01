const { spawnSync } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const androidDir = path.join(projectRoot, 'android');
const sdkRoot = 'C:\\Code\\sdk';

const env = {
  ...process.env,
  ANDROID_HOME: sdkRoot,
  JAVA_HOME: 'C:\\Program Files\\Microsoft\\jdk-17.0.19.10-hotspot',
};

// Add android dir and SDK tools to PATH so gradlew.bat and adb are found
env.PATH = [
  `${sdkRoot}\\platform-tools`,
  `${sdkRoot}\\emulator`,
  androidDir,
  env.PATH,
].join(';');

// Call the react-native CLI directly through node to avoid PATH/shell issues
const rnCli = path.join(projectRoot, 'node_modules', '@react-native-community', 'cli', 'build', 'bin.js');

const result = spawnSync(process.execPath, [rnCli, 'run-android', '--port', '8081'], {
  env,
  cwd: projectRoot,
  stdio: 'inherit',
});

process.exit(result.status || 0);
