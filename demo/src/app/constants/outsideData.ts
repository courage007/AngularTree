
export const DATA = [
    {
        id: 1,
        name: 'root1',
        subTitle: 'the root',
        type: 'type1',
        children: [
            {
                id: 2,
                name: 'child1.1',
                type: 'type2',
                subTitle: 'a good child'
            }, {
                id: 3,
                name: 'child1.2',
                subTitle: 'a good child',
            }, {
              id: 4,
              name: 'child1.3',
              subTitle: 'a good child',
            }, {
              id: 5,
              name: 'child1.4',
              subTitle: 'a good child',
            }, {
              id: 6,
              name: 'child1.5',
              subTitle: 'a good child',
            }
        ]
    },
    {
      id: 7,
      name: 'root2',
      subTitle: 'the second root',
      children: [
        {
          id: 8,
          name: 'child2.1',
          subTitle: 'new and improved'
        }, {
          id: 9,
          name: 'child2.2',
          subTitle: 'new and improved2',
          children: [
              {
                  id: 10,
                  type: 'type3',
                  name: 'subsub',
                  subTitle: 'subsub',
                  children: []
              }
          ]
        }
      ]
    },
    {
      id: 11,
      name: 'root3',
      subTitle: 'the third root',
    },
    { 
      id: 12,
      name: 'root4', 
      subTitle: 'the fourth root',
      children: [] 
    },
    { 
      id: 13,
      name: 'root5', 
      subTitle: 'the fifth root',
      children: null 
    }
];
let id = 0;
function uuid() {
  id = id + 1;
  return id;
}