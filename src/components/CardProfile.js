import React from 'react'
import { View, Image, Text, Dimensions } from 'react-native'

var { width, heigh } = Dimensions.get('window')

const CardProfile = ({ gender, klaster, umur, status, wn }) => {

    const statusColor = (status) => {
        switch (status) {
            case 'Dalam Perawatan':
                return '#ffb41f'

            case 'Sembuh':
                return '#67C57B'

            case 'Meninggal':
                return '#ff0f0f'
        }
    }

    let clr = statusColor(status)

    console.log(wn)

    return (
        <View style={{
            marginVertical: 10,
            width: width - 50,
            height: 100,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "row",
            paddingHorizontal: 10,
            borderRadius: 10,
            elevation: 2
        }} >
            <View style={{
                backgroundColor: '#b8fbff',
                width: 80,
                height: 80,
                borderRadius: 80,
                overflow: 'hidden',
                alignItems: "center",
                justifyContent: 'center'
            }} >
                <Image source={gender == 'Laki-laki' ? require('../assets/icons/male.png') : require('../assets/icons/female.png')} style={{
                    flex: 1,
                    width: 80,
                    height: 80,
                }} />
            </View>
            <View style={{
                flex: 1,
                // backgroundColor: 'blue',
                marginLeft: 10
            }} >
                <Text style={{
                    fontSize: 16
                }} >{klaster}</Text>
                <View style={{
                    // backgroundColor: 'orange',
                    marginVertical: 3,
                    flexDirection: "row"
                }} >
                    <Text style={{ fontSize: 16 }} >{umur} thn</Text>
                    <View style={{
                        marginLeft: 5,
                        backgroundColor: clr,
                        paddingHorizontal: 5,
                        borderRadius: 5
                    }} >
                        <Text style={{
                            fontSize: 16,
                            color: 'white'
                        }}>{status}</Text>
                    </View>
                </View>
                <Text style={{
                    fontSize: 16
                }}>{wn}</Text>
            </View>
        </View>
    )
}

export default CardProfile