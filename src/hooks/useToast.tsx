import { useState } from 'react';

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
  };

  const hideToast = () => {
    setMessage(null);
  };

  return { message, showToast, hideToast };
}
