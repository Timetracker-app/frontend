import { useNotification } from "../features/NotificationContext";

const Notification = () => {
  const { notification } = useNotification();

  if (!notification.message) return null;

  return (
    <div
      className={
        notification.type === "success" ? "text-success" : "text-error"
      }
    >
      {notification.message}
    </div>
  );
};

export default Notification;
