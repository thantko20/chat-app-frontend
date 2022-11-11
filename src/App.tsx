import React, { FormEvent, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <nav>Navbar</nav>
      <Outlet />
    </div>
  );
};

export default App;
