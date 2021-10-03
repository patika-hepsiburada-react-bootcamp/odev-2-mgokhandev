import React from "react";

const Notification = ({ showNotification }) => {
  return (
    <div className={`notification-container ${showNotification ? "show" : ""}`}>
      <p>Bu harfi kullandınız :)</p>
    </div>
  );
};

export default Notification;
