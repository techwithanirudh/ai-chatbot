import { z } from "zod";

export const toolsSchemas = {
  'joinMeeting': {
    parameters: z.object({
      meetingUrl: z.string(),
      botName: z.string(),
      webhookUrl: z.string().optional(),
      recordingMode: z.string().optional(),
      speechToText: z.boolean().optional(),
      reserved: z.boolean(),
    }),
  },
  'leaveMeeting': {
    parameters: z.object({
      botId: z.string()
    }),
  },
  'getMeetingData': {
    parameters: z.object({
      botId: z.string()
    }),
  },
  'deleteData': {
    parameters: z.object({
      botId: z.string()
    }),
  },
  'createCalendar': {
    parameters: z.object({
      oauthClientId: z.string(),
      oauthClientSecret: z.string(),
      oauthRefreshToken: z.string(),
      platform: z.enum(["Google", "Microsoft"]),
      rawCalendarId: z.string(),
    }),
  },
  'listCalendars': {
    parameters: z.object({}),
  },
  'getCalendar': {
    parameters: z.object({
      uuid: z.string()
    }),
  },
  'deleteCalendar': {
    parameters: z.object({
      uuid: z.string()
    }),
  },
  'resyncAllCalendars': {
    parameters: z.object({}),
  },
  'botsWithMetadata': {
    parameters: z.object({
      botName: z.string().optional(),
      createdAfter: z.string().optional(),
      createdBefore: z.string().optional(),
      cursor: z.string().optional(),
      filterByExtra: z.string().optional(),
      limit: z.number().optional(),
      meetingUrl: z.string().optional(),
      sortByExtra: z.string().optional(),
      speakerName: z.string().optional(),
    }),
  },
  'listEvents': {
    parameters: z.object({
      calendarUuid: z.string()
    }),
  },
  'scheduleRecordEvent': {
    parameters: z.object({
      eventUuid: z.string(),
      botName: z.string(),
      extra: z.record(z.any()).optional(),
    }),
  },
  'unscheduleRecordEvent': {
    parameters: z.object({
      eventUuid: z.string()
    }),
  },
  'updateCalendar': {
    parameters: z.object({
      uuid: z.string(),
      oauthClientId: z.string().optional(),
      oauthClientSecret: z.string().optional(),
      oauthRefreshToken: z.string().optional(),
      platform: z.enum(["Google", "Microsoft"]).optional(),
      rawCalendarId: z.string().optional(),
    }),
  },
  'echo': {
    parameters: z.object({
      message: z.string()
    }),
  },
};
