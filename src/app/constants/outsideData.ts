
export const DATA = [
    {
        name: 'root1',
        subTitle: 'the root',
        children: [
            {
                name: 'child1.1',
                subTitle: 'a good child'
            }, {
                name: 'child1.2',
                subTitle: 'a bad child',
            }
        ]
    },
    {
      name: 'root2',
      subTitle: 'the second root',
      children: [
        {
          name: 'child2.1',
          subTitle: 'new and improved'
        }, {
          name: 'child2.2',
          subTitle: 'new and improved2',
          children: [
              {
                  name: 'subsub',
                  subTitle: 'subsub',
                  children: []
              }
          ]
        }
      ]
    },
    {
      name: 'root3',
      subTitle: 'the third root',
    },
    { 
      name: 'root4', 
      subTitle: 'the four root',
      children: [] 
    },
    { 
      name: 'root5', 
      subTitle: 'the five root',
      children: null 
    }
];