import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Kasus, Informasi, Bantuan } from '../components'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
const Routes = () => {

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: 'green',
                    inactiveTintColor: 'gray',
                }}
                screenOptions={
                    ({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName
                            if (route.name == 'Kasus') {
                                iconName = 'face-profile'
                            } else if (route.name == 'Informasi') {
                                iconName = 'file-document'
                            } else if (route.name == 'Bantuan') {
                                iconName = 'plus'
                                return <FoundationIcon name={iconName} color={color} size={32} />
                            }

                            return <MCI name={iconName} color={color} size={32} />
                        }
                    })
                }
                keyboardHidesTabBar={true}
            >
                <Tab.Screen name="Kasus" component={Kasus} />
                <Tab.Screen name="Informasi" component={Informasi} />
                <Tab.Screen name="Bantuan" component={Bantuan} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Routes