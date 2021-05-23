export default [
  {
    type: 'apriori',
    description: 'should display an error message and Retry text whether user and password are empty',
    fields: {
      user: '',
      password: ''
    },
    oracles: {
      buttonText: 'Retry',
      errorMsg: 'Please fill out the form to sign in.'
    }
  },
  {
    type: 'mixed',
    description: 'should display an error message and Retry text whether user is empty and a password is set',
    fields: {
      user: {
        value: '',
        type: 'apriori'
      },
      password: {
        type: 'dynamic',
        command: 'internet.password'
      }
    },
    oracles: {
      buttonText: 'Retry',
      errorMsg: 'Please fill out the form to sign in.'
    }
  },
  {
    type: 'mixed',
    description: 'should display an error message and Retry text whether user is a valid email and a password is empty',
    fields: {
      user: {
        type: 'dynamic',
        command: 'internet.exampleEmail'
      },
      password: {
        value: '',
        type: 'apriori'
      }
    },
    oracles: {
      buttonText: 'Retry',
      errorMsg: 'Please fill out the form to sign in.'
    }
  },
  {
    type: 'mixed',
    description: 'should display an error message and Retry text whether user is a text with more than 192 characters and a password is not empty',
    fields: {
      user: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [192]
      },
      password: {
        type: 'dynamic',
        command: 'internet.password'
      }
    },
    oracles: {
      buttonText: 'Retry',
      errorMsg: 'Please fill out the form to sign in.'
    }
  },
  {
    type: 'mixed',
    description: 'should display Password incorrect msg, and Retry text, whether user is correct but the password has more than 61 chars',
    fields: {
      user: {
        type: 'fixture',
        prop: 'usuario'
      },
      password: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [62]
      }
    },
    oracles: {
      buttonText: 'Retry',
      errorMsg: 'Your password is incorrect.'
    }
  },
  {
    type: 'mixed',
    only: true,
    description: 'should display Password incorrect msg, and Retry text, whether user and password are naughty data',
    fields: {
      user: {
        type: 'random-pool',
        origin: 'naugthy',
        prop: 'naugthy'
      },
      password: {
        type: 'random-pool',
        origin: 'naugthy',
        prop: 'naugthy'
      }
    },
    oracles: {
      buttonText: 'Retry',
      errorMsg: 'Please fill out the form to sign in.'
    }
  }
];