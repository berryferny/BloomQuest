import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Inicio', icon: 'home-outline', route: '/home' },
    { name: 'Hábitos', icon: 'checkmark-circle-outline', route: '/habits' },
    { name: 'Explorar', icon: 'compass-outline', route: '/explore' },
    { name: 'Jardín', icon: 'leaf-outline', route: '/garden' },
    { name: 'Perfil', icon: 'person-outline', route: '/profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            // AQUÍ ESTÁ EL CAMBIO: replace en lugar de push
            onPress={() => router.replace(tab.route as any)}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={isActive ? '#342F29' : '#9BAA91'} 
            />
            <Text style={[styles.tabText, { color: isActive ? '#342F29' : '#9BAA91' }]}>
              {tab.name}
            </Text>
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
    backgroundColor: '#F8F5EF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EBE5DA',
    paddingBottom: 25,
  },
  tab: { alignItems: 'center', justifyContent: 'center', padding: 5 },
  tabText: { fontSize: 12, marginTop: 4, fontWeight: '500' },
});