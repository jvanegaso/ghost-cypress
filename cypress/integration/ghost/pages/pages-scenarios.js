export default [
  {
    type: 'apriori',
    description: 'Should display an toast message when page are plublished, and tittle page is empty',
    fields: {
      pageTitle: 'Pagina prueba'
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
        args: [50]
      }
    },
    oracles: {
      toastMsg: 'Published'
    }
  }
];