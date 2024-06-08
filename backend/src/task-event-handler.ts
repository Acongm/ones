import { Logger } from '@ones-op/node-logger'

import type { PluginRequest, PluginResponse } from '@ones-op/node-types'

export async function taskPreAction(request: PluginRequest): Promise<PluginResponse> {
  const body = request?.body as any
  const userUUID = body.user_uuid
  const lang = body.lang
  const events = body.task_events
  const action = events[0].action
  Logger.info('nEvents', events)
  Logger.info('userID:', userUUID)
  Logger.info('lang', lang)
  Logger.info('action', action)
  // Add field modification
  // var aField =  {
  // 	field_name: "Title",
  // 	value:     "Test title",
  // }
  // events[0].task_fields.push(aField)
  return {
    statusCode: 200,
    body: {
      code: 200,
      body: {
        is_follow: true,
        is_reject: false,
        reject_reason: 'Reason for refusal',
        task_events: events,
        other_data: 'other data',
      },
    },
  }
}

export async function taskActionDone(request: PluginRequest): Promise<PluginResponse> {
  const body = request?.body as any
  const events = body.task_events
  const otherData = body.other_data
  const userUUID = body.user_uuid
  const lang = body.lang
  const action = events[0].action
  Logger.info('ans event', events)
  Logger.info('ans other_data', otherData)
  Logger.info('ans userID:', userUUID)
  Logger.info('ans lang', lang)
  Logger.info('ans action', action)
  return {
    statusCode: 200,
    body: {
      code: 200,
    },
  }
}
