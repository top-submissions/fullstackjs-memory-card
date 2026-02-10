import { useState } from 'react';

const useHook = () => {
  const [value, setValue] = useState(0);
  return { value, setValue };
};

export default useHook;
