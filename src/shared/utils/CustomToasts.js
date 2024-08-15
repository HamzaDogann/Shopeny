import { toast } from 'react-hot-toast';

export const customSuccessToast = (message, duration = 3500) => {
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

export const customErrorToast = (message, fontSize = 16, duration = 4000) => {
  toast.error(message, {
    duration: duration,
    style: {
      border: '0px solid #713200',
      padding: '16px 20px',
      color: '#202020',
      fontSize: fontSize ? fontSize : "16px"
    },
    iconTheme: {
      primary: '#d43636',
      secondary: '#ffffff',
    },
  });
};

