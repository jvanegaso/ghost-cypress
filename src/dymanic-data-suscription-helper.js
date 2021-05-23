import * as faker from 'faker';
import objectPath from 'object-path';

function fillInput(input, value, resolve) {
  const isRawString = typeof value === 'string';
  if (isRawString) {
    if (!value && value.length === 0) {
      return resolve(input);
    }
    input.type(value, { parseSpecialCharSequences: false });
    return resolve(input);
  }
}

function resolveInput(input, inputOpts, scenarioType, config) {
  return new Promise((resolve, reject) => {
 //   input.scrollIntoView().focus().clear();

    if (scenarioType === 'apriori') {
      return fillInput(input, inputOpts, resolve);
    }

    if (scenarioType === 'mixed') {
      const { type, value } = inputOpts;
      if (type === 'apriori') {
        return fillInput(input, value, resolve);
      }

      if (type === 'dynamic') {
        const { command = null, args = null } = inputOpts;
        let dynamicValue = null;
        const fakerFunc = objectPath.get(faker, command);
        if (args) {
          dynamicValue = fakerFunc([...args]);
        } else {
          dynamicValue = fakerFunc();
        }
        return fillInput(input, dynamicValue, resolve);
      }

      if (type === 'fixture') {
        return fillInput(input, config[inputOpts.prop], resolve);
      }
    }
  });
}

function getScenarios(scenarios) {
  const onlyIndex = scenarios.findIndex(sc => sc.only === true);
  if (onlyIndex > -1) {
    return [scenarios[onlyIndex]];
  }
  const included = scenarios.filter(sc => sc.exclude !== true);
  return included;
};

export default {
  resolveInput,
  getScenarios
};