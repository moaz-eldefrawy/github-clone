import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { enableScreens } from "react-native-screens"
import { PersistGate } from "redux-persist/lib/integration/react"
import { ErrorHandler } from "@github/views/error-handler"
import { AppNavigator } from "@github/navigation"
import { persistor, store } from "@github/state/store"

enableScreens()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <AppNavigator />
          <ErrorHandler />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
