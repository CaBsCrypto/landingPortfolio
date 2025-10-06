# 🤖 Bot de Telegram CaBsCrypto - Guía Completa

## 🚀 Sistema de Onboarding Automático

Este bot de Telegram está diseñado para hacer onboarding automático de clientes potenciales y dirigirlos hacia ti para colaboraciones.

## 📋 Características del Bot

### ✅ **Funcionalidades Implementadas:**
- **Onboarding de 7 pasos** con preguntas estratégicas
- **Calificación automática** de leads
- **Notificaciones en tiempo real** a CaBsCrypto
- **Integración con landing page** via widget de chat
- **Respuestas automáticas** inteligentes
- **Sistema de estados** para seguimiento

### 🎯 **Flujo del Onboarding:**
1. **Nombre completo** del cliente
2. **Empresa/Proyecto** donde trabaja
3. **Tipo de servicio** que necesita
4. **Rango de presupuesto**
5. **Timeline** del proyecto
6. **Experiencia en crypto**
7. **Preferencia de contacto**

## 🛠️ Configuración Paso a Paso

### **Paso 1: Crear el Bot**

1. **Abre Telegram** y busca `@BotFather`
2. **Envía el comando** `/newbot`
3. **Sigue las instrucciones:**
   - Nombre del bot: `CaBsCrypto Assistant`
   - Username: `CaBsCryptoBot` (debe ser único)
4. **Copia el token** que te da BotFather

### **Paso 2: Obtener tu Chat ID**

1. **Busca** `@userinfobot` en Telegram
2. **Envía cualquier mensaje** al bot
3. **Copia tu Chat ID** (número que aparece)

### **Paso 3: Configurar Variables**

1. **Crea un archivo** `.env` en la carpeta del bot:
```bash
TELEGRAM_BOT_TOKEN=tu_token_aqui
CABSCRYPTO_CHAT_ID=tu_chat_id_aqui
```

2. **Reemplaza los valores** con tus datos reales

### **Paso 4: Instalar Dependencias**

```bash
npm install
```

### **Paso 5: Ejecutar el Bot**

```bash
npm start
```

## 🎨 Integración con Landing Page

### **Widget de Chat Implementado:**
- **Botón flotante** en la esquina inferior derecha
- **Chat simulado** que redirige a Telegram
- **Animaciones** y efectos visuales
- **Responsive** para móviles

### **Funcionalidades del Widget:**
- **Auto-activación** después de 5 segundos
- **Notificaciones** automáticas
- **Redirección** directa a Telegram
- **Mensajes** de bienvenida

## 📊 Sistema de Notificaciones

### **Notificaciones a CaBsCrypto:**
Cuando un usuario completa el onboarding, recibes:

```
🔔 NUEVO LEAD CALIFICADO

👤 Usuario: Juan Pérez
🏢 Empresa: Crypto Startup
🎯 Proyecto: Videos educativos
💰 Presupuesto: $2,500 - $5,000 USD
📅 Timeline: Próximo mes
🎓 Experiencia: Intermedio
📞 Contacto: Telegram

💬 Chat ID: 123456789
⏰ Fecha: 06/10/2025 03:45:00
```

### **Acciones Disponibles:**
- **📞 Contactar usuario** directamente
- **👤 Ver perfil** completo
- **📊 Agregar a CRM** (futuro)

## 🎯 Personalización del Bot

### **Modificar Preguntas:**
Edita el archivo `telegram-bot.js`:

```javascript
const PROJECT_TYPES = {
    '1': '🎮 Game Night - Streams de gaming con análisis crypto',
    '2': '📹 Videos - Contenido educativo sobre crypto',
    // Agregar más opciones...
};
```

### **Cambiar Mensajes:**
```javascript
function getWelcomeMessage() {
    return `🚀 ¡Hola! Soy el asistente de CaBsCrypto
    
    // Personalizar mensaje aquí...
    `;
}
```

### **Agregar Nuevas Funcionalidades:**
- **Base de datos** para almacenar leads
- **Integración CRM** (HubSpot, Pipedrive)
- **Email automático** de seguimiento
- **Calendario** para agendar citas

## 🔧 Comandos del Bot

### **Comandos Disponibles:**
- `/start` - Iniciar onboarding
- `/help` - Mostrar ayuda
- `/info` - Información sobre servicios
- `/contact` - Contactar directamente

### **Respuestas Automáticas:**
- **Bienvenida** personalizada
- **Información** de servicios
- **Redirección** a contacto directo
- **Soporte** básico

## 📱 Uso en Producción

### **Despliegue Recomendado:**
1. **Servidor VPS** (DigitalOcean, AWS)
2. **PM2** para gestión de procesos
3. **Nginx** como proxy reverso
4. **SSL** para seguridad

### **Comandos de Despliegue:**
```bash
# Instalar PM2
npm install -g pm2

# Ejecutar bot con PM2
pm2 start telegram-bot.js --name "cabscrypto-bot"

# Configurar auto-start
pm2 startup
pm2 save
```

## 🚀 Próximas Mejoras

### **Funcionalidades Futuras:**
- **Dashboard web** para ver leads
- **Integración CRM** completa
- **Email marketing** automático
- **Calendario** de citas
- **Pagos** integrados
- **Multiidioma** (inglés/español)

### **Analytics:**
- **Métricas** de conversión
- **Tiempo** promedio de onboarding
- **Abandono** por paso
- **Fuentes** de tráfico

## 🛡️ Seguridad

### **Mejores Prácticas:**
- **Nunca** compartir tokens públicamente
- **Usar variables** de entorno
- **Validar** datos de entrada
- **Rate limiting** para prevenir spam
- **Logs** de actividad

## 📞 Soporte

### **Si tienes problemas:**
1. **Revisa** los logs del bot
2. **Verifica** las variables de entorno
3. **Comprueba** que el token sea válido
4. **Testa** con @BotFather

### **Recursos Útiles:**
- [Documentación Telegram Bot API](https://core.telegram.org/bots/api)
- [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)

---

**¡Tu bot está listo para generar leads de calidad!** 🎉

**Próximo paso:** Configurar el bot y empezar a recibir clientes potenciales automáticamente.
