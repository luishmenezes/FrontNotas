// navigation/InicioStack.tsx
import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from './types';
import PerfilScreen from '../screens/Perfil/Perfil';
import InicioScreen from '../screens/Inicio/Inicio';
import CalendarioScreen from '../screens/Calendario/Calendario';
import HeaderPerfil from '../components/HeaderPerfil';
import EventosAluno from '@/screens/EventosAluno';
import DisciplinasScreen from '../screens/Disciplinas/DisciplinasScreen';
import DashboardScreen from "@/screens/Dashboard/DashboardScreen"; // Importe a tela de Disciplinas

// Definindo os tipos de ícones permitidos
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderPerfil />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: MaterialIconName = 'home'; // Valor padrão

            switch (route.name) {
              case 'Início':
                iconName = 'home';
                break;
              case 'Disciplinas':
                iconName = 'library-books'; // Ícone para Disciplinas
                break;
              case 'Atividades':
                iconName = 'assignment';
                break;
              case 'Equipes':
                iconName = 'groups';
                break;
              case 'Calendário':
                iconName = 'calendar-today';
                break;
              case 'Notificação':
                iconName = focused ? 'notifications-active' : 'notifications';
                break;
            }

            return (
              <MaterialIcons 
                name={iconName} 
                size={size} 
                color={color}
                style={focused ? styles.iconFocused : null}
              />
            );
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#003F73',
            height: 70,
            paddingBottom: 8,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 6,
            fontWeight: '500',
          },
          tabBarItemStyle: {
            paddingVertical: 6,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Início" component={InicioScreen} />
        <Tab.Screen name="Disciplinas" component={DisciplinasScreen} />
        <Tab.Screen name="Calendário" component={CalendarioScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen 
          name="Notificação" 
          component={EventosAluno}
          options={{
            tabBarBadgeStyle: {
              backgroundColor: 'red',
              color: 'white',
              fontSize: 10,
              minWidth: 16,
              height: 16,
            }
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function InicioStack() {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Tab" component={MainTabs} />
      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = {
  iconFocused: {
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
};