import { Octokit } from '@octokit/core'

let octokit = null

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-09-30 15:21:10
 * @Desc: 创建实例
 */
export const create = token => {
  octokit = token
    ? new Octokit({
        auth: token
      })
    : new Octokit()
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-09-30 15:22:15
 * @Desc: 发送请求
 */
export const request = (...args) => {
  if (!octokit) {
    return
  }
  return octokit.request(...args)
}
