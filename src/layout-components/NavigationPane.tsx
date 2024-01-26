import { useContext, useEffect, useState } from 'react';

import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import { bookmarksTree } from '../BookmarksContext';
import { getDomainTree, getFoldersTree } from '../util';

type NavigationPaneProps = {
  groupBy?: 'folder' | 'domain' | 'tag';
};

export const NavigationPane = ({ groupBy = 'domain' }: NavigationPaneProps) => {

  // Get the bookmarks tree from context
  const { bookmarkTree } = useContext(bookmarksTree);
  const [treeData, setTreeData] = useState<DataNode[]>([]);

  // Parse the bookmark tree to a DataNode tree using Depth First Search (DFS)
  const parseInDFS = (node: browser.bookmarks.BookmarkTreeNode): DataNode => {
    return {
      title: node.parentId ? node.title : "All bookmarks",
      key: node.id,
      children: node.children?.map(child => parseInDFS(child)),
    }
  }

  const getTreeDataByFolder = () => {
    if (bookmarkTree) {
      const rootFolder = bookmarkTree.map(node => getFoldersTree(node));
      const rootDataNode = rootFolder.map(node => parseInDFS(node));
      setTreeData(rootDataNode);
    }
  }


  const getTreeDataByDomain = () => {
    if (bookmarkTree) {
      const rootFolder = bookmarkTree.map(node => getDomainTree(node));
      const rootDataNode = rootFolder.map(node => parseInDFS(node));
      setTreeData(rootDataNode);
    }
  }

  const getTreeDataByTag = () => {
    throw new Error('Not yet implemented');
  }


  useEffect(() => {
    switch (groupBy) {
      case 'folder':
        getTreeDataByFolder();
        break;
      case 'domain':
        getTreeDataByDomain();
        break;
      case 'tag':
        getTreeDataByTag();
        break;
      default:
        getTreeDataByFolder();
        break;
    }


  }, [bookmarkTree]);



  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  return (
    <>
      <Tree
        showLine={true}
        switcherIcon={<DownOutlined />}
        multiple={false}
        defaultExpandAll={true}
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </>

  );
};