import React from 'react';

export const PrefixContext = React.createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(null as any);
