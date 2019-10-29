
import axios from 'axios'
import {toProperties} from '../common/Convertor'

let prop = {
  START: [{key: 'timeout', value: '', defaultValue: '100', description: 'xxxx'}],
  END: [{key: 'timeout', value: '', defaultValue: '100', description: 'xxxx'}],
  SYNC: [],
  time: [
    {key: 'format', value: '', defaultValue: '', description: 'bbb'}
  ],
  log: [
    {key: 'times', value: '', defaultValue: '', description: 'xxx'},
    {key: 'path', value: '', defaultValue: '', description: 'vvvv'}
  ]
}

export default {
  get(name) {
    return prop[name]
  },
  async initTaskProps(list) {
    let promise = [];
    list.map(v => {
      promise.push(new Promise((resolve) => {
        axios.get(`/apps/task/${v}`).then(response => {
          resolve(response.data);
        })
      }))
    })
    let result = await Promise.all(promise);
    result.map((v, i) => {
      prop[list[i]] = toProperties(v);
    })
  }
}
