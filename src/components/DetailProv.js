import React from 'react'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import Provinsi from './Prov'

var { width, height } = Dimensions.get('window')

const DetailProv = ({ route }) => {
    const { provinsi } = route.params
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#f7fbff',
            alignItems: 'center'
        }} >
            {/* <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 15
            }} >Kasus Berdasasrkan Provinsi</Text> */}
            {
                provinsi == null ?
                    <Text>TEST</Text>
                    :
                    <ScrollView contentContainerStyle={{ width: width, alignItems: 'center' }} >
                        {provinsi.map(prov => <Provinsi provinsi={prov.provinsi} positif={prov.kasusPosi} sembuh={prov.kasusSemb} meninggal={prov.kasusMeni} />)}
                    </ScrollView>
            }
        </View>
    )
}

export default DetailProv