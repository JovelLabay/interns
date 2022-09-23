// TOASTIFY
import { toast } from 'react-toastify';

const notify = (message: string) =>
  toast(message, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export { notify };
