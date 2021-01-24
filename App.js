import { createStackNavigator, createAppContainer } from "react-navigation"
import Main from "./components/Main"
import List from "./components/List"
import Map from "./components/Map"

const Root = createStackNavigator({
    s1: { screen: Main },
    s2: { screen: List },
    s3: { screen: Map }
})

const App = createAppContainer(Root)

export default App
