import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FA5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Ionicon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

const { width, height } = Dimensions.get('window')
const BACKGROUND_ICON_SIZE = 50

const Card = ({ positif, sembuh, meninggal, mt }) => {
    return (
        <View style={{
            marginTop: mt,
            backgroundColor: 'white',
            borderRadius: 25,
            height: 180,
            width: width - 50,
            shadowColor: "#f7fbff",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 1.0,
            shadowRadius: 3,
            elevation: 4,
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "space-around"
        }} >
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1
            }} >
                <View style={{
                    position: "relative",
                    backgroundColor: "#ffe7bd",
                    height: BACKGROUND_ICON_SIZE,
                    width: BACKGROUND_ICON_SIZE,
                    borderRadius: BACKGROUND_ICON_SIZE,
                    alignItems: "center",
                    justifyContent: "center"
                }} >
                    <FA5 name="hubspot" color={"#ffb533"} size={24} style={{ position: 'absolute' }} />
                </View>
                <Text
                    style={{
                        fontSize: 52,
                        color: '#ffb533'
                    }}>{positif}</Text>
                <Text
                    style={{ color: 'gray' }}
                >Positif</Text>
            </View>
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1
            }} >
                <View style={{
                    position: "relative",
                    backgroundColor: "#e3ffe9",
                    height: BACKGROUND_ICON_SIZE,
                    width: BACKGROUND_ICON_SIZE,
                    borderRadius: BACKGROUND_ICON_SIZE,
                    alignItems: "center",
                    justifyContent: "center"
                }} >
                    <Ionicon name="md-heart-empty" color={"#67C57B"} size={24} style={{ position: 'absolute' }} />
                </View>
                <Text
                    style={{
                        fontSize: 52,
                        color: '#67C57B'
                    }}>{sembuh}</Text>
                <Text style={{ color: 'gray' }} >Sembuh</Text>
            </View>
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1
            }} >
                <View style={{
                    position: "relative",
                    backgroundColor: "#ffe3e3",
                    height: BACKGROUND_ICON_SIZE,
                    width: BACKGROUND_ICON_SIZE,
                    borderRadius: BACKGROUND_ICON_SIZE,
                    alignItems: "center",
                    justifyContent: "center"
                }} >
                    <Feather name="x" color={"red"} size={24} style={{ position: 'absolute' }} />
                </View>
                <Text
                    style={{
                        fontSize: 52,
                        color: 'red'
                    }}>{meninggal}</Text>
                <Text style={{ color: 'gray' }} >Meninggal</Text>
            </View>
        </View>
    )
}

export default Card