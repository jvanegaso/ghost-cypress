export default [
  {
    type: 'apriori',
    description: 'should show error message whether full name and email are both empty',
    fields: {
      fullName: '',
      email: ''
    },
    oracles: {
      buttonText: 'Retry',
      nameMsg: 'Please enter a name.',
      mailMsg: 'Please supply a valid email address'
    }
  },
  {
    type: 'mixed',
    description: 'should show error message whether full name has more than 91 characters',
    fields: {
      fullName: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [200]
      },
      email: {
        type: 'dynamic',
        command: 'internet.email',
      }
    },
    oracles: {
      buttonText: 'Retry',
      nameMsg: 'Name is too long',
      mailMsg: null
    }
  },
  {
    type: 'mixed',
    description: 'should show an error message whether the name is correct, but email is not valid',
    fields: {
      fullName: {
        type: 'dynamic',
        command: 'name.findName',
      },
      email: {
        type: 'dynamic',
        command: 'datatype.string',
      }
    },
    oracles: {
      buttonText: 'Retry',
      nameMsg: null,
      mailMsg: 'Please supply a valid email address'
    }
  },
  {
    type: 'mixed',
    description: 'should show saved message whether name and email are changed successfully',
    fields: {
      fullName: {
        type: 'dynamic',
        command: 'name.findName',
      },
      email: {
        type: 'fixture',
        prop: 'usuario',
      }
    },
    oracles: {
      buttonText: 'Saved',
      nameMsg: null,
      mailMsg: null
    }
  }
];