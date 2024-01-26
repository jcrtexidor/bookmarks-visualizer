type BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export class UtilBookmarks {
    private _root: BookmarkTreeNode;
    private _bookmarks: BookmarkTreeNode[] | undefined;
    private _foldersTree: BookmarkTreeNode | undefined;
    private _domainsTree: BookmarkTreeNode | undefined;

    constructor(root: BookmarkTreeNode) {
        if (root.parentId)
            throw new Error('The node must be the root');
        this._root = root;
    }

    get root() {
        return this._root;
    }

    /**
     * Retrieves an array of bookmark nodes representing all bookmarks in the tree.
     * If the bookmarks have not been fetched yet, it performs a depth-first search (DFS)
     * to traverse the bookmark tree and populate the `_bookmarks` array.
     *
     * @returns An array of BookmarkTreeNode objects representing bookmarks
     */
    get bookmarks(): BookmarkTreeNode[] {
        if (!this._bookmarks) {
            this._bookmarks = [];

            /**
            * Depth-first search (DFS) helper function to traverse the bookmark tree recursively.
            * 
            * @param parent - The parent bookmark node.
            * @param bookmarks - The array to store the bookmark nodes.
            */
            const traverseBookmarkTree = (parent: BookmarkTreeNode, bookmarks: BookmarkTreeNode[]) => {
                parent.children?.forEach(child => {
                    switch (child.type) {
                        case 'bookmark':
                            bookmarks.push(child);
                            break;
                        case 'folder':
                            traverseBookmarkTree(child, bookmarks);
                            break;
                    }
                });
            }

            // Start DFS traversal from the root node
            traverseBookmarkTree(this.root, this._bookmarks);
        }
        return this._bookmarks;
    }


/**
 * Retrieves the bookmark tree, specifically the nodes of type 'folder'.
 * If the tree has not been built yet, it performs a breadth-first search (BFS)
 * to traverse the bookmark tree and populate the `_foldersTree` structure.
 * 
 * @returns The bookmark tree with 'folder' nodes.
 */
get foldersTree(): BookmarkTreeNode {
    if (!this._foldersTree) {
        /**
         * Helper function that performs a breadth-first search (BFS) to build the bookmark tree structure recursively.
         * 
         * @param node - The parent bookmark node.
         * @returns The updated bookmark tree node.
         */
        const buildFoldersTree = (node: BookmarkTreeNode): BookmarkTreeNode => ({
            ...node,
            children: node.children
                ?.filter(child => child.type === 'folder')
                .map(child => buildFoldersTree(child)),
        });

        // Start BFS traversal from the root node
        this._foldersTree = buildFoldersTree(this.root);
    }
    return this._foldersTree;
}

    /**
     * Retrieves the domain tree, where each node represents a domain folder.
     * The domain tree is constructed based on the bookmarks stored in the system.
     * @returns The domain tree as a BookmarkTreeNode object.
     */
    get domainTree(): BookmarkTreeNode {
        if (!this._domainsTree) {
            const domains: { [key: string]: BookmarkTreeNode[] } = {};
            const flatBookmarksArray = this.bookmarks;

            flatBookmarksArray.forEach(bookmark => {
                const bookmarkUrl = new URL(bookmark.url || '');
                const hostname = bookmarkUrl.hostname;
                domains[hostname] = domains[hostname] || [];
                domains[hostname].push(bookmark);
            });

            const domainList: BookmarkTreeNode[] = Object.entries(domains)
                .map(([hostname, bookmarks]) => ({
                    id: hostname,
                    title: hostname,
                    children: bookmarks,
                    url: hostname
                }));

            this._domainsTree = {
                id: '__ALL_DOMAINS',
                title: 'All domains',
                children: domainList,
                type: 'folder',
            };
        }

        return this._domainsTree;
    }

    /**
    * Retrieves bookmarks from a specific domain in the bookmark tree.
    *
    * @param {string} targetDomain - The domain to search for bookmarks.
    * @returns {BookmarkTreeNode[]} - An array of bookmark nodes belonging to the specified domain.
    */
    getBookmarksFromDomain(targetDomain: string): BookmarkTreeNode[] {
        const domainNode = this.domainTree.children?.find(node => node.url === targetDomain);
        const bookmarks = domainNode?.children || [];
        return bookmarks;
    }
}






