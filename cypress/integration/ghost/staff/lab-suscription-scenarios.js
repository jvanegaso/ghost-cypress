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

    {
      type: 'mixed',
      description: 'should show message member monthly price faker email',
      fields: {
        monthly: {
          type: 'dynamic',
          command: 'internet.email'
        }
      },
      oracles: {
        monthlyMsg: 'Subscription amount must be at least $1.00'

      }
    },


  ];