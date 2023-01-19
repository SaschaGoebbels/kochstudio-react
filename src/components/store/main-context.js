import React from 'react';

const MainContext = React.createContext({
  messageObj: { title: 'title', message: 'message' },
});

export default MainContext;
