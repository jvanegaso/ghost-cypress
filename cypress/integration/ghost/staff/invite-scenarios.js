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
    
  ];