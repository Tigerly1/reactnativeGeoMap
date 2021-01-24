import React, { Component } from "react"
import { Text, View, Image, Switch } from "react-native"

export class ListItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "25%" }}>
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={require("./globe.jpg")}
                    />
                </View>
                <View style={{ flexDirection: "column", width: "65%" }}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>
                            {" "}
                            timestamp: {this.props.timestamp}{" "}
                        </Text>
                    </View>
                    <View>
                        <Text> latitude: {this.props.latitude} </Text>
                    </View>
                    <View>
                        <Text> longitude: {this.props.longitude} </Text>
                    </View>
                </View>
                <View style={{ width: "10%" }}>
                    <Switch
                        onChange={this.props.change}
                        value={this.props.bool}
                    />
                </View>
            </View>
        )
    }
}

export default ListItem
