export default {

  userInfoScenarios: [
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
    },
    {
      type: 'mixed',
      description: 'should show saved message whether name and email are changed successfully, even when name is naughty data',
      fields: {
        fullName: {
          type: 'random-pool',
          origin: 'naugthy',
          prop: 'naugthy'
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
    },
    {
      type: 'mixed',
      description: 'should show email error message and retry on save button whether the email is naughty data.',
      fields: {
        fullName: {
          type: 'random-pool',
          origin: 'naugthy',
          prop: 'naugthy'
        },
        email: {
          type: 'random-pool',
          origin: 'naugthy',
          prop: 'naugthy'
        }
      },
      oracles: {
        buttonText: 'Retry',
        nameMsg: null,
        mailMsg: 'Please supply a valid email address'
      }
    }
  ], 

  slugScenarios: [
    {
      type: 'apriori',
      description: 'should change the url of the page based on the slug',
      fields: {
        slug: 'user profile page'
      },
      oracles: {
        buttonText: null,
        slugResult: 'user-profile-page',
        slugError: null,
        newUrl: 'user-profile-page'
      }
    },
    {
      type: 'apriori',
      description: 'should change the url to user whether the new slug contains emojis',
      fields: {
        slug: '👾 🙇 💁 🙅 🙆 🙋 🙎 🙍 '
      },
      oracles: {
        buttonText: null,
        slugResult: 'user',
        slugError: null,
        newUrl: 'user'
      }
    },
    {
      type: 'mixed',
      description: 'should change @ and . by - when an email is passed',
      fields: {
        slug: {
          type: 'dynamic',
          command: 'internet.email'
        }
      },
      oracles: {
        buttonText: null,
        slugResult: 'dynamic',
        slugError: null,
        newUrl: 'dynamic'
      }
    }
  ],

  websiteScenarios: [
    {
      type: 'apriori',
      description: 'should show an error whether de URL is incorrect',
      fields: {
        website: 'wrong url'
      },
      oracles: {
        buttonText: 'Retry',
        urlError: 'Website is not a valid url'
      }
    },
    {
      type: 'apriori',
      description: 'should show an error whether de URL has emojis',
      fields: {
        website: '👾 🙇 💁 🙅 🙆 🙋 🙎 🙍 '
      },
      oracles: {
        buttonText: 'Retry',
        urlError: 'Website is not a valid url'
      }
    },
    {
      type: 'mixed',
      description: 'should show an error whether de URL is a naughty string',
      fields: {
        website: {
          type: 'random-pool',
          origin: 'naugthy',
          prop: 'naugthy'
        }
      },
      oracles: {
        buttonText: 'Retry',
        urlError: 'Website is not a valid url'
      }
    },
    {
      type: 'mixed',
      description: 'should allow store a well defined URL',
      fields: {
        website: {
          type: 'dynamic',
          command: 'internet.url'
        }
      },
      oracles: {
        buttonText: 'Save',
        urlError: ''
      }
    },
    {
      type: 'mixed',
      description: 'should allow store an email as a website',
      fields: {
        website: {
          type: 'dynamic',
          command: 'internet.email'
        }
      },
      oracles: {
        buttonText: 'Save',
        urlError: ''
      }
    },
    {
      type: 'apriori',
      description: 'should allow store an empty string as the website',
      fields: {
        website: ''
      },
      oracles: {
        buttonText: 'Save',
        urlError: ''
      }
    }
  ]
}