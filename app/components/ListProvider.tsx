import React, {useCallback, useEffect, useState} from 'react';

export interface Item {
  id: string;
  name: string;
  description: string;
}

export type ReadonlyList = readonly Item[];

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

type ListObserver = (list: ReadonlyList) => void;
type Disposer = () => void;

class ListService {
  private list: ReadonlyList = dummyData.slice();
  private subscribers = new Set<ListObserver>();

  async getAll(): Promise<ReadonlyList> {
    return this.list.slice();
  }

  async delete(id: string): Promise<void> {
    this.list = this.list.filter((item) => item.id !== id);
    this.notify();
  }

  observe(observer: ListObserver): Disposer {
    this.subscribers.add(observer);
    observer(this.list);
    return () => void this.subscribers.delete(observer);
  }

  private notify(): void {
    for (const observer of this.subscribers.values()) {
      observer(this.list);
    }
  }
}

export const ListContext = React.createContext<{
  list: ReadonlyList;
  deleteItem: (id: string) => Promise<void>;
}>({
  list: [],
  deleteItem: () => Promise.resolve(),
});

export const ListProvider: React.FC = ({children}) => {
  const [svc] = useState(() => new ListService());
  const [list, setList] = useState<ReadonlyList>([]);

  useEffect(() => svc.observe(setList), []);

  return (
    <ListContext.Provider
      value={{
        list,
        deleteItem: (id: string) => svc.delete(id),
      }}>
      {children}
    </ListContext.Provider>
  );
};
