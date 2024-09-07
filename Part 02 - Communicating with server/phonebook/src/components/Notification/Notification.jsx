import './Notification.css';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const { message, isError } = notification;

  return <div className={`basic ${isError ? 'error' : null}`}>{message}</div>;
};

export default Notification;
