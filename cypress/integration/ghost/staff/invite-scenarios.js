export default [
    {
      type: 'apriori',
      description: 'should show error message if email field is null',
      fields: {
        email: ''
      },
      oracles: {
        mailMsg: 'Please enter an email.'
      }
    },
    {
      type: 'apriori',
      description: 'should show error message if email field is more than 100 characters',
      fields: {
        email: 'aslfajslkdjflkajsldfkjalskdjflakjsdflkjaslkdjflkasjdlfkjaslkdfjlaksjdflñjañsldjflñaksjdfljasd@lajdflkajsdlfkjaslkdfjlkasjdflkjasldkfaksdjflkajsdfkljasldkfjalskdfjlkasf.com'
      },
      oracles: {
        buttonText: 'Retry',
        mailMsg: 'Invalid Email.'
      }
    },
  ];