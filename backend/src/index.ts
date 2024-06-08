import { Logger } from '@ones-op/node-logger'
import type { PluginRequest, PluginResponse } from '@ones-op/node-types'

import { Plugin } from '@ones-op/node-ability'
// import { fetchONES } from '@ones-op/node-fetch'

// export async function configurationPageTest1() {
//   const configs = await Plugin.getPluginConfig(globalThis.onesEnv.teamUUID)
//   console.log('configs', configs)
// }

// export async function configurationPageTest2() {
//   const response = await fetchONES({
//     path: `/team/${globalThis.onesEnv.teamUUID}`,
//     method: 'POST',
//     headers: {
//       'Ones-Plugin-Id': ['built_in_apis'],
//       'Ones-Check-Point': ['team'],
//       'Ones-Check-Id': [`${globalThis.onesEnv.teamUUID}`],
//       'AbilityName': ['ConfigList'],
//     },
//     body: {
//       instance_id: `${globalThis.onesEnv.instanceId}`,
//       team_uuid: `${globalThis.onesEnv.teamUUID}`,
//       organization_uuid: `${globalThis.onesEnv.organizationUUID}`,
//     },
//   })
//   //@ts-ignore
//   const byteBody = response?.body || {}
//   console.log(byteBody)

//   const stringBody = byteBody.toString()
//   const JSONBody = JSON.parse(stringBody)

//   for (let i = 0; i < JSONBody.length; i++) {
//     Logger.info(JSONBody[i]['arg_key']) //获取配置项的key值
//     Logger.info(JSONBody[i]['arg_value']) //获取配置项的value值
//   }

//   return {
//     body: response?.body.toString(),
//   }
// }

// Method called when the team level plugin is being installed.
export async function Install() {
  Logger.info('[Plugin] Install')
  // configurationPageTestData = await configurationPageTest1()
  Logger.info('globalThis')
}

// Method called when the team level plugin is being launched.
export async function Enable() {
  Logger.info('[Plugin] Enable')
}

// Method called when the team level plugin is being suspended.
export function Disable() {
  Logger.info('[Plugin] Disable')
}

// Method called when the team level plugin is being uninstalled.
export function UnInstall() {
  Logger.info('[Plugin] UnInstall')
}

// Method called when the team level plugin is being upgraded.
export function Upgrade(oldPluginInfo) {
  const oldVersion = oldPluginInfo.version
  Logger.info('[Plugin] Upgrade', 'old version:', oldVersion)
}

/*
    Method called when the organization level plugin is being installed.

    Request parameter description:
    request:
      request.parsedHeaders state multi-language, for example,when the request user context is chinese,
      the parameter will be {"Accept-Language":["zh"]}, there are other cases like {"Accept-Language":["en"]},
      {"Accept-Language":["ja"]}.
    teamUUIDList:
      The uuid list with the team which installed by this time.
    firstInstall:
      True if plugin has never been installed.
 */
export async function OrgInstall(
  request: PluginRequest,
  teamUUIDList: string[],
  firstInstall: boolean
) {
  Logger.info('[Plugin] OrgInstall')
}

/*
    Method called when the organization level plugin is being launched.

    Request parameters description:
    request:
      request.parsedHeaders state multi-language, for example,when the request user context is chinese,
      the parameter will be {"Accept-Language":["zh"]}, there are other cases like {"Accept-Language":["en"]},
      {"Accept-Language":["ja"]}.
    teamUUIDList:
      The uuid list with the team which launched by this time.

    Response parameters description:
      Return the failed team uuid list.
 */
export function OrgEnable(
  request: PluginRequest,
  teamUUIDList: string[]
): void | string[] | Promise<string[]> {
  Logger.info('[Plugin] OrgEnable')
  return []
}

/*
    Method called when the organization level plugin is being suspended.

    Request parameters description:
    request:
      request.parsedHeaders state multi-language, for example,when the request user context is chinese,
      the parameter will be {"Accept-Language":["zh"]}, there are other cases like {"Accept-Language":["en"]},
      {"Accept-Language":["ja"]}.
    teamUUIDList:
      The uuid list with the team which suspended by this time.

    Response parameters description:
      Return the failed team uuid list.
 */
export function OrgDisable(
  request: PluginRequest,
  teamUUIDList: string[]
): void | string[] | Promise<string[]> {
  Logger.info('[Plugin] OrgDisable')
  return []
}

/*
    Method called when the organization level plugin is being uninstalled.

    Request parameters description:
    request:
      request.parsedHeaders state multi-language, for example,when the request user context is chinese,
      the parameter will be {"Accept-Language":["zh"]}, there are other cases like {"Accept-Language":["en"]},
      {"Accept-Language":["ja"]}.
    teamUUIDList:
      The uuid list with the team which uninstalled by this time.
 */
export function OrgUnInstall(request: PluginRequest, teamUUIDList: string[]) {
  Logger.info('[Plugin] OrgUnInstall')
}

/*
    Method called when the organization level plugin is being upgraded.

    Request parameters description:
    request:
      request.parsedHeaders state multi-language, for example,when the request user context is chinese,
      the parameter will be {"Accept-Language":["zh"]}, there are other cases like {"Accept-Language":["en"]},
      {"Accept-Language":["ja"]}.
    teamUUIDList:
      The uuid list with the team which upgraded by this time.
 */
export function OrgUpgrade(oldPluginInfo: any, request: PluginRequest, teamUUIDList: string[]) {
  const oldVersion = oldPluginInfo.version
  Logger.info('[Plugin] OrgUpgrade', 'old version:', oldVersion)
}

// example function
export async function getPluginConfig(request: PluginRequest): Promise<PluginResponse> {
  const body = request.body || {}
  Logger.info('[Plugin] getPluginConfig ======= 请求成功')
  const configs = await Plugin.getPluginConfig(globalThis.onesEnv.teamUUID)
  const noticeConfigKey = configs.find((t) => t.arg_key === 'noticeConfigKey').arg_value
  const timeOutLogConfigKey = configs.find((t) => t.arg_key === 'timeOutLogConfigKey').arg_value
  return {
    body: {
      res: 'hello',
      noticeConfigKey,
      timeOutLogConfigKey,
      configs,
      // res: await configurationPageTest1(),
      // data: globalThis.onesEnv,
      requestBody: body,
    },
  }
}

export * from './timer-task-cron'

export * from './task-event-handler'
