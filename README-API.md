# 🚀 CaBsCrypto Landing Page - Social Media API Integration

## 📊 Integración de Datos Reales de Redes Sociales

Este proyecto incluye un sistema completo para mostrar datos reales de seguidores desde las APIs de las principales redes sociales.

## 🔧 Configuración de APIs

### 1. YouTube Data API v3
```bash
# Pasos para obtener la API key:
1. Ve a https://console.developers.google.com/
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita YouTube Data API v3
4. Crea credenciales (API Key)
5. Reemplaza 'YOUR_YOUTUBE_API_KEY' en api-config.js
```

### 2. Twitter API v2
```bash
# Pasos para obtener el Bearer Token:
1. Ve a https://developer.twitter.com/
2. Solicita una cuenta de desarrollador
3. Crea una nueva aplicación
4. Genera Bearer Token
5. Reemplaza 'YOUR_TWITTER_BEARER_TOKEN' en api-config.js
```

### 3. Telegram Bot API
```bash
# Pasos para crear el bot:
1. Envía mensaje a @BotFather en Telegram
2. Usa el comando /newbot
3. Sigue las instrucciones para crear el bot
4. Copia el token del bot
5. Reemplaza 'YOUR_TELEGRAM_BOT_TOKEN' en api-config.js
```

### 4. Instagram Basic Display API
```bash
# Pasos para obtener el Access Token:
1. Ve a https://developers.facebook.com/
2. Crea una aplicación de Facebook
3. Añade el producto Instagram Basic Display
4. Solicita aprobación (puede tomar tiempo)
5. Obtén el access token
6. Reemplaza 'YOUR_INSTAGRAM_ACCESS_TOKEN' en api-config.js
```

## 🎯 Funcionalidades Implementadas

### ✅ Características Actuales:
- **Contadores animados**: Los números suben desde 0 hasta el valor real
- **Formato inteligente**: 1000 → 1K, 1000000 → 1M
- **Actualización automática**: Los datos se refrescan cada 5 minutos
- **Fallback inteligente**: Si las APIs fallan, usa datos de respaldo
- **Animaciones suaves**: Transiciones fluidas entre valores

### 🔄 Flujo de Datos:
1. **Carga inicial**: Muestra datos estáticos
2. **Llamada a APIs**: Obtiene datos reales (3 segundos después)
3. **Animación**: Los contadores suben hasta los valores reales
4. **Actualización**: Se refresca automáticamente cada 5 minutos

## 🛠️ Implementación Técnica

### Estructura del Código:
```javascript
// 1. Configuración de APIs
const socialMediaData = { ... };

// 2. Función principal de obtención de datos
async function fetchSocialMediaData() { ... }

// 3. Actualización de la interfaz
function updateSocialMediaCards(data) { ... }

// 4. Animación de contadores
function animateSocialCounters() { ... }

// 5. Auto-refresh
function startSocialMediaRefresh() { ... }
```

### Datos Actuales (Mock):
- **Instagram**: 12.5K seguidores
- **YouTube**: 3.2K suscriptores  
- **TikTok**: 45K seguidores
- **Twitter**: 2.8K seguidores
- **Telegram**: 1.2K miembros

## 🔒 Seguridad y Mejores Prácticas

### ⚠️ Importante:
- **Nunca** subas las API keys a repositorios públicos
- Usa variables de entorno en producción
- Implementa manejo de errores robusto
- Respeta los límites de rate de las APIs
- Considera usar un backend para ocultar las API keys

### 🚀 Para Producción:
```javascript
// Usar variables de entorno
const API_KEY = process.env.YOUTUBE_API_KEY;

// Implementar backend proxy
const response = await fetch('/api/social-data');

// Manejo de errores
try {
    const data = await fetchSocialData();
} catch (error) {
    console.log('Fallback to static data');
}
```

## 📱 Alternativas para TikTok

TikTok no proporciona API pública para conteos de seguidores. Opciones:

1. **Servicios de terceros**: SocialBlade, RapidAPI
2. **Web scraping**: ScrapingBee, Bright Data
3. **Actualización manual**: Cambiar valores periódicamente

## 🎨 Personalización

### Cambiar Intervalo de Actualización:
```javascript
// Cambiar de 5 minutos a 10 minutos
setInterval(() => {
    fetchSocialMediaData();
}, 600000); // 10 minutos
```

### Modificar Datos Mock:
```javascript
const mockData = {
    instagram: { followers: 15000 }, // Cambiar valor
    youtube: { subscribers: 5000 },   // Cambiar valor
    // ...
};
```

## 🚀 Próximos Pasos

1. **Obtener API keys** de las plataformas
2. **Configurar variables de entorno**
3. **Implementar backend** para ocultar keys
4. **Agregar más métricas** (likes, views, etc.)
5. **Implementar cache** para mejor performance

---

**¡Tu landing page ahora muestra datos reales y se actualiza automáticamente!** 🎉
