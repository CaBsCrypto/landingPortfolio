const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Configuración del bot
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Estados del usuario para el onboarding
const userStates = new Map();
const userData = new Map();

// Estados del onboarding
const STATES = {
    START: 'start',
    NAME: 'name',
    COMPANY: 'company',
    PROJECT_TYPE: 'project_type',
    BUDGET: 'budget',
    TIMELINE: 'timeline',
    EXPERIENCE: 'experience',
    CONTACT_PREFERENCE: 'contact_preference',
    COMPLETED: 'completed'
};

// Datos de proyectos disponibles
const PROJECT_TYPES = {
    '1': '🎮 Game Night - Streams de gaming con análisis crypto',
    '2': '📹 Videos - Contenido educativo sobre crypto',
    '3': '📡 Streams - Trading en vivo y análisis técnico',
    '4': '📱 Shorts - Contenido viral para TikTok/Instagram',
    '5': '📅 Packs Mensuales - Contenido premium crypto',
    '6': '👥 Eventos IRL - Conferencias y meetups',
    '7': '🎯 Consultoría Personalizada - Estrategia crypto'
};

const BUDGET_RANGES = {
    '1': '💰 $500 - $1,000 USD',
    '2': '💰 $1,000 - $2,500 USD',
    '3': '💰 $2,500 - $5,000 USD',
    '4': '💰 $5,000 - $10,000 USD',
    '5': '💰 $10,000+ USD',
    '6': '💰 Presupuesto flexible'
};

const TIMELINE_OPTIONS = {
    '1': '⚡ Urgente (1-2 semanas)',
    '2': '📅 Próximo mes',
    '3': '📅 En 2-3 meses',
    '4': '📅 Más de 3 meses',
    '5': '📅 Sin prisa'
};

// Función para crear teclados inline
function createInlineKeyboard(options, columns = 1) {
    const keyboard = [];
    const keys = Object.keys(options);
    
    for (let i = 0; i < keys.length; i += columns) {
        const row = [];
        for (let j = 0; j < columns && i + j < keys.length; j++) {
            const key = keys[i + j];
            row.push({
                text: options[key],
                callback_data: key
            });
        }
        keyboard.push(row);
    }
    
    return { inline_keyboard: keyboard };
}

// Función para crear teclado de respuesta rápida
function createReplyKeyboard(options, oneTime = true) {
    const keyboard = [];
    const keys = Object.keys(options);
    
    for (let i = 0; i < keys.length; i += 2) {
        const row = [];
        for (let j = 0; j < 2 && i + j < keys.length; j++) {
            const key = keys[i + j];
            row.push(options[key]);
        }
        keyboard.push(row);
    }
    
    return {
        keyboard: keyboard,
        one_time_keyboard: oneTime,
        resize_keyboard: true
    };
}

// Mensaje de bienvenida
function getWelcomeMessage() {
    return `🚀 ¡Hola! Soy el asistente de CaBsCrypto

👋 Bienvenido al proceso de colaboración. Te haré algunas preguntas rápidas para entender mejor tu proyecto y cómo puedo ayudarte.

⏱️ Este proceso tomará solo 2-3 minutos.

¿Estás listo para comenzar?`;
}

// Función para enviar mensaje de bienvenida
function sendWelcomeMessage(chatId) {
    const keyboard = createInlineKeyboard({
        'start': '✅ Comenzar Onboarding',
        'info': 'ℹ️ Más información sobre servicios'
    });
    
    bot.sendMessage(chatId, getWelcomeMessage(), {
        reply_markup: keyboard
    });
}

// Función para preguntar el nombre
function askForName(chatId) {
    const message = `👤 **Paso 1/7: Información Personal**

¿Cuál es tu nombre completo?

_Escribe tu nombre para continuar..._`;
    
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    userStates.set(chatId, STATES.NAME);
}

// Función para preguntar la empresa
function askForCompany(chatId) {
    const message = `🏢 **Paso 2/7: Información de Empresa**

¿En qué empresa o proyecto trabajas?

_Escribe el nombre de tu empresa o proyecto..._`;
    
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    userStates.set(chatId, STATES.COMPANY);
}

// Función para preguntar tipo de proyecto
function askForProjectType(chatId) {
    const message = `🎯 **Paso 3/7: Tipo de Proyecto**

¿Qué tipo de servicio te interesa más?

_Selecciona una opción:_`;
    
    const keyboard = createInlineKeyboard(PROJECT_TYPES, 1);
    bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
    userStates.set(chatId, STATES.PROJECT_TYPE);
}

// Función para preguntar presupuesto
function askForBudget(chatId) {
    const message = `💰 **Paso 4/7: Presupuesto**

¿Cuál es tu rango de presupuesto aproximado?

_Selecciona una opción:_`;
    
    const keyboard = createInlineKeyboard(BUDGET_RANGES, 1);
    bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
    userStates.set(chatId, STATES.BUDGET);
}

