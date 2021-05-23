export default [
    {
      type: 'apriori',
      description: 'should display an error message - tag name is empty',
      fields: {
        tagName: '',
        tagColor: '',
        tagSlug : '',
        tagDescription : ''
      },
      oracles: {
        Url : '/new',
        verfMsg: 'You must specify a name for the tag'
      }
    },
    {
        type: 'apriori',
        description: 'should create a tag just with name',
        fields: {
          tagName: 'Test Name new tag',
          tagColor: '',
          tagSlug : '',
          tagDescription : ''
        },
        oracles: {
          Url : '/test-name-new-tag',
          verfMsg: null
        }
      },
      {
          type: 'mixed',
          description: 'should create a tag just with random name',
          fields: {
            tagName:{
                type: 'dynamic',
                command: 'lorem.words',
                args: [3]
              },
            tagColor: '',
            tagSlug : '',
            tagDescription : ''
          },
          oracles: {
            dinamicUrl : true,
            verfMsg: null
          }
        },
        {
            type: 'apriori',
            description: 'should display an error message because de color doesnt exist',
            fields: {
              tagName: 'Test Name new tag',
              tagColor: 'rrrrrr',
              tagSlug : '',
              tagDescription : ''
            },
            oracles: {
              Url : '/new',
              verfMsg: 'The color should be in valid hex format'
            }
          },
          {
            type: 'apriori',
            description: 'should create a tag with name and specific color ',
            fields: {
              tagName: 'Test Name new tag',
              tagColor: '111111',
              tagSlug : '',
              tagDescription : ''
            },
            oracles: {
              Url : '/test-name-new-tag',
              verfMsg: null
            }
          },
          {
            type: 'apriori',
            description: 'should create a tag with name , specific color and description ',
            fields: {
              tagName: 'Test Name new tag',
              tagColor: '111111',
              tagSlug : '',
              tagDescription : 'This is a test for a new tag an description'
            },
            oracles: {
              Url : '/test-name-new-tag',
              verfMsg: null
            }
          },
          {
            type: 'mixed',
            description: 'should create a tag just with random name and a random paragraph description',
            fields: {
              tagName:{
                  type: 'dynamic',
                  command: 'lorem.words',
                  args: [3]
                },
              tagColor: '',
              tagSlug : '',
              tagDescription : {
                type: 'dynamic',
                command: 'lorem.paragraph',
                args: [3]
              }
            },
            oracles: {
              dinamicUrl : true,
              verfMsg: null
            }
          }
          
    // {
    //   type: 'mixed',
    //   only: true,
    //   description: 'should display Password incorrect msg, and Retry text, whether user and password are naughty data',
    //   fields: {
    //     user: {
    //       type: 'random-pool',
    //       origin: 'naugthy',
    //       prop: 'naugthy'
    //     },
    //     password: {
    //       type: 'random-pool',
    //       origin: 'naugthy',
    //       prop: 'naugthy'
    //     }
    //   },
    //   oracles: {
    //     buttonText: 'Retry',
    //     errorMsg: 'Please fill out the form to sign in.'
    //   }
    // }
  ];