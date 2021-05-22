export default [
  {
    type: 'apriori',
    description: 'should show error messages whether old pass and new pass are empty',
    fields: {
      oldPass: '',
      newPass: '',
      verifyPass: ''
    },
    oracles: {
      buttonText: 'Retry',
      oldPassMsg: 'Your current password is required to set a new one',
      newPassMsg: 'Sorry, passwords can\'t be blank',
      verfPassMsg: null
    }
  },
  {
    type: 'mixed',
    description: 'should show error messages whether new pass and verification pass are different',
    fields: {
      oldPass: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [15]
      },
      newPass: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [20]
      },
      verifyPass: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [10]
      }
    },
    oracles: {
      buttonText: 'Retry',
      oldPassMsg: null,
      newPassMsg: null,
      verfPassMsg: 'Your new passwords do not match'
    }
  },
  {
    type: 'mixed',
    description: 'Should show an error whether the new password contains less than 10 characters',
    fields: {
      oldPass: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [10]
      },
      newPass: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [5]
      },
      verifyPass: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [5]
      }
    },
    oracles: {
      buttonText: 'Retry',
      oldPassMsg: null,
      newPassMsg: 'Password must be at least 10 characters long',
      verfPassMsg: 'Your new passwords do not match'
    }
  },
  {
    type: 'mixed',
    description: 'Should show an error whether the new password is insecure',
    fields: {
      oldPass: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [10]
      },
      newPass: {
        type: 'apriori',
        value: 'password123'
      },
      verifyPass: {
        type: 'apriori',
        value: 'password123'
      }
    },
    oracles: {
      buttonText: 'Retry',
      oldPassMsg: null,
      newPassMsg: 'Sorry, you cannot use an insecure password',
      verfPassMsg: null
    }
  },
  {
    type: 'mixed',
    description: 'Should show an error whether the new password is insecure',
    fields: {
      oldPass: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [10]
      },
      newPass: {
        type: 'apriori',
        value: '1234567890'
      },
      verifyPass: {
        type: 'apriori',
        value: '1234567890'
      }
    },
    oracles: {
      buttonText: 'Retry',
      oldPassMsg: null,
      newPassMsg: 'Sorry, you cannot use an insecure password',
      verfPassMsg: null
    }
  },
  {
    type: 'mixed',
    description: 'Should update the password if all the data is correct',
    fields: {
      oldPass: {
        type: 'fixture',
        prop: 'clave'
      },
      newPass: {
        type: 'fixture',
        prop: 'nuevaClave'
      },
      verifyPass: {
        type: 'fixture',
        prop: 'nuevaClave'
      }
    },
    oracles: {
      buttonText: 'Saved',
      oldPassMsg: null,
      newPassMsg: null,
      verfPassMsg: null
    }
  },
  {
    type: 'mixed',
    description: '(Reset password)',
    fields: {
      oldPass: {
        type: 'fixture',
        prop: 'nuevaClave'
      },
      newPass: {
        type: 'fixture',
        prop: 'clave'
      },
      verifyPass: {
        type: 'fixture',
        prop: 'clave'
      }
    },
    oracles: {
      buttonText: 'Saved',
      oldPassMsg: null,
      newPassMsg: null,
      verfPassMsg: null
    }
  },
];