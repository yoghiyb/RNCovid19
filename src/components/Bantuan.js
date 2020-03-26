import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FA5 from 'react-native-vector-icons/FontAwesome5'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import IOIcon from 'react-native-vector-icons/Ionicons'
import Data from '../assets/data'

const { width, height } = Dimensions.get('window')

const HEADER_MAX_HEIGHT = height / 2.8
const HEADER_MIN_HEIGHT = 0
const MAX_BORDER_RADIUS = 50
const MIN_BORDER_RADIUS = 0
const TITLE_MAX_HEIGHT = HEADER_MAX_HEIGHT / 4

const calcHeight = height - HEADER_MAX_HEIGHT

const BACKGROUND_ICON_SIZE = 50

const Bantuan = ({ navigation }) => {
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
    // console.log('parent')

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
                        }} >Pusat</Text>
                        <Text style={{
                            marginTop: -20,
                            fontSize: 48,
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'Roboto'
                        }} >Bantuan</Text>
                    </Animated.View>
                </Animated.View>
            </View>
            <ScrollView
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }]
                )}
                onContentSizeChange={(width, height) => {

                }}
            >
                <Animated.View style={{
                    height: calcHeight + 10,
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
                                marginTop: 10,
                            }}
                            >Pusat Bantuan</Text>
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
                                    backgroundColor: '#f0fff6',
                                    marginHorizontal: 15,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }} >
                                    <FoundationIcon name="telephone" size={BACKGROUND_ICON_SIZE / 2} color={'green'} />
                                </View>

                                <View style={{
                                    justifyContent: 'space-between',
                                    alignItems: "center",
                                    flexDirection: "row",
                                    // backgroundColor: 'blue',
                                    width: width - 150
                                }} >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Hotline</Text>
                                    <TouchableOpacity>
                                        <View style={{
                                            borderRadius: BACKGROUND_ICON_SIZE,
                                            backgroundColor: 'gray',
                                            paddingHorizontal: 10,
                                            paddingVertical: 5
                                        }} >
                                            <Text style={{ color: 'white' }} >Coming Soon</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

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
                                    backgroundColor: '#f0ffff',
                                    marginHorizontal: 15,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }} >
                                    <FA5 name="info-circle" size={BACKGROUND_ICON_SIZE / 2} color={'dodgerblue'} />
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('About')} >
                                    <View style={{
                                        justifyContent: 'space-between',
                                        alignItems: "center",
                                        flexDirection: "row",
                                        // backgroundColor: 'blue',
                                        width: width - 150
                                    }} >
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >About</Text>
                                        <View style={{
                                            width: BACKGROUND_ICON_SIZE / 2,
                                            height: BACKGROUND_ICON_SIZE / 2,
                                            borderRadius: BACKGROUND_ICON_SIZE / 2,
                                            backgroundColor: '#d9d9d9',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} >
                                            <IOIcon name={'ios-arrow-forward'} size={24} color={'gray'} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </Animated.View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    containerScrollView: {

    }
})

export default Bantuan