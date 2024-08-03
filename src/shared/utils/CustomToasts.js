import { toast } from 'react-hot-toast';

export const customSuccessToast = (message,duration=3500) => {
  toast.success(message, {
    duration: duration,
    style: {
      border: '0px solid #713200',
      padding: '16px 20px',
      color: '#202020',
      fontSize: "16px"
    },
    iconTheme: {
      primary: '#f27d59',
      secondary: '#ffffff',
    },
  });
};

export const customErrorToast = (message) => {
  toast.error(message, {
    duration: 5000,
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

