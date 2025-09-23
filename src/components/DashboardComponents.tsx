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

// Component for displaying today's meals
export const TodayMealsList: React.FC<{
  mealsList: Array<{
    timeSlot: string;
    hasRecord: boolean;
    statusText: string;
  }>;
}> = ({ mealsList }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        padding: '8px 0',
      }}
    >
      {mealsList.map((meal) => (
        <div
          key={meal.timeSlot}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 0',
            fontSize: '14px',
          }}
        >
          <span style={{ fontWeight: '600', color: '#495057' }}>
            {meal.timeSlot}:
          </span>
          <span
            style={{
              color: meal.hasRecord ? '#28a745' : '#6c757d',
              fontSize: '13px',
            }}
          >
            {meal.statusText}
          </span>
        </div>
      ))}
    </div>
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
