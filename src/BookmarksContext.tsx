import { createContext } from 'react';

export const bookmarksTree = createContext<{
    bookmarkTree?: browser.bookmarks.BookmarkTreeNode[]
    updateBookmarkTree?: React.Dispatch<React.SetStateAction<browser.bookmarks.BookmarkTreeNode[] | undefined>>
}>({});