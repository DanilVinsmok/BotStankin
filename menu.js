import schedule from "./schedule.js";
import * as bot from "node-telegram-bot-api";

export const mainMenu = {
    text: 'Меню',
    form: {
        reply_markup:
        {
            keyboard:
            [
                [{ text: 'Полное рассписание' }],
                [{ text: 'Расписание на сегодня' }, { text: 'Расписание на завтра' }],
                [{ text: 'Время до конца пары' }],
                [{ text: ',,,', }]
            ],
            one_time_keyboard: true
        }
    }
}

export const isEvenMenu = {
    text: "/",
    form: {
        reply_markup:
        {
            keyboard:
            [
                [{ text: 'Четная неделя' }, { text: 'Нечетная неделя', request_contact: true }]
            ],
            one_time_keyboard: true
        }
    }
}

export const dayOfWeekMenu = {
    reply_markup: {
        inline_keyboard: Object.keys(schedule.days).map(day => ({ text: day, callback_data: day }))
    }
}

export function openMenu(chatId, menu) {
    bot.sendMessage(chatId, menu.text, menu.form)
}