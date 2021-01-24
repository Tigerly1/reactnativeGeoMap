import React, { Component } from "react"
import { Text, View } from "react-native"
import MapView from "react-native-maps"
export class Map extends Component {
    static navigationOptions = {
        // header: null,
        title: "Lokalizacja na mapie",
        headerStyle: {
            backgroundColor: "#303F9F"
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props)
        this.markers = this.markers.bind(this)
    }
    markers() {
        var list = this.props.navigation.state.params
        console.log(list)
        array = []
        list.map((el, i) => {
            array.push(
                <MapView.Marker
                    coordinate={{
                        latitude: Number(el.split("|")[2]),
                        longitude: Number(el.split("|")[3])
                    }}
                    title={"pozycja: " + i}
                    description={"jestem tutaj"}
                    key={i}
                />
            )
        })
        return array
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: Number(
                            this.props.navigation.state.params[0].split("|")[2]
                        ),
                        longitude: Number(
                            this.props.navigation.state.params[0].split("|")[3]
                        ),
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    }}
                >
                    {this.markers()}
                </MapView>
            </View>
        )
    }
}

export default Map
