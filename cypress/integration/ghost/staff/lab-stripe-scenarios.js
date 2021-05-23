export default [
    {
      type: 'apriori',
      description: 'should show member payment insecure key only one value',
      fields: {
        payment: '1'
      },
      oracles: {
        paymentMsg: 'Invalid secure key'
      }
    },

    {
      type: 'mixed',
      description: 'should show member payment insecure key value faker email',
      fields: {
        payment: {
          type: 'dynamic',
          command: 'internet.email'
        }
      },
      oracles: {
        paymentMsg: 'Invalid secure key'

      }
    },
    {
      type: 'mixed',
      description: 'should show error message whether has more than 150 characters',
      fields: {
        payment: {
          type: 'dynamic',
          command: 'datatype.string',
          args: [200]
        }
      },
      oracles: {
        paymentMsg: 'Invalid secure key'

      }
    },


  

  ];