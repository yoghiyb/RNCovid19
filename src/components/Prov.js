import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

var { width, height } = Dimensions.get('window')

const CONTENT_WIDTH = width - 50
const CHART_HEIGHT = height / 3

const Provinsi = ({ provinsi, positif, sembuh, meninggal }) => {
    return (
        <View style={{
            marginTop: 10,
            width: CONTENT_WIDTH,
            height: 65,
            backgroundColor: 'white',
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 15,
            elevation: 2
        }} >
            <Text style={{
                fontSize: 20,
                fontWeight: "bold",
            }}>{provinsi}</Text>
            <View style={{
                flex: 1,
                // backgroundColor: 'white',
                flexDirection: "row",
                // justifyContent: 'space-between'
            }} >
                <View style={{
                    backgroundColor: 'orange',
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    flex: 1
                }} >
                    <Text style={{ color: 'white' }} >Positif </Text>
                    <Text style={{ color: 'white' }} >{positif}</Text>
                </View>
                <View style={{
                    backgroundColor: '#67C57B',
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    flex: 1,
                    marginHorizontal: 5
                }} >
                    <Text style={{ color: 'white' }} >Sembuh </Text>
                    <Text style={{ color: 'white' }} >{sembuh}</Text>
                </View>
                <View style={{
                    backgroundColor: 'red',
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    flex: 1
                }} >
                    <Text style={{ color: 'white' }} >Meninggal </Text>
                    <Text style={{ color: 'white' }} >{meninggal}</Text>
                </View>
            </View>
        </View>
    )
}

export default Provinsi