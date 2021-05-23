export default [
  {
    type: 'apriori',
    description: 'Should display an toast message when page are plublished, and tittle page is empty',
    fields: {
      pageTitle: ''
    },
    oracles: {
      toastMsg: 'Published'
    }
  },

  {
    type: 'mixed',
    description: 'Should display an toast message when page are plublished, and tittle page is filled',
    fields: {
      pageTitle: {
        type: 'dynamic',
        command: 'datatype.string',
        args: [5]
      }
    },
    oracles: {
      toastMsg: 'Published'
    }
  }
];