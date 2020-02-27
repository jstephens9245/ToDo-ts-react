import moment from "moment";

export const cacheHandler = {
  handler: {
    base: localStorage,
    set(key: string, value: string) { 
      return this.base.setItem(key, value)
    },
    get(key: string) {
      return this.base.getItem(key);
    },
    clear() {
      return this.base.clear();
    }
  },
  expiryInterval: 5,
  set (key: string, val: string, setExp = false) {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    this.handler.set(`cmc${key}`, val);
    if (setExp) {
      let expiry = moment().add(this.expiryInterval, 'minutes').unix()
      this.handler.set(`cmc${key}Expiry`, expiry.toString());
    }
  },
  get (key: string) {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    return this.handler.get(`cmc${key}`) || "";
  },
  getUnexpired (key: string) {
    // returns a value only if it isn't expired
    let expiry = this.handler.get(`cmc${key}Expiry`) || ""
    let val = this.handler.get(`cmc${key}`) || ""
    if (!expiry) {
      if (val) {
        return val
      }
      return ""
    } else {
      let now = moment().unix()
      if (parseInt(expiry) > now) {
        return "";
      } else {
        return val;
      }
    }
  },
  clear () {
    this.handler.clear()
  }
}