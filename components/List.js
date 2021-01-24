import React, { Component } from "react"
import { Text, View, StyleSheet, Switch, ScrollView } from "react-native"
import * as Permissions from "expo-permissions"
import * as Location from "expo-location"
import { AsyncStorage } from "react-native"
import MyButton from "./MyButton"
import ListItem from "./ListItem"
export class List extends Component {
    static navigationOptions = {
        // header: null,
        title: "Zapis Pozycji",
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
            data: {
                keys: [],
                values: [],
                bool: []
            },
            all: false
        }
        this.listItems = this.listItems.bind(this)
    }
    componentWillMount = async () => {
        await this.setPermissions()
    }
    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== "granted") {
            await this.setPermissions()
        } else {
            await this.getAllData()
        }
    }
    getPosition = async () => {
        let pos = await Location.getCurrentPositionAsync({})
        this.setData(pos)
    }
    setData = async pos => {
        let keys = await AsyncStorage.getAllKeys()
        await AsyncStorage.setItem(
            "key" + keys.length,
            "value" +
                "|" +
                pos.timestamp +
                "|" +
                pos.coords.latitude +
                "|" +
                pos.coords.longitude
        )
        this.getAllData()
    }
    getAllData = async () => {
        var data = {
            keys: [],
            values: [],
            bool: []
        }
        let keys = await AsyncStorage.getAllKeys()
        let stores = await AsyncStorage.multiGet(keys)
        let maps = stores.map((result, i, store) => {
            let key = store[i][0]
            let value = store[i][1]
            let bool = false
            data.keys.push(key)
            data.values.push(value)
            data.bool.push(bool)
            this.setState({
                data: data
            })
        })
    }

    removeData = async () => {
        let keys = await AsyncStorage.getAllKeys()
        await AsyncStorage.multiRemove(keys)
        this.setState({
            data: {
                keys: [],
                values: [],
                bool: []
            }
        })
    }
    listItems() {
        var array = []
        var data = this.state.data.values
        let maps = data.map((key, i) => {
            array.push(
                <ListItem
                    timestamp={key.split("|")[1]}
                    latitude={key.split("|")[2]}
                    longitude={key.split("|")[3]}
                    bool={this.state.data.bool[i]}
                    change={() => {
                        let data = this.state.data
                        data.bool[i] = !data.bool[i]
                        this.setState({
                            data: data
                        })
                    }}
                    key={i}
                />
            )
        })
        return array
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerf}>
                    <View style={{ width: "50%", fontWeight: "bold" }}>
                        <MyButton
                            fontSize={16}
                            text={"POBIERZ I ZAPISZ POZYCJĘ"}
                            function={this.getPosition}
                            weight={"bold"}
                        />
                    </View>
                    <View style={{ width: "50%" }}>
                        <MyButton
                            fontSize={16}
                            text={"USUŃ WSZYSTKIE DANE"}
                            function={this.removeData}
                            weight={"bold"}
                        />
                    </View>
                </View>
                <View style={styles.containers}>
                    <View style={{ width: "90%", alignSelf: "center" }}>
                        <MyButton
                            fontSize={16}
                            text={"PRZEJDŹ DO MAPY"}
                            weight={"bold"}
                            function={() => {
                                var item = []
                                this.state.data.bool.map((el, i) => {
                                    el == true
                                        ? item.push(this.state.data.values[i])
                                        : null
                                    this.state.data.bool.length - 1 == i &&
                                    item.length > 0
                                        ? this.props.navigation.navigate(
                                              "s3",
                                              item
                                          )
                                        : null
                                })
                            }}
                        />
                    </View>
                    <View style={{ width: "10%" }}>
                        <Switch
                            value={this.state.all}
                            onChange={() => {
                                this.state.data.bool.map((el, i) => {
                                    var data = this.state.data
                                    data.bool[i] = !this.state.all
                                    this.setState({
                                        data: data
                                    })
                                })
                                this.setState({
                                    all: !this.state.all
                                })
                            }}
                        />
                    </View>
                </View>
                <View style={styles.containert}>
                    <ScrollView style={{ width: "100%", alignSelf: "center" }}>
                        {this.listItems()}
                    </ScrollView>
                </View>
            </View>
        )
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
        flexDirection: "row",
        maxHeight: 44
    },
    containers: {
        flex: 1,
        flexDirection: "row"
    },
    containert: {
        flex: 10,
        flexDirection: "column",
        overflow: "scroll"
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
export default List
