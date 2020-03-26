import React from 'react'
import { View, Image, Text, ScrollView, Dimensions } from 'react-native'
import CardProfile from './CardProfile'

var { width, height } = Dimensions.get('window')

const DataKasus = ({ route }) => {
    const { kasus } = route.params
    console.log(kasus)
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#f7fbff',
            alignItems: 'center'
        }} >
            <ScrollView>
                <View style={{ width: width, alignItems: "center" }} >
                    {
                        kasus.map(row => (
                            <CardProfile gender={row.gender} klaster={row.klaster} umur={row.umur} status={row.status} wn={row.wn} />
                        ))
                    }

                </View>
            </ScrollView>
        </View>
    )
}

export default DataKasus