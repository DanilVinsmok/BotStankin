
const TelegramBotApi = require('node-telegram-bot-api')

const token ='2067710720:AAEMgpYlmDI1DAxOu_EgF-edO8BT4lWw4-0'

const bot = new TelegramBotApi(token,{polling:true})

class Week {
    constructor(options) {
        this.parity = options.parity
        this.days = options.days
    }
}

const evenWeek = new Week({
    partiy: true,
    days: new Map()
})

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
    if (evenWeek.days.get(date.getDay()).timeCouples[i] = !0) {
      if (timeDech[i] - m < 6000000) {
        return (msToTime(timeDech[i] - m))
      }
    }
  }
  return (-1)
}



class Day {
  constructor(options) {
    this.couples = options.couples
    this.timeCouples = options.timeCouples
  }

  getScheduleDay(){
    let couples = ''
    for(let i=0;i<this.couples.length; i++){
      if(this.timeCouples[i] !== 0){
         couples += this.couples[i]
      }
    }
    return(couples)
  }
}

sunday = new Day({
  couples: null,
  timeCouples: null
})

monday = new Day({
  couples: ['Нет пары',
    '2.Математическая логика и теория алгоритмов\nЕписеева Ю.В [10.20-12.00]',
    '\n\n3.ООП на языке высокогог уровня\nРазумовский А.И. [12.20-14.00]',
    '\n\n4.Архитектура ЭВМ и вычислительных систем\nСаркисова И.О. [14.10-15.50]',
    '\n\n5.Компьютерная геометрия и графика\nТапак А.В.[16.00-17.40]'],
  timeCouples: [0, 1, 1, 1, 1]
})

tuesday = new Day({
  couples: ['1.ООП на языке высокогог уровня\nРазумовский А.И. [8.30-10.10]',
    '\n\n2.Политология\nКуткин В.С.[10.20-12.00]',
    '\n\n3.Математическая логика и теория алгоритмов\nЕписеева Ю.В [12.20-14.00]',
    '\n\n4.Иностранный язык\nВоронова М.Н.[14.10-15.50]',
    '\n\n5.Физика\nКиссер А.Э. [16.00-17.40]'],
  timeCouples: [1, 1, 1, 1, 1]
})

wednesday = new Day({
  couples: ['1.Физика\nЛоскутов А.И.[8.30-10.10]',
    '\n\n2.Политология\nКуткин В.С.[10.20-12.00]\n\n',
    '3.Програмирование специальных вычислительных устройств\nВолкова О.Р.[12.20-14.00]',
    '\n\n4.Философия\nГорюнов М.А. [14.10-15.50]',
    '\n\n5.Прикладная физическая культура [16.00-17.40]'],
  timeCouples: [1, 1, 1, 1, 1]
})

thursday = new Day({
  couples: ['Нет пары',
    '2.Архитектура ЭВМ и вычислительных систем\nСаркисова И.О. [10.20-12.00]',
    '\n\n3.ООП на языке высокогог уровня\nРазумовский А.И. [12.20-14.00]',
    '\n\n4.ООП на языке высокогог уровня\nРазумовский А.И. [14.10-15.50]',
    'Нет пары'],
  timeCouples: [0, 1, 1, 1, 0]
})

friday = new Day({
  couples: ['1.Компьютерная геометрия и графика\nТопок А.В. [8.30-10.10]',
    '\n\n2.Компьютерная геометрия и графика\nТопок А.В. [10.20-12.00]',
    '\n\n3.Архитектура ЭВМ и вычислительных систем\nСаркисова И.О. [12.20-14.00]',
    '\n\n4.Архитектура ЭВМ и вычислительных систем\nСаркисова И.О. [14.10-15.50]',
    'Нет пары'],
  timeCouples: [1, 1, 1, 1, 0]
})

saturday = new Day({
  couples: ['1.Програмирование специальных вычислительных устройств\nВолкова О.Р.[8.30-10.10]',
    '\n\n2.Философия\nГорюнов М.А. [10.20-12.00]',
    '\n\n3.Философия\nГорюнов М.А. [12.20-14.00]'],
    timeCouples: [1, 1, 1, 0, 0]
})


evenWeek.days.set(0, sunday)
evenWeek.days.set(1, monday)
evenWeek.days.set(2, tuesday)
evenWeek.days.set(3, wednesday)
evenWeek.days.set(4, thursday)
evenWeek.days.set(5, friday)
evenWeek.days.set(6 , saturday)
  
function openKlavaMenu(chatId) {
  bot.sendMessage(chatId, 'Меню', {
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
  })
}


function openKlavaIsEven(chatId) {
  bot.sendMessage(chatId, '/', {
    reply_markup:
    {
      keyboard:
        [
          [{ text: 'Четная неделя' }, { text: 'Нечетная неделя', request_contact: true }]
        ],
      one_time_keyboard: true
    }
  })
}

const buttonsWeek = {
  reply_markup: JSON.stringify({
    inline_keyboard:
      [
        [{ text: 'Воскресенье', callback_data: '0' }],
        [{ text: 'Понидельник', callback_data: '1' }],
        [{ text: 'Вторник', callback_data: '2' }],
        [{ text: 'Среда', callback_data: '3' }],
        [{ text: 'Четверг', callback_data: '4' }],
        [{ text: 'Пятница', callback_data: '5' }],
        [{ text: 'Суббота', callback_data: '6' }],
      ]
  })
}

bot.on('callback_query', msg =>{
  const num = msg.data
  const chatId=msg.message.chat.id
  return bot.sendMessage(chatId,`${evenWeek.days.get(+num).getScheduleDay()}`)
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
           bot.sendMessage(chatId,`Выбери день`,buttonsWeek)
          return openKlavaMenu(chatId)
      }

      if(text === 'Расписание на сегодня'){ 
          const date =new Date(msg.date*1000)
          const today=evenWeek.days.get(date.getDay())
          return bot.sendMessage(chatId,`${today.getScheduleDay()}`)
     }

     if(text === 'Расписание на завтра'){ 
         const date =new Date(msg.date*1000)
         const tomorrow=evenWeek.days.get(date.getDay()+1)
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



