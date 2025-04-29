import { EventName } from './enums';

export const PUSH_NOTIFICATION_DELAYS_MS = {
  [EventName.USER_CREATED]: 24 * 60 * 60 * 1000, // 24h
};

export const PUSH_NOTIFICATION_TEMPLATES = {
  [EventName.USER_CREATED]: {
    title: 'Welcome to our service!',
    message: 'Hello, {{name}}! Thank you for joining us.',
  },
};
