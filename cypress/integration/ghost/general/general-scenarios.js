export default [
    {
        type: 'apriori',
        description: 'Should not save with input empty',
        fields: {
            urlFacebook: '',
            urlTwitter: ''
        },
        oracles: {
            toastMsg: 'Saved'
        }
    },

    {
        type: 'apriori',
        description: 'Twitter input must be requiered',
        fields: {
            urlFacebook: 'Pagina-prueba-Facebook',
            urlTwitter: ''
        },
        oracles: {
            toastMsg: 'Saved'
        }
    },

    {
        type: 'apriori',
        description: 'Facebook input must be requiered',
        fields: {
            urlFacebook: '',
            urlTwitter: 'Pagina-prueba-Twiter'
        },
        oracles: {
            toastMsg: 'Saved'
        }
    },

    {
        type: 'mixed',
        description: 'Url facebook it randonm, do not save',
        fields: {
            urlFacebook: {
                type: 'dynamic',
                command: 'internet.url'
            },
            urlTwitter: {
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
        description: 'Input url facebook more than 100 caracthers',
        fields: {
            urlFacebook: {
            type: 'dynamic',
            command: 'datatype.string',
            args: [100]
          },
          urlTwitter: {
            type: 'dynamic',
            command: 'internet.password'
          }
        },
        oracles: {
          buttonText: 'Retry',
          errorMsg: 'Please fill out the form to sign in.'
        }
      }
    
];