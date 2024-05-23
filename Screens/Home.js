
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import groups from './homeScreens/Groups';
import listProfile from './homeScreens/ListProfile';
import myProfile from './homeScreens/MyProfile';
const Tab = createMaterialBottomTabNavigator();
export default function Home(props) {
  const currentid = props.route.params.currentid;
  return (
    <Tab.Navigator>
      <Tab.Screen name="My profile" component={myProfile} initialParams={{currentid: currentid}} />
      <Tab.Screen name="Groups" component={groups} initialParams={{currentid: currentid}}/>
      <Tab.Screen name="List Profiles" component={listProfile} initialParams={{currentid: currentid}} />
    </Tab.Navigator>
  )
}