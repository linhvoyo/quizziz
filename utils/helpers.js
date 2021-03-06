import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

import {
  getNotificationsFromStorage,
  removeNotificationKey,
  setNotificationItem,
} from './api';

export async function requestPermissionsAsync() {
  const permissions = await Notifications.getPermissionsAsync();
  if (permissions.status === 'granted') return permissions;
  return Notifications.requestPermissionsAsync()
    .then(response => {
      if (response.status !== 'granted') Alert('Please enable notifications in settings to get daily reminder');
      return permissions;
    });
}

function createNotification(trigger) {
  return {
    content: {
      title: 'Hi there!',
      body: "Don't forget to study today",
    },
    trigger,
  };
}

export async function clearScheduledNotifications() {
  await removeNotificationKey();
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function setUpNotification(notification) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  await setNotificationItem(new Date());
  return Notifications.scheduleNotificationAsync(notification);
}

export async function scheduleNotificationAsync(notificationTrigger) {
  await Notifications.getAllScheduledNotificationsAsync()
    .then(async (notifications) => {
      const [scheduled] = notifications;
      const scheduledTime = await getNotificationsFromStorage();
      const isNextDay = scheduledTime
        && new Date().valueOf() >= (Date.parse(JSON.parse(scheduledTime)) + (60 * 24 * 24 * 1000));
      if (!notifications.length ||
        ((scheduled && scheduled.trigger.type === 'timeInterval') && isNextDay)) {
        const { status } = await requestPermissionsAsync();
        if (status === 'granted') {
          await Notifications.cancelAllScheduledNotificationsAsync();
          const DailyNotificationTrigger = {
            hour: 18,
            minute: 0,
            repeats: true,
          };
          await setUpNotification(createNotification(notificationTrigger || DailyNotificationTrigger));
        }
      }
    });
};
