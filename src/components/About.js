import React from 'react'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'

const About = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#f7fbff',
            justifyContent: 'center',
            alignItems: 'center'
        }} >
            <Text style={{
                fontSize: 32,
                fontWeight: 'bold'
            }}>Developer</Text>
            <Text style={{ fontSize: 20 }} >
                This application was made by
            </Text>
            <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/yoghi_yb/') }} >
                <Text style={{ color: 'dodgerblue', fontSize: 20 }} >@yoghi_yb</Text>
            </TouchableOpacity>

            <Text style={{ marginTop: 20, fontSize: 32, fontWeight: 'bold' }} >Design reference</Text>
            <View style={{ flexDirection: 'row' }} >
                <Text style={{ fontSize: 20 }}>Youtube : </Text>
                <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.youtube.com/watch?v=v2EbPtSs08A&t=2848s') }}
                >
                    <Text style={{ color: 'dodgerblue', fontSize: 20 }} >Mas KukuhAldy</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ marginTop: 20, fontSize: 32, fontWeight: 'bold' }} >Icon reference</Text>
            <Text style={{ fontSize: 20 }}>This application uses icons from</Text>
            <View style={{ flexDirection: "row" }} >
                <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.flaticon.com/authors/dinosoftlabs') }} >
                    <Text style={{ color: 'dodgerblue' }} >DinosoftLab </Text>
                </TouchableOpacity>
                <Text style={{}} >from </Text>
                <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.flaticon.com/') }}
                >
                    <Text style={{ color: 'dodgerblue' }} >www.flaticon.com</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }} >
                <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.flaticon.com/authors/freepik') }} >
                    <Text style={{ color: 'dodgerblue' }} >Freepik </Text>
                </TouchableOpacity>
                <Text style={{}} >from </Text>
                <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.flaticon.com/') }}
                >
                    <Text style={{ color: 'dodgerblue' }} >www.flaticon.com</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }} >
                <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.flaticon.com/authors/turkkub') }} >
                    <Text style={{ color: 'dodgerblue' }} >turkkub </Text>
                </TouchableOpacity>
                <Text style={{}} >from </Text>
                <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.flaticon.com/') }}
                >
                    <Text style={{ color: 'dodgerblue' }} >www.flaticon.com</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }} >
                <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.flaticon.com/authors/pixelmeetup') }} >
                    <Text style={{ color: 'dodgerblue' }} >Pixelmeetup </Text>
                </TouchableOpacity>
                <Text style={{}} >from </Text>
                <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.flaticon.com/') }}
                >
                    <Text style={{ color: 'dodgerblue' }} >www.flaticon.com</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ marginTop: 50, fontSize: 32, fontStyle: 'italic' }} >#DirumahAja</Text>
        </View>
    )
}

export default About