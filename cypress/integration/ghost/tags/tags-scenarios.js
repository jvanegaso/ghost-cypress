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
        description: 'should create a tag with spetial characters in tag name ',
        fields: {
          tagName: '@@@@@@@@@@.....///()&&&&&&',
          tagColor: '',
          tagSlug : '',
          tagDescription : ''
        },
        oracles: {
          Url : '/tag',
          verfMsg: null
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
          },{
            only:true,
            type: 'mixed',
            description: 'should create a tag just with random name and a random paragraph description',
            fields: {
              tagName:{
                  type: 'random-pool',
                  origin: 'naugthy',
                  prop: 'naugthy'
                },
              tagColor: '',
              tagSlug : '',
              tagDescription : {
                type: 'random-pool',
                origin: 'naugthy',
                prop: 'naugthy'
              },
            },
            oracles: {
              Url : '/tag',
              verfMsg: null
            }
          },
          {
            type: 'apriori',
            description: 'should  creat a tag with a slug constant ',
            fields: {
              tagName: 'testing the test slug',
              tagColor: '',
              tagSlug : 'test-new-slug',
              tagDescription : ''
            },
            oracles: {
              Url : 'test-new-slug',
              verfMsg: null
            }
          },
          {
            //only:true,
            type: 'apriori',
            description: 'should  creat a tag with a slug numbers constant',
            fields: {
              tagName: 'testing the test slug numbers ',
              tagColor: '',
              tagSlug : '1111111112222333333',
              tagDescription : ''
            },
            oracles: {
              Url : '1111111112222333333',
              verfMsg: null
            }
          },
          {
            //only:true,
            type: 'apriori',
            description: 'should  creat a tag with a slug numbers with special characters constant',
            fields: {
              tagName: 'testing the test slug numbers ',
              tagColor: '',
              tagSlug : '112233@@@###%%%445566',
              tagDescription : ''
            },
            oracles: {
              Url : '112233-445566',
              verfMsg: null
            }
          },
          {
            //only:true,
            type: 'apriori',
            description: 'should  creat a tag with a tag name, tag color, tag slug and tag description',
            fields: {
              tagName: 'testing the test with all components',
              tagColor: '111111',
              tagSlug : '1234567890852',
              tagDescription : 'Tag description element with a diferent words with @ # spetial elemnts / , &&&'
            },
            oracles: {
              Url : '1234567890852',
              verfMsg: null
            }
          },
          {
            //only:true,
            type: 'apriori',
            description: 'should not creat a tag with a tag name with sql sentence - but this is correct. ',
            fields: {
              tagName: 'DROP TABLE tags --',
              tagColor: '111111',
              tagSlug : '',
              tagDescription : 'Tag description element with a diferent words with @ # spetial elemnts / , &&&'
            },
            oracles: {
              Url : '/drop-table-tags',
              verfMsg: null
            }
          },
        //   {
        //     only:true,
        //     type: 'mixed',
        //     description: 'should create a tag just with random name and a random paragraph description',
        //     fields: {
        //       tagName:{
        //           type: 'dynamic',
        //           command: 'fake.password',
        //           args: [191]
        //         },
        //       tagColor: '',
        //       tagSlug : '',
        //       tagDescription : {
        //         type: 'dynamic',
        //         command: 'lorem.paragraph',
        //         args: [3]
        //       }
        //     },
        //     oracles: {
        //         dinamicUrl : true,
        //         verfMsg: null
        //     }
        // },
        {
            type: 'apriori',
            description: 'should create a tag just with name',
            fields: {
              tagName: ',Test Name new tag',
              tagColor: '',
              tagSlug : '',
              tagDescription : ''
            },
            oracles: {
              Url : '/new',
              verfMsg: "Tag names can't start with commas"
            }
          },
        //Tag names can't start with commas
  ];