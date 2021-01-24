import React, { Component } from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import MyButton from "./MyButton"
import * as Font from "expo-font"
class Main extends Component {
    static navigationOptions = {
        // header: null,
        title: "GeoMap",
        headerStyle: {
            backgroundColor: "#303F9F"
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            fontloaded: false
        }
    }
    componentWillMount = async () => {
        await Font.loadAsync({
            myfont: require("./Lato-Regular.ttf")
        })
        this.setState({ fontloaded: true })
    }
    render() {
        return this.state.fontloaded ? (
            <View style={styles.container}>
                <View style={styles.containerf}>
                    <Text style={styles.text}>GeoMap App</Text>
                    <Text style={styles.textt}>
                        find and save your position
                    </Text>
                </View>
                <View style={styles.containers}>
                    <View style={{ marginTop: 150 }}>
                        <MyButton
                            fontSize={36}
                            function={() =>
                                this.props.navigation.navigate("s2")
                            }
                            text={"START"}
                        />
                    </View>
                </View>
            </View>
        ) : null
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "column"
    },
    containerf: {
        flex: 1,
        backgroundColor: "#3F51B5"
    },
    containers: {
        flex: 1
    },
    text: {
        marginTop: 100,
        fontFamily: "myfont",
        fontSize: 38,
        alignSelf: "center",
        color: "white"
    },
    textt: {
        fontFamily: "myfont",
        fontSize: 26,
        alignSelf: "center",
        color: "white"
    }
})
export default Main
