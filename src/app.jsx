import React from 'react';

export default function MyApp(props) {
  React.useEffect(() => {
    document.title = 'Hello Word';
  }, []);

  return <div>Hello Word</div>;
}
