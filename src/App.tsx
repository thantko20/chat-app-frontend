import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
      <main className='sm:container mx-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
