const fs = require('fs');
const path = require('path');

const reportFilePath = 'report.js';

function createFolder(pathname) {
  return new Promise((resolve, reject) => {
    const pathName = resolvePath(pathname);
    if (!fs.existsSync(pathName)) {
      fs.mkdir(pathName, { recursive: true }, (err) => {
        if (err) {
          console.log(`There was an error creating the folder: ${pathname}`);
          return reject(err);
        }
        resolve(true);
      });
    }
    return resolve(true);
  });
}

function createTempTestFile(testFolder) {
  const tempFilePath = resolvePath('current-test.txt');
  return new Promise((resolve, reject) => {
    fs.unlink(tempFilePath, (err) => {
      fs.writeFile(tempFilePath, testFolder, (error) => {
        if (error) {
          console.log(`There was an error creating the temporal file: ${tempFilePath}`);
          return reject(error);
        }
        resolve(true);
      });
    });
  });
}

async function getCurrentTestFolder() {
  try {
    const reportPath = await getCurrentReportId();
    return resolvePath(`reports/${reportPath}`);
  } catch (err) {
    console.log(`There was an error reading the temporal file: ${tempFilePath}`);
    throw err;
  }
}

function getCurrentReportId() {
  return new Promise((resolve, reject) => {
    fs.readFile(resolvePath('current-test.txt'), 'utf-8', (err, result) => {
      if (err) {
        console.log(`There was an error reading the temporal file: ${tempFilePath}`);
        return reject(err);
      }
      resolve(result);
    });
  });
}

function getReportFileContent(currentFolder) {
  return new Promise((resolve, reject) => {
    const reportPath = resolvePath(`${currentFolder}/${reportFilePath}`);
    fs.readFile(reportPath, 'utf-8', (err, result) => {
      try {
        if (err) {
          return resolve(null);
        }
        const parsed = JSON.parse(result);
        return resolve(parsed);
      } catch (err) {
        console.error('Error on getReportFileContent:');
        console.error(err);
        return resolve(null);
      }
    });
  });
}

function writeStep(stepData, img, version) {
  return new Promise(async (resolve, reject) => {
    try {
      const currentFolder = await getCurrentTestFolder();
      let report = await getReportFileContent(currentFolder);
      const reportId = await getCurrentReportId();
      if (!report) {
        report = {
          reportId,
          features: []
        }
      }
      report = setFeatureData(report, stepData, img, version);
      fs.writeFile(`${currentFolder}/${reportFilePath}`, JSON.stringify(report), (err, result) => {
        if (err) {
          console.error('Error writing new report:');
          console.error(err);
          return reject(err);
        }
        console.error('Report updated');
        return resolve(true);
      });
    } catch (err) {
      console.error('Error on writeStep:');
      console.error(err);
      reject(err);
    }
  });
}

function setFeatureData(report, stepData, img, version) {
  const newReport = { ...report };
  const { features } = newReport;

  const { feature, scenario, step } = stepData;
  const featureName = feature.name;
  const scenarioName = scenario.name;
  const stepName = `${step.keyword}${step.text}`;

  const featureIndex = features.findIndex(feat => feat.name === featureName);
  if (featureIndex === -1) {
    newReport.features.push(
      createNewFeature(featureName, scenarioName, stepName, version, img)
    );
    return newReport;
  }

  const currentFeature = features[featureIndex];
  const scenarioIndex = currentFeature.scenarios.findIndex(scen => scen.name === scenarioName);
  if (scenarioIndex === -1) {
    currentFeature.scenarios.push({
      name: scenarioName,
      steps: [createNewStep(stepName, version, img)]  
    });
    return newReport;
  }

  const currentScenario = currentFeature.scenarios[scenarioIndex];
  const stepIndex = currentScenario.steps.findIndex(st => st.name === stepName);
  if (stepIndex === -1) {
    currentScenario.steps.push({
      name: stepName,
      versions: [{ version, img }]
    });
    return newReport;
  }

  const currentStep = currentScenario.steps[stepIndex];
  currentStep.versions.push({ version, img });
  return newReport;
}

function createNewFeature(feature, scenario, step, version, img) {
  return {
    name: feature,
    scenarios: [
      {
        name: scenario,
        steps: [createNewStep(step, version, img)]
      }
    ]
  };
}

function createNewStep(step, version, img) {
  return {
    name: step,
    versions: [{ version, img }]
  }
}

function resolvePath(pathName) {
  const __dirname = path.resolve();
  return path.resolve(__dirname, pathName);
}


module.exports = {
  createFolder,
  createTempTestFile,
  getCurrentTestFolder,
  writeStep,
  getReportFileContent,
  getCurrentReportId
};