import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, Animated, ScrollView, Image, Picker, TouchableOpacity, ActivityIndicator } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FA5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import Card from './Card'

const { width, height } = Dimensions.get('window')

const HEADER_MAX_HEIGHT = height / 3
const HEADER_MIN_HEIGHT = 0
const MAX_BORDER_RADIUS = 50
const MIN_BORDER_RADIUS = 0
const TITLE_MAX_HEIGHT = HEADER_MAX_HEIGHT / 4

const Kasus = () => {

    const scrollY = new Animated.Value(0)
    const [location, handleLocation] = useState(null)
    const [nasional, handleNasional] = useState(null)
    const [loading, handleLoading] = useState(false)
    const [hari, setHari] = useState(null)
    const [allWilayah, setAllWilayah] = useState(null)

    const apiNasional = async () => {
        let endpoint = `https://kawalcovid19.harippe.id/api/summary`
        let response = await axios.get(endpoint)
        handleNasional(response.data)
        // prettyDate(nasional.metadata.lastUpdatedAt)
    }

    const apiWilayah = async () => {
        let endpoint = `https://api.u9.nu/covid19?fbclid=IwAR3sGhD11zCYFvsB0u0NJjLm-XxZTif4Y27CGWpg4SDeCxuU_rfnUmanIxM`
        let response = await axios.get(endpoint)
        // console.log(response.data.wilayah)
        setAllWilayah(response.data.wilayah)
        setHari(response.data.nasional)
    }

    useEffect(() => {
        handleLoading(true)
        apiWilayah()
        apiNasional()
        handleLoading(false)
        // console.log(nasional)
    }, [])

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

    const prettyDate = (date) => {
        let d = date.split("T")
        let reversed = d[0].split('-').reverse().join('-')
        return reversed
    }

    const getLastDays = () => {
        let lastDays = hari[hari.length - 1]
        let date = new Date(lastDays.tanggal)
        let lastDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        return lastDate
    }

    // console.log(location)
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
                        }} >Lawan</Text>
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
                    backgroundColor: '#f7fbff',
                    borderTopStartRadius: borderRadiusContent,
                    borderTopEndRadius: borderRadiusContent,
                    padding: 10,
                    alignItems: "center"
                }}>
                    {loading ?
                        <ActivityIndicator size="large" color="#0000ff" style={{
                            position: 'absolute',
                            top: HEADER_MAX_HEIGHT
                        }} />
                        : <View>
                            {/* Picker untuk lokasi */}
                            <View style={{
                                marginTop: 20,
                                borderWidth: 2,
                                borderColor: '#67C57B',
                                borderRadius: width / 2,
                                width: width - 50,
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                alignItems: "center",
                                alignSelf: 'center'
                            }} >
                                <MaterialIcon name={"location-on"} size={24} color={'green'} />
                                <Picker
                                    selectedValue={location}
                                    style={{ height: 50, width: width - 90 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleLocation(itemValue)
                                    }>
                                    {allWilayah != null ? allWilayah.map((row, index) => {
                                        return <Picker.Item key={index} label={row.provinsi} value={row} />
                                    }) : null}
                                </Picker>
                            </View>

                            <Text style={{
                                marginTop: 30,
                                fontWeight: "bold",
                                fontSize: 26,
                                marginHorizontal: 18
                            }} >Update Kasus Corona</Text>
                            <View style={{
                                marginHorizontal: 18,
                                flexDirection: "row",
                                justifyContent: 'space-between'
                            }} >
                                <Text style={{
                                    color: 'gray',
                                }} >Terakhir diupdate {hari != null ? getLastDays() : null}</Text>
                                <TouchableOpacity style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }} >
                                    <Text style={{ color: '#67C57B', marginRight: 5 }} >Lihat Detail</Text>
                                    <FA5 name="angle-right" color={"#67C57B"} size={14} />
                                </TouchableOpacity>
                            </View>

                            {
                                location != null ?
                                    <MemoizedCard mt={20} positif={location.positif} sembuh={location.sembuh} meninggal={location.meninggal} />
                                    :
                                    <ActivityIndicator size="large" color="#0000ff" />
                            }

                            <Text style={{
                                marginTop: 30,
                                fontWeight: "bold",
                                fontSize: 26,
                                marginHorizontal: 18
                            }} >Nasional</Text>
                            <View style={{
                                marginHorizontal: 18,
                                flexDirection: "row",
                                justifyContent: 'space-between'
                            }} >
                                <Text style={{
                                    color: 'gray',
                                }} >Terakhir diupdate {nasional != null ? prettyDate(nasional.metadata.lastUpdatedAt) : null}</Text>
                            </View>
                            {
                                nasional != null ?
                                    <MemoizedCard mt={10} positif={nasional.confirmed.value} sembuh={nasional.recovered.value} meninggal={nasional.deaths.value} />
                                    :
                                    <ActivityIndicator size="large" color="#0000ff" />
                            }
                        </View>
                    }
                </Animated.View>
            </ScrollView>
        </View>
    )
}

const MemoizedCard = React.memo(Card)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Kasus