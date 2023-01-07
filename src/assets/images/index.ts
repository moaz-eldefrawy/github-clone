import { ImageRequireSource } from "react-native"

const image = Object.freeze({
  backAndroid: require("./back.android.png"),
  back: require("./back.png"),
  // back@2x.android: require("./back@2x.android.png"),
  // back@3x.android: require("./back@3x.android.png"),
  cancel: require("./cancel.png"),
  home: require("./home.png"),
  organization: require("./organization.png"),
  people: require("./people.png"),
  search: require("./search.png"),
})

export default image as Record<keyof typeof image, ImageRequireSource>
