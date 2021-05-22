const { createFolder, createTempTestFile } = require('./util');

const reportsPath = 'reports';

(async () => { 
  try {
    const currentTime = Date.now();
    await createFolder(reportsPath);
    console.info('REPORTS FOLDER WAS CREATED');
    await createFolder(`${reportsPath}/${currentTime}`);
    console.info('TEST FOLDER WAS CREATED');
    await createTempTestFile(currentTime);
    console.info('TEMP FILE WAS CREATED :: ', currentTime);
  } catch (err) {
    console.error(`An error occurred: ${err}`);
  }
})();