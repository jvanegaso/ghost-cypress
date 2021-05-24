export default [
    {
      type: 'apriori',
      description: 'create a post with a post title',
      fields: {
        postTitle: 'Testing a new post',
        postDescription: 'testing description element'
      },
      oracles: {
        verfMsgButton: 'Update'
      }
    },
    {
        type: 'apriori',
        description: 'should create a post title is empty',
        fields: {
          postTitle: ' ',
          postDescription: ' '
        },
        oracles: {
          verfMsgButton: 'Update'
        }
      },
      {
          type: 'apriori',
          description: 'should create a post with numbers like a title ',
          fields: {
            postTitle: '12345678',
            postDescription: ' '
          },
          oracles: {
            verfMsgButton: 'Update'
          }
        },
        {
            type: 'apriori',
            description: 'should create a post with special characters like a title ',
            fields: {
              postTitle: '12@#$%',
              postDescription: ' '
            },
            oracles: {
              verfMsgButton: 'Update'
            }
          },
          {
              type: 'apriori',
              description: 'should create a post with special characters like a title ',
              fields: {
                postTitle: 'Drop table posts',
                postDescription: ' '
              },
              oracles: {
                verfMsgButton: 'Update'
              }
            }
        
];