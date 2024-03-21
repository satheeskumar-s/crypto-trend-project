import toast from 'react-hot-toast';

export const showSuccessNotification = (msg: string) => {
  toast.success(msg);
};

export const showErrorNotification = (msg: string) => {
  toast.error(msg);
};
