export default [
    {
      type: 'apriori',
      description: 'should show message member monthly price is empty',
      fields: {
        monthly: ''
      },
      oracles: {
        monthlyMsg: 'Subscription amount must be at least $1.00'
      }
    },

  ];