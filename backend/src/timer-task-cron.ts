import { Logger } from '@ones-op/node-logger'
import { Plugin } from '@ones-op/node-ability'

export async function cronTaskAction() {
  const configs = await Plugin.getPluginConfig(globalThis.onesEnv.teamUUID)
  const timeOutLogConfigKey = configs.find((t) => t.arg_key === 'timeOutLogConfigKey').arg_value
  Logger.info('cronTaskAction', timeOutLogConfigKey)
}