// Función para preguntar timeline
function askForTimeline(chatId) {
    const message = `📅 **Paso 5/7: Timeline**

¿Cuándo necesitas que esté listo el proyecto?

_Selecciona una opción:_`;
    
    const keyboard = createInlineKeyboard(TIMELINE_OPTIONS, 1);
    bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
    userStates.set(chatId, STATES.TIMELINE);
}

// Función para preguntar experiencia
function askForExperience(chatId) {
    const message = `🎓 **Paso 6/7: Experiencia en Crypto**

¿Cuál es tu nivel de experiencia con crypto y blockchain?

_Selecciona una opción:_`;
    
    const experienceOptions = {
        '1': '🟢 Principiante - Aprendiendo los conceptos básicos',
        '2': '🟡 Intermedio - Tengo algo de experiencia',
        '3': '🟠 Avanzado - Experiencia considerable',
        '4': '🔴 Experto - Profesional en el área'
    };
    
    const keyboard = createInlineKeyboard(experienceOptions, 1);
    bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
    userStates.set(chatId, STATES.EXPERIENCE);
}

// Función para preguntar preferencia de contacto
function askForContactPreference(chatId) {
    const message = `📞 **Paso 7/7: Preferencia de Contacto**

¿Cómo prefieres que te contacte?

_Selecciona una opción:_`;
    
    const contactOptions = {
        '1': '💬 Telegram - Chat directo',
        '2': '📧 Email - Correo electrónico',
        '3': '📞 Llamada - Videollamada',
        '4': '🏢 Presencial - Si estás en la misma ciudad'
    };
    
    const keyboard = createInlineKeyboard(contactOptions, 1);
    bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
    userStates.set(chatId, STATES.CONTACT_PREFERENCE);
}

// Función para completar el onboarding
function completeOnboarding(chatId) {
    const data = userData.get(chatId);
    
    const summary = `✅ **¡Onboarding Completado!**

📋 **Resumen de tu información:**
• **Nombre:** ${data.name}
• **Empresa:** ${data.company}
• **Proyecto:** ${PROJECT_TYPES[data.projectType]}
• **Presupuesto:** ${BUDGET_RANGES[data.budget]}
• **Timeline:** ${TIMELINE_OPTIONS[data.timeline]}
• **Experiencia:** ${data.experience}
• **Contacto:** ${data.contactPreference}

🎯 **Próximos pasos:**
CaBsCrypto revisará tu información y te contactará en las próximas 24 horas según tu preferencia.

💡 **Mientras tanto:**
• Sígueme en mis redes sociales
• Revisa mi contenido en YouTube
• Únete a mi comunidad de Telegram

¿Te gustaría que te conecte directamente con CaBsCrypto ahora?`;
    
    const keyboard = createInlineKeyboard({
        'connect': '🤝 Conectar con CaBsCrypto',
        'socials': '📱 Ver redes sociales',
        'portfolio': '🎬 Ver portfolio'
    });
    
    bot.sendMessage(chatId, summary, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
    
    userStates.set(chatId, STATES.COMPLETED);
    
    // Enviar notificación a CaBsCrypto
    notifyCaBsCrypto(chatId, data);
}

// Función para notificar a CaBsCrypto sobre nuevo lead
function notifyCaBsCrypto(chatId, data) {
    const notification = `🔔 **NUEVO LEAD CALIFICADO**

👤 **Usuario:** ${data.name}
🏢 **Empresa:** ${data.company}
🎯 **Proyecto:** ${PROJECT_TYPES[data.projectType]}
💰 **Presupuesto:** ${BUDGET_RANGES[data.budget]}
📅 **Timeline:** ${TIMELINE_OPTIONS[data.timeline]}
🎓 **Experiencia:** ${data.experience}
📞 **Contacto:** ${data.contactPreference}

💬 **Chat ID:** ${chatId}
⏰ **Fecha:** ${new Date().toLocaleString()}

🤖 **Acciones disponibles:**`;
    
    const keyboard = createInlineKeyboard({
        'contact': '📞 Contactar usuario',
        'view_profile': '👤 Ver perfil',
        'add_crm': '📊 Agregar a CRM'
    });
    
    // Reemplazar con tu chat ID real
    const CABSCRYPTO_CHAT_ID = process.env.CABSCRYPTO_CHAT_ID || 'YOUR_CHAT_ID';
    
    bot.sendMessage(CABSCRYPTO_CHAT_ID, notification, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
    });
}

