import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Card from './Card'
import Provinsi from './Prov'
import FA5 from 'react-native-vector-icons/FontAwesome5'
import CardProfile from './CardProfile';

var { width, height } = Dimensions.get('window')

const CONTENT_WIDTH = width - 50
const CHART_HEIGHT = height / 3

const DetailKasus = ({ navigation, route }) => {
    const [perHari, setPerHari] = useState(null)
    const [perTanggal, setTanggal] = useState(null)
    const [loading, setLoading] = useState(false)
    const [provinsi, setProvinsi] = useState(null)
    const [filteredProv, setFilteredProv] = useState(null)
    const [kasus, setkasus] = useState(null)
    const [filteredKasus, setFilteredKasus] = useState(null)

    const { nasional } = route.params
    // console.log(nasional)

    const fetchPerHari = async () => {
        let endpoint = `https://indonesia-covid-19.mathdro.id/api/harian`
        let response = await axios.get(endpoint)

        // mengambil data dalam 5 hari terakhir
        let getPositivValue = await response.data.data.map(positiv => positiv.jumlahKasusKumulatif)

        // mengambil tanggal dari perkasus
        let getDate = await response.data.data.map(kasus => kasus.tanggal)

        // mengambil 5 hari terakhir dari total kasus
        let getLastFiveDate = getDate.slice(Math.max(getDate.length - 6, 1))
        let lastFiveDaysPositive = getPositivValue.slice(Math.max(getPositivValue.length - 6, 1))

        let spliceDate = await getLastFiveDate.map(timestamp => {
            let date = new Date(timestamp)
            return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear().toString().substr(2, 2);
        })

        // console.log(spliceDate)
        // console.log(lastFiveDaysPositive)

        setPerHari(lastFiveDaysPositive)
        setTanggal(spliceDate)
    }

    const fetchProvinsi = async () => {
        let endpoint = `https://indonesia-covid-19.mathdro.id/api/provinsi`
        let response = await axios.get(endpoint)

        // filter 5 data provinsi saja untuk di tampilkan
        let prov = response.data.data.slice(0, 5)

        // console.log(prov)
        setFilteredProv(prov)
        setProvinsi(response.data.data)
    }

    const fetchDataKasus = async () => {
        let endpoint = `https://indonesia-covid-19.mathdro.id/api/kasus`
        let response = await axios.get(endpoint)

        let kasus = response.data.data.nodes.slice(0, 5)

        setFilteredKasus(kasus)
        setkasus(response.data.data.nodes)
    }

    useEffect(() => {
        setLoading(true)
        fetchPerHari()
        fetchProvinsi()
        fetchDataKasus()
        setLoading(false)
    }, [])

    console.log(filteredKasus)
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#f7fbff',
            alignItems: 'center'
        }} >
            <ScrollView >
                <View style={{
                    alignItems: 'center',
                    width: width,
                    paddingBottom: 10,
                    backgroundColor: '#f7fbff',
                    // height: 1000
                }}>

                    <Text style={{
                        marginTop: 10,
                        fontSize: 18,
                        fontWeight: 'bold',

                    }} >Statistik Kasus Coronavirus di Indonesia</Text>
                    {
                        perTanggal == null ?
                            <ActivityIndicator size="large" color="#0000ff" style={{ width: CONTENT_WIDTH, height: CHART_HEIGHT }} />
                            :
                            <LineChart
                                data={{
                                    labels: perTanggal == null ? [] : perTanggal,
                                    datasets: [
                                        {
                                            data: perHari != null ? perHari : [0, 0, 0, 0, 0, 0]
                                        }
                                    ]
                                }}
                                width={CONTENT_WIDTH} // from react-native
                                height={CHART_HEIGHT}
                                // yAxisLabel="$"
                                // yAxisSuffix="k"
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#34eb86",
                                    backgroundGradientFrom: "#1bb35f",
                                    backgroundGradientTo: "#e80505",
                                    decimalPlaces: 1, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "5",
                                        strokeWidth: "2",
                                        stroke: "#ffc13b"
                                    }
                                }}
                                // bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 10
                                }}
                            />
                    }
                    <MemoizedCard mt={20} positif={nasional.confirmed.value} sembuh={nasional.recovered.value} meninggal={nasional.deaths.value} />
                    <View style={{
                        marginTop: 7,
                        width: CONTENT_WIDTH,
                        // backgroundColor: 'red'
                    }} >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginTop: 15,
                            alignSelf: 'flex-start',
                            width: CONTENT_WIDTH,
                        }} >Berdasarkan Provinsi</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            // width: CONTENT_WIDTH
                        }} >
                            <Text style={{
                                fontSize: 16,
                                color: 'gray',
                                fontWeight: 'bold',
                                alignSelf: 'flex-start',
                                // width: CONTENT_WIDTH,
                            }} >Geser Ke Kiri</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DetailProv', { provinsi })}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }} >
                                <Text style={{
                                    fontSize: 16,
                                    color: '#67C57B',
                                    marginRight: 5,
                                    alignSelf: 'flex-start',
                                }} >Lihat Detail </Text>
                                <FA5 name="angle-right" color={"#67C57B"} size={14} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        filteredProv == null ?
                            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 15 }} />
                            :
                            <ScrollView horizontal={true} contentContainerStyle={{ paddingRight: 30 }} >
                                {
                                    filteredProv.map(prov => (
                                        <View style={{
                                            marginLeft: 30,
                                            marginBottom: 7
                                        }} >
                                            <Provinsi provinsi={prov.provinsi} positif={prov.kasusPosi} sembuh={prov.kasusSemb} meninggal={prov.kasusMeni} />
                                        </View>
                                    ))
                                }
                            </ScrollView>
                    }

                    <View style={{
                        width: CONTENT_WIDTH
                    }} >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginTop: 15,
                            alignSelf: 'flex-start',
                            width: CONTENT_WIDTH,
                        }} >Data Kasus</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            // width: CONTENT_WIDTH
                        }} >
                            <Text style={{
                                fontSize: 16,
                                color: 'gray',
                                fontWeight: 'bold',
                                alignSelf: 'flex-start',
                                // width: CONTENT_WIDTH,
                            }} >Geser Ke Kiri</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DataKasus', { kasus })}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }} >
                                <Text style={{
                                    fontSize: 16,
                                    color: '#67C57B',
                                    marginRight: 5,
                                    alignSelf: 'flex-start',
                                }} >Lihat Detail </Text>
                                <FA5 name="angle-right" color={"#67C57B"} size={14} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        filteredKasus == null ?
                            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 15 }} />
                            :
                            <ScrollView horizontal={true} contentContainerStyle={{ paddingRight: 30 }}>
                                {
                                    filteredKasus.map(row => (
                                        <View style={{
                                            marginLeft: 30,
                                            marginBottom: 7
                                        }} >
                                            <CardProfile gender={row.gender} klaster={row.klaster} umur={row.umur} status={row.status} wn={row.wn} />
                                        </View>
                                    ))
                                }
                            </ScrollView>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const MemoizedCard = React.memo(Card)

export default DetailKasus