import { useContext } from 'react';
import { bookmarksTree } from '../BookmarksContext';

type ContentPaneProps = {
  sortBy?: 'index' | 'title' | 'url' | 'dateAdded';
};

export const ContentPane = ({ sortBy = 'index' }: ContentPaneProps) => {
  const value = useContext(bookmarksTree);
  return <div>{value && value.bookmarkTree?.toString()}</div>;
};