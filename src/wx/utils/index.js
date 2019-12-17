export class StateCenter {
  constructor(state = {}) {
    this.state = state
    this.watchers = {}
  }
  setState(key, value) {
    let _state = {}
    if ({}.toString.call(key) !== '[object Object]') {
      // setState({key: value})
      _state = key
    } else {
      // setState(key, value)
      _state[key] = value
    }
    this.state = { ...this.state, _state }
    for (let _stateKey in _state) {
      const watchers = this.watchers[_stateKey]
      watchers &&
        watchers.forEach(watcher => {
          watcher(_state[_stateKey])
        })
    }
  }
  watch(key, watcher) {
    this.watchers[key]
      ? this.watchers[key].push(watcher)
      : (this.watchers[key] = [watcher])
  }
}
