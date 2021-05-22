const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const compareImages = require('resemblejs/compareImages');
const { getCurrentTestFolder, getReportFileContent, createFolder } = require('./util');

const resembleOptions = {
  output: {
    errorColor: {
      red: 255,
      green: 0,
      blue: 255
    },
    errorType: 'movement',
    largeImageThreshold: 1200,
    useCrossOrigin: false,
    outputDiff: true
  },
  scaleToSameSize: true,
  ignore: 'antialiasing'
};

async function processReport() {
  let newReport = {};
  try {
    const currentFolder = await getCurrentTestFolder();
    const report = await getReportFileContent(currentFolder);

    const features = report.features;
    if (!Array.isArray(features) || features.length === 0) {
      throw new Error('There are no features to review');
    }

    // features.forEach(async feature => {
    for await (const feature of features) {
      const scenarios = feature.scenarios;
      if (!Array.isArray(scenarios) || scenarios.length === 0) {
        console.warn('There are no scenarios to review in feature ', feature.name);
        return;
      }

      // scenarios.forEach(async scenario => {
      for await (const scenario of scenarios) {
        let steps = scenario.steps;
        if (!Array.isArray(scenarios) || scenarios.length === 0) {
          console.warn(`There are no steps for scenario ${scenario.name} to review in feature ${feature.name}`);
          return;
        }

        // steps.forEach(async (step, index) => {
        for await (const step of steps) {
          if (step.versions.length < 2) {
            step.hasComparison = false;
            console.warn(`There are no versions to compare on step ${step.name} for scenario ${scenario.name} to review in feature ${feature.name}`);
            break;
          }

          const comparison = await compareImages(
            fs.readFileSync(step.versions[0].img),
            fs.readFileSync(step.versions[1].img),
            resembleOptions
          );

          const imgId = uuidv4();
          const comparisonFolder = `${currentFolder}/comparison`;
          await createFolder(comparisonFolder);
          const comparisonImgPath = `${comparisonFolder}/${imgId}.png`;
          fs.writeFileSync(comparisonImgPath, comparison.getBuffer());

          step.hasComparison = true;
          step.comparisonImage = comparisonImgPath;
          step.comparisonData = {
            isSameDimensions: comparison.isSameDimensions,
            dimensionDifference: comparison.dimensionDifference,
            rawMisMatchPercentage: comparison.rawMisMatchPercentage,
            misMatchPercentage: comparison.misMatchPercentage,
            diffBounds: comparison.diffBounds,
            analysisTime: comparison.analysisTime
          };
        }
      }
    }

    newReport = { ...report };
    console.log('COMPLETED');
    console.log(JSON.stringify(newReport, null, 2));
    console.log('COMPLETED');
    return newReport;

  } catch (err) {
    console.error('An error ocurred on export-report:');
    console.error(err.message);
  }
}

(async () => {
  console.log('BEFORE REPORT');
  const report = await processReport();
  const currentFolder = await getCurrentTestFolder();
  fs.writeFileSync(`${currentFolder}/final_report.js`, `var report = ${JSON.stringify(report)}`);
  fs.copyFileSync(
    path.resolve('templates/report-index.js'),
    `${currentFolder}/report-index.js`);
  fs.copyFileSync(
    path.resolve('templates/report.html'),
    `${currentFolder}/report.html`);
  console.log('AFTER REPORT');
})();