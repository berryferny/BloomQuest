import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Inicio', icon: 'home', route: '/home' },
    { name: 'Hábitos', icon: 'list', route: '/habits' },
    { name: 'Explorar', icon: 'compass', route: '/explore' },
    { name: 'Jardín', icon: 'leaf', route: '/garden' },
    { name: 'Perfil', icon: 'person', route: '/profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
          >
            <Ionicons
              name={tab.icon as any}
              size={26}
              color={isActive ? '#342F29' : '#9BAA91'} // Espresso si está activo, Verde Salvia si no
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8F5EF', // Marfil
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EBE5DA', // Arena
  },
  tab: {
    padding: 8,
  },
});