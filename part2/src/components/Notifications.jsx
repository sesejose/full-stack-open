const Notification = ({ success, error }) => {
  if (success) {
    return <div className="notification success">{success}</div>;
  }
  if (error) {
    return <div className="notification error">{error}</div>;
  }
  return null;
};

export default Notification;
