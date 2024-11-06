import telebot
from telebot.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

# Замените 'YOUR_BOT_TOKEN' на токен вашего бота
bot = telebot.TeleBot('7893142914:AAGVG_G24saUopIeaqgHIWn8X_odDzyHSQU')

@bot.message_handler(commands=['start'])
def send_welcome(message):
    markup = ReplyKeyboardMarkup(row_width=1, resize_keyboard=True)
    # Используем WebAppInfo вместо словаря
    web_app_button = KeyboardButton(text="Открыть сайт", web_app=WebAppInfo(url='https://hurmagames.github.io/freedogs/'))
    markup.add(web_app_button)
    bot.send_message(message.chat.id, "Нажмите на кнопку ниже, чтобы открыть сайт.", reply_markup=markup)

bot.polling()
