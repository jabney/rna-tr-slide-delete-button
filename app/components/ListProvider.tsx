import React, {useEffect, useState} from 'react';

export interface Item {
  id: string;
  name: string;
  description: string;
}

const dummyData: Item[] = [
  {
    id: '1',
    name: 'First Item',
    description: 'This is the first item in the list',
  },
  {
    id: '2',
    name: 'Second Item',
    description: 'This is the second item in the list',
  },
  {
    id: '3',
    name: 'Third Item',
    description: 'This is the third item in the list',
  },
  {
    id: '4',
    name: 'Fourth Item',
    description: 'This is the fourth item in the list',
  },
  {
    id: '5',
    name: 'Fifth Item',
    description: 'This is the fifth item in the list',
  },
  {
    id: '6',
    name: 'Sixth Item',
    description: 'This is the sixth item in the list',
  },
  {
    id: '7',
    name: 'Seventh Item',
    description: 'This is the seventh item in the list',
  },
  {
    id: '8',
    name: 'Eighth Item',
    description: 'This is the eighth item in the list',
  },
  {
    id: '9',
    name: 'Ninth Item',
    description: 'This is the ninth item in the list',
  },
  {
    id: '10',
    name: 'Tenth Item',
    description: 'This is the tenth item in the list',
  },
];

class ListService {
  private data = dummyData.slice();

  async getAll() {
    return this.data;
  }

  async delete(id: string) {
    this.data = this.data.filter((item) => item.id !== id);
  }
}

export const ListContext = React.createContext<{
  list: Item[];
  deleteItem: (id: string) => Promise<void>;
}>({
  list: [],
  deleteItem: () => Promise.resolve(),
});

export const ListProvider: React.FC = ({children}) => {
  const [svc] = useState(() => new ListService());
  const [list, setList] = useState<Item[]>([]);

  const fetch = () => void svc.getAll().then((x) => setList(x));
  useEffect(fetch, []);

  return (
    <ListContext.Provider
      value={{
        list,
        deleteItem: async (id: string) => {
          await svc.delete(id);
          await fetch();
        },
      }}>
      {children}
    </ListContext.Provider>
  );
};
