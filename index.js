import config from "./config.js"
import TelegramBotApi from 'node-telegram-bot-api'
import * as menu from "./menu.js";
import schedule from './schedule.js'

const token = config.token

const bot = new TelegramBotApi(token,{polling:true})

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function timeToDeath(date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  const m = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 + milliseconds
  const timeDech = [36600000, 43200000, 50400000, 57000000, 63600000]
  for (let i = 0; i < 5; i++) {
    if (days[date.getDay()].timeCouples[i] = !0) {
      if (timeDech[i] - m < 6000000) {
        return (msToTime(timeDech[i] - m))
      }
    }
  }
  return (-1)
}

bot.on('callback_query', msg =>{
  const num = msg.data
  const chatId=msg.message.chat.id
  return bot.sendMessage(chatId,`${evenWeek.days[num].getScheduleDay()}`)
})

const start=() =>{

  bot.setMyCommands([
      {command: '/start',description:'Запустить бота'},
      {command: '/help',description:'Вывести справку'},
      {command: '/menu',description:'Перейти в меню с\n функциями'}
  ])
  bot.on('message', async msg=>{
      const text = msg.text
      const chatId = msg.chat.id
  
     if(text === '/start'){
        return bot.sendMessage(chatId,`Привет, ${msg.from.first_name} ${msg.from.last_name}! Нажмите /menu`)
     }
  
     if(text === '/help'){
          return bot.sendMessage(chatId,`Список команд:\n/start-Начать диалог\n/help-Получить справку`)
      }
  
      if(text === '/menu'){ 
          return openKlavaMenu(chatId)
      }

      if(text === 'Полное рассписание'){ 
          return openKlavaIsEven(chatId)
      }

      if(text === 'Четная неделя'){ 
           bot.sendMessage(chatId,`Выбери день`, buttonsWeek)
          return openKlavaMenu(chatId)
      }

      if(text === 'Расписание на сегодня'){ 
          const date =new Date(msg.date*1000)
          const today=evenWeek.days[date.getDay]
          return bot.sendMessage(chatId,`${today.getScheduleDay()}`)
     }

     if(text === 'Расписание на завтра'){ 
         const date =new Date(msg.date*1000)
         const tomorrow=evenWeek.days[date.getDay+1]
         return bot.sendMessage(chatId,`${tomorrow.getScheduleDay()}`)
     }

     if(text === 'Время до конца пары'){ 
          const date =new Date(msg.date*1000)
          const time=timeToDeath(date)
          if(time>0){
              return bot.sendMessage(chatId,` До конца пары: ${msToTime(time)}`)  
          }
          return bot.sendMessage(chatId,`Cейчас нет пары`) 
      }

      return bot.sendMessage(chatId,`Неизвестная команда`)
  })
}

start()

