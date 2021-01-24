import React, { Component } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
class MyButton extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.function}>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: this.props.fontSize,
                            fontWeight: this.props.weight,
                            fontFamily: "myfont"
                        }}
                    >
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
MyButton.propTypes = {
    function: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired
}

export default MyButton
