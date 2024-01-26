import { memo, useEffect, useState } from 'react';
import { bookmarksTree } from './BookmarksContext';


export const BookmarksProvider = memo(({ children }: { children: JSX.Element }) => {
    const [bookmarkTree, updateBookmarkTree] = useState<browser.bookmarks.BookmarkTreeNode[] | undefined>();


    useEffect(() => {
        browser.bookmarks.getTree().then(updateBookmarkTree);
    }, []);

    return <bookmarksTree.Provider value={{ bookmarkTree, updateBookmarkTree }}>
        {children}
    </bookmarksTree.Provider>
}
)
