import React, { useState, useEffect } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import IOIcon from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get('window')

const BACKGROUND_ICON_SIZE = 50

const Accordion = ({ image, bgImageColor, title, data }) => {

    const test = bgImageColor
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {

    }, [])


    return (
        <View >
            <View style={{
                marginTop: 20,
                backgroundColor: 'white',
                height: 80,
                width: width - 50,
                alignSelf: "center",
                elevation: 4,
                borderRadius: 15,
                position: 'relative',
                alignItems: "center",
                flexDirection: "row",
                zIndex: 10,
            }} >
                <View style={{
                    width: BACKGROUND_ICON_SIZE,
                    height: BACKGROUND_ICON_SIZE,
                    borderRadius: BACKGROUND_ICON_SIZE,
                    backgroundColor: test,
                    marginHorizontal: 15,
                    alignItems: "center",
                    justifyContent: "center"
                }} >
                    <Image source={image} style={{
                        width: BACKGROUND_ICON_SIZE / 2,
                        height: BACKGROUND_ICON_SIZE / 2
                    }} />
                </View>
                <TouchableOpacity onPress={() => setExpanded((lastState) => !lastState)} >
                    <View style={{
                        justifyContent: 'space-between',
                        alignItems: "center",
                        flexDirection: "row",
                        // backgroundColor: 'blue',
                        width: width - 150
                    }} >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{title}</Text>
                        <View style={{
                            width: BACKGROUND_ICON_SIZE / 2,
                            height: BACKGROUND_ICON_SIZE / 2,
                            borderRadius: BACKGROUND_ICON_SIZE / 2,
                            backgroundColor: '#d9d9d9',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} >
                            <IOIcon name={expanded ? 'ios-arrow-up' : 'ios-arrow-down'} size={24} color={'gray'} />
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
            {
                expanded && <View style={{
                    backgroundColor: 'lightgray',
                    width: width - 50,
                    alignSelf: "center",
                    elevation: 4,
                    borderBottomStartRadius: 15,
                    borderBottomEndRadius: 15,
                    // position: 'absolute',
                    top: -20,
                    zIndex: 0,
                    paddingTop: 25,
                    paddingHorizontal: 10,
                    paddingBottom: 10
                }} >
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 18
                    }} >{data.title}</Text>
                    <Text style={{ textAlign: 'justify' }} >{data.text}</Text>
                </View>
            }
        </View>
    )
}

export default Accordion