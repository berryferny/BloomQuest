=========================================================
1. COPIA ESTO EN TU ARCHIVO README.md
=========================================================

# 🌱 BloomQuest - Pequeños hábitos, grandes cambios.

BloomQuest es una aplicación móvil diseñada para ayudar a los usuarios a construir hábitos saludables, mantener una racha diaria de constancia y relajarse mediante minijuegos y un jardín virtual interactivo.

## 🚀 Tecnologías Utilizadas

*   **React Native & Expo:** Para el desarrollo multiplataforma (iOS, Android y Web).
*   **Expo Router:** Para la navegación entre pantallas.
*   **TypeScript:** Para un código robusto y libre de errores.
*   **Redux Toolkit:** Para el manejo del estado global (hábitos, monedas, jardín).
*   **Redux Persist:** Para guardar el progreso localmente.
*   **Supabase:** Base de datos PostgreSQL en la nube y autenticación de usuarios (Login/Registro).
*   **React Native Chart Kit:** Para visualización de datos (gráficas de emociones).

## ✨ Características Principales

*   **Autenticación Segura:** Registro e inicio de sesión con Supabase Auth.
*   **Gestión de Hábitos:** Crea, edita, elimina y completa hábitos diarios. Selección de días de la semana y recordatorios.
*   **Jardín Virtual:** Compra semillas, riégalas una vez al día y observa cómo crecen hasta florecer.
*   **Sistema de Recompensas:** Gana monedas completando hábitos, misiones y minijuegos.
*   **Registro Emocional:** Anota cómo te sientes y visualiza tu progreso en una gráfica personalizada.
*   **Zona de Juegos:** Minijuegos interactivos (Memoria Floral, Trivia, Atrapa Estrellas, etc.).

## 🛠️ Instalación y Ejecución Local

1. Clona este repositorio:
   git clone https://github.com/berryferny/BloomQuest.git

2. Entra al directorio del proyecto:
   cd BloomQuest

3. Instala las dependencias:
   npm install

4. Configura las variables de entorno:
   Crea un archivo .env en la raíz del proyecto y agrega tus credenciales de Supabase:
   EXPO_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_llave_publica

5. Inicia el servidor de desarrollo:
   npx expo start -c

6. Escanea el código QR con la app Expo Go en tu celular o presiona w para abrirlo en el navegador.

---
*Desarrollado con 💚 para florecer a tu propio ritmo.*
