import { toast } from 'react-hot-toast';

export const customSuccessToast = (message,width) => {
  toast.success(message, {
    style: {
      border: '0px solid #713200',
      padding: '16px 20px',
      color: '#202020',
      fontSize:"15px"
    },
    iconTheme: {
      primary: '#f27d59',
      secondary: '#ffffff',
    },
  });
};

export const customErrorToast = (message) => {
  toast.error(message, {
    style: {
      border: '0px solid #713200',
      padding: '16px 20px',
      color: '#202020',
    },
    iconTheme: {
      primary: '#d43636',
      secondary: '#ffffff',
    },
  });
};
