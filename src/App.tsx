import './App.sass'
import { BookmarksProvider } from './BookmarksProvider';
import { Page } from './layout-components/page';


const App = () => {
  return (
    <>
      <BookmarksProvider>
        <Page />
      </BookmarksProvider>
    </>
  );
}

export default App
