import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Kasus, Informasi, Bantuan, About } from '../components'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
const Routes = () => {

    const Tab = createBottomTabNavigator();

    const Home = () => {
        return (
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
        )
    }

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="About" component={About} options={{ headerShown: true, title: 'About' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes