import React from 'react';
import { NotificationItemType } from '../hooks/useDashboard';
import {
  CardTitle,
  MobileNotificationItem,
  MobileNotificationList,
  NotificationItem,
  NotificationMessage,
  NotificationScrollContainer,
  NotificationTime,
  NotificationTitle,
} from '../styles/pages/Dashboard.styles';

// Component for rendering notifications based on screen size
export const NotificationsRenderer: React.FC<{
  notifications: NotificationItemType[];
  isMobile: boolean;
}> = ({ notifications, isMobile }) => {
  if (isMobile) {
    return (
      <MobileNotificationList>
        {notifications.slice(0, 3).map((notification) => (
          <MobileNotificationItem key={notification.id}>
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationMessage>{notification.message}</NotificationMessage>
            <NotificationTime>{notification.time}</NotificationTime>
          </MobileNotificationItem>
        ))}
      </MobileNotificationList>
    );
  }

  return (
    <NotificationScrollContainer>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id}>
          <NotificationTitle>{notification.title}</NotificationTitle>
          <NotificationMessage>{notification.message}</NotificationMessage>
          <NotificationTime>{notification.time}</NotificationTime>
        </NotificationItem>
      ))}
    </NotificationScrollContainer>
  );
};

// Component for displaying the dashboard header
export const DashboardHeader: React.FC<{
  userName: string;
  onHomeClick: () => void;
  onLogoutClick: () => void;
}> = () => (
  <CardTitle style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
    📢 오늘의 알림
  </CardTitle>
);