// Manejar mensajes de texto
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);
    
    if (state === STATES.NAME) {
        userData.set(chatId, { ...userData.get(chatId), name: text });
        askForCompany(chatId);
    } else if (state === STATES.COMPANY) {
        userData.set(chatId, { ...userData.get(chatId), company: text });
        askForProjectType(chatId);
    } else if (text === '/start') {
        userData.set(chatId, {});
        sendWelcomeMessage(chatId);
    } else if (text === '/help') {
        bot.sendMessage(chatId, `🤖 **Comandos disponibles:**

/start - Iniciar onboarding
/help - Mostrar ayuda
/info - Información sobre servicios
/contact - Contactar directamente

💡 **Tip:** Usa /start para comenzar el proceso de colaboración.`);
    } else if (text === '/info') {
        const infoMessage = `ℹ️ **Servicios de CaBsCrypto:**

🎮 **Game Night** - Streams de gaming con análisis crypto
📹 **Videos** - Contenido educativo sobre crypto
📡 **Streams** - Trading en vivo y análisis técnico
📱 **Shorts** - Contenido viral para TikTok/Instagram
📅 **Packs Mensuales** - Contenido premium crypto
👥 **Eventos IRL** - Conferencias y meetups
🎯 **Consultoría** - Estrategia crypto personalizada

🚀 **¿Listo para colaborar?** Usa /start para comenzar.`;
        
        bot.sendMessage(chatId, infoMessage, { parse_mode: 'Markdown' });
    } else if (text === '/contact') {
        const contactMessage = `📞 **Contacto Directo:**

💬 **Telegram:** @CaBsCrypto
📧 **Email:** cabscryptocontacto@gmail.com
🌐 **Website:** [Tu landing page]

🤖 **O usa /start para el onboarding completo**`;
        
        bot.sendMessage(chatId, contactMessage, { parse_mode: 'Markdown' });
    }
});

// Manejar callbacks de botones inline
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    const state = userStates.get(chatId);
    
    bot.answerCallbackQuery(callbackQuery.id);
    
    if (data === 'start') {
        userData.set(chatId, {});
        askForName(chatId);
    } else if (data === 'info') {
        const infoMessage = `ℹ️ **Servicios de CaBsCrypto:**

🎮 **Game Night** - Streams de gaming con análisis crypto
📹 **Videos** - Contenido educativo sobre crypto
📡 **Streams** - Trading en vivo y análisis técnico
📱 **Shorts** - Contenido viral para TikTok/Instagram
📅 **Packs Mensuales** - Contenido premium crypto
👥 **Eventos IRL** - Conferencias y meetups
🎯 **Consultoría** - Estrategia crypto personalizada

🚀 **¿Listo para colaborar?** Usa /start para comenzar.`;
        
        bot.sendMessage(chatId, infoMessage, { parse_mode: 'Markdown' });
    } else if (state === STATES.PROJECT_TYPE) {
        userData.set(chatId, { ...userData.get(chatId), projectType: data });
        askForBudget(chatId);
    } else if (state === STATES.BUDGET) {
        userData.set(chatId, { ...userData.get(chatId), budget: data });
        askForTimeline(chatId);
    } else if (state === STATES.TIMELINE) {
        userData.set(chatId, { ...userData.get(chatId), timeline: data });
        askForExperience(chatId);
    } else if (state === STATES.EXPERIENCE) {
        userData.set(chatId, { ...userData.get(chatId), experience: data });
        askForContactPreference(chatId);
    } else if (state === STATES.CONTACT_PREFERENCE) {
        userData.set(chatId, { ...userData.get(chatId), contactPreference: data });
        completeOnboarding(chatId);
    } else if (data === 'connect') {
        const connectMessage = `🤝 **Conectando con CaBsCrypto...**

📞 **Contacto directo:**
• Telegram: @CaBsCrypto
• Email: cabscryptocontacto@gmail.com

💬 **Mensaje sugerido:**
"Hola CaBsCrypto! Completé el onboarding en tu bot y estoy interesado en [tipo de proyecto]. Mi presupuesto es [rango] y necesito el proyecto para [timeline]."

🚀 **¡Gracias por tu interés en colaborar!**`;
        
        bot.sendMessage(chatId, connectMessage, { parse_mode: 'Markdown' });
    } else if (data === 'socials') {
        const socialsMessage = `📱 **Redes Sociales de CaBsCrypto:**

📸 **Instagram:** @cabscrypto
🎥 **YouTube:** @cabscrypto
🎵 **TikTok:** @cabs.tv
🐦 **Twitter:** @CaBsCrypto
💬 **Telegram:** @CaBsCrypto

🌐 **Website:** [Tu landing page]`;
        
        bot.sendMessage(chatId, socialsMessage, { parse_mode: 'Markdown' });
    } else if (data === 'portfolio') {
        const portfolioMessage = `🎬 **Portfolio de CaBsCrypto:**

📹 **Videos Destacados:**
• Análisis de Mercado Crypto
• Estrategias de Trading
• Colaboración con Base LATAM

📊 **Estadísticas:**
• 125K+ visualizaciones en Twitter
• 45K+ seguidores en TikTok
• 12.5K+ seguidores en Instagram

🎯 **¿Listo para crear contenido similar?**`;
        
        bot.sendMessage(chatId, portfolioMessage, { parse_mode: 'Markdown' });
    }
});

// Manejar errores
bot.on('error', (error) => {
    console.error('Error del bot:', error);
});

bot.on('polling_error', (error) => {
    console.error('Error de polling:', error);
});

console.log('🤖 Bot de Telegram CaBsCrypto iniciado...');
console.log('📱 Esperando mensajes...');

// Exportar para uso en otros archivos
module.exports = { bot, userStates, userData };
