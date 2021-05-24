export default [
    {
        type: 'apriori',
        description: 'Should not save with input empty',
        fields: {
            getmetaTittleInput: '',
            getmetaDescriptionInput: ''
        },
        oracles: {
            toastMsg: 'Saved'
        }
    },

    {
        type: 'apriori',
        description: 'Metadata Tittle input must be requiered',
        fields: {
            getmetaTittleInput: 'Metadata Prueba',
            getmetaDescriptionInput: ''
        },
        oracles: {
            toastMsg: 'Saved'
        }
    },


    {
        type: 'apriori',
        description: 'Metadata Description input must be requiered',
        fields: {
            getmetaTittleInput: '',
            getmetaDescriptionInput: 'Pagina-prueba-Twiter'
        },
        oracles: {
            toastMsg: 'Saved'
        }
    },
    
];