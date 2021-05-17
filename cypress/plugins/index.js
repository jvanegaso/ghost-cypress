/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { getCurrentTestFolder, createFolder, writeStep } = require('../../src/util');
const dict = require('../../src/specs-dict');

module.exports = (on, config) => {
  on('after:screenshot', async (details) => {
    try {
      const imgId = uuidv4();
      const currentFolder = await getCurrentTestFolder();

      const { path } = details;
      let fileNameIndex = path.lastIndexOf('/');
      if (fileNameIndex === -1) {
        fileNameIndex = path.lastIndexOf('\\');
      }

      const fileName = path.substring(fileNameIndex + 1);

      const fileParts = fileName.split('__v');

      console.log(`
      ***************************************
        \n
        path: \n\t${path}, \n
        fileName: \n\t${fileName}, \n
        fileParts \n\t${fileParts} \n
        \n
      
      ***************************************
      `)
      const appVersion = fileParts[1].replace('.png', '').replace(/\(.*\)/g, '').trim();
      const stepInfo = fileParts[0].split('-');

      const imgDesFolder = `${currentFolder}/${appVersion}`;

      await createFolder(imgDesFolder);
      const imgPath = `${imgDesFolder}/${imgId}.png`;
      fs.copyFileSync(details.path, imgPath);

      const dictStep = dict[stepInfo[2]];
      const firstSpace = dictStep.indexOf(' ');
      const keyWord = dictStep.substring(0, firstSpace);
      const text = dictStep.substring(firstSpace);

      const stepData = {
        feature: {
          name: dict[stepInfo[0]]
        },
        scenario: {
          name: dict[stepInfo[1]]
        },
        step: {
          keyword: keyWord,
          text: text
        }
      };


      await writeStep(stepData, imgPath, appVersion);
      return ({ path: imgPath });
    } catch (e) {
      console.error('*******************************\n');
      console.error('There was an error creating a screenshot');
      console.error(e.message);
      console.error('*******************************\n');
    }
  });
}

// /**
//  * @type {Cypress.PluginConfig}
//  */
// // eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }
