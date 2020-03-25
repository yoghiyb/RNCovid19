import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, Animated, ScrollView, Image, Picker, TouchableOpacity, ActivityIndicator } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FA5 from 'react-native-vector-icons/FontAwesome5'
import Accordion from './Accordion'
import Data from '../assets/data'

const { width, height } = Dimensions.get('window')

const HEADER_MAX_HEIGHT = height / 3
const HEADER_MIN_HEIGHT = 0
const MAX_BORDER_RADIUS = 50
const MIN_BORDER_RADIUS = 0
const TITLE_MAX_HEIGHT = HEADER_MAX_HEIGHT / 4

const Informasi = () => {
    const scrollY = new Animated.Value(0)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const getData = async () => {
        await setData(Data)
    }
    useEffect(() => {
        setLoading(true)
        getData()
        setLoading(false)
    }, [])
    console.log('parent')

    const headerHeight = scrollY.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [height / 2, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });

    const borderRadiusContent = scrollY.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [MAX_BORDER_RADIUS, MIN_BORDER_RADIUS],
            extrapolate: 'clamp'
        });

    const topTitle = scrollY.interpolate(
        {
            inputRange: [0, (TITLE_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [TITLE_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });
    return (
        <View style={{ flex: 1 }} >
            <View style={{ flex: 1, position: 'relative' }} >
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    height: headerHeight
                }} >
                    <Image source={require('../assets/images/corona-img.jpg')} style={{
                        flex: 1,
                        height: null,
                        width: null
                    }} />
                    <Animated.View style={{
                        position: 'absolute',
                        top: topTitle,
                        left: 20,
                    }} >
                        <Text style={{
                            fontSize: 48,
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'Roboto'
                        }} >Kenali</Text>
                        <Text style={{
                            marginTop: -20,
                            fontSize: 48,
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'Roboto'
                        }} >COVID-19</Text>
                    </Animated.View>
                </Animated.View>
            </View>
            <ScrollView
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }]
                )}
            >
                <Animated.View style={{
                    // height: loading ? 1000 : '',
                    backgroundColor: '#f7fbff',
                    borderTopStartRadius: borderRadiusContent,
                    borderTopEndRadius: borderRadiusContent,
                    padding: 10,
                    paddingBottom: 10,
                    alignItems: "center"
                }}>
                    {loading ?
                        <ActivityIndicator size="large" color="#0000ff" style={{
                            height: height / 1.5
                        }} />
                        : <View>
                            <Text style={{
                                fontSize: 26,
                                marginHorizontal: 14,
                                fontWeight: 'bold',
                                marginTop: 10
                            }}
                            >Apa itu Virus Corona?</Text>
                            {/* Mencegah
                            Mengobati
                            Mengantisipasi */}
                            {data != null ?
                                data.map((row, index) => (
                                    <Accordion key={index} image={row.image} bgImageColor={row.bgImageColor} title={row.title} data={row.data} />
                                ))
                                : null
                            }
                        </View>
                    }
                </Animated.View>
            </ScrollView>
        </View>
    )
}

export default Informasi