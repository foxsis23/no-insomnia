import { Question } from '@/types'

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Скільки часу зазвичай займає засинання після того, як ви лягаєте в ліжко?',
    answers: [
      {
        text: 'До 15 хвилин — засинаю швидко',
        weights: { night_waking: 1, early_rising: 1 }
      },
      {
        text: '15–30 хвилин — трохи довго, але терплю',
        weights: { tense_falling_asleep: 1, broken_sleep: 1 }
      },
      {
        text: '30–60 хвилин — лежу, думаю, не можу розслабитись',
        weights: { tense_falling_asleep: 2, anxiety_before_sleep: 2 }
      },
      {
        text: 'Більше години або взагалі не можу заснути',
        weights: { tense_falling_asleep: 3, anxiety_before_sleep: 3 }
      }
    ]
  },
  {
    id: 2,
    text: 'Як часто ви прокидаєтесь серед ночі?',
    answers: [
      {
        text: 'Майже ніколи — сплю без перерв',
        weights: { tense_falling_asleep: 1, anxiety_before_sleep: 1 }
      },
      {
        text: '1–2 рази, але швидко засинаю знову',
        weights: { broken_sleep: 1, night_waking: 1 }
      },
      {
        text: '2–3 рази, важко заснути після',
        weights: { night_waking: 3, broken_sleep: 2 }
      },
      {
        text: 'Багато разів — прокидаюся від будь-якого шуму або думок',
        weights: { night_waking: 4, anxiety_before_sleep: 2 }
      }
    ]
  },
  {
    id: 3,
    text: 'Коли ви прокидаєтесь зранку?',
    answers: [
      {
        text: 'Тоді, коли планував — відчуваю себе відпочилим',
        weights: { tense_falling_asleep: 1 }
      },
      {
        text: 'Трохи раніше будильника, але це нормально',
        weights: { early_rising: 1, broken_sleep: 1 }
      },
      {
        text: 'На 1–2 години раніше й не можу заснути знову',
        weights: { early_rising: 3, anxiety_before_sleep: 2 }
      },
      {
        text: 'Дуже рано (4–5 ранку) і відчуваю тривогу або порожнечу',
        weights: { early_rising: 4, anxiety_before_sleep: 3 }
      }
    ]
  },
  {
    id: 4,
    text: 'Як би ви описали якість свого сну?',
    answers: [
      {
        text: 'Глибокий і відновлювальний',
        weights: {}
      },
      {
        text: 'Поверхневий — постійно на межі сну і пробудження',
        weights: { broken_sleep: 3, night_waking: 2 }
      },
      {
        text: 'Переривчастий — постійно прокидаюся',
        weights: { broken_sleep: 4, night_waking: 3 }
      },
      {
        text: 'Тривожний — дивні сни, відчуття небезпеки уві сні',
        weights: { anxiety_before_sleep: 4, tense_falling_asleep: 2 }
      }
    ]
  },
  {
    id: 5,
    text: 'Що відбувається з вашими думками, коли ви лягаєте спати?',
    answers: [
      {
        text: 'Думки заспокоюються — можу відпустити день',
        weights: { night_waking: 1 }
      },
      {
        text: 'Іноді крутяться думки, але засинаю',
        weights: { tense_falling_asleep: 1, broken_sleep: 1 }
      },
      {
        text: 'Думки не зупиняються — прокручую події, плани, тривоги',
        weights: { anxiety_before_sleep: 3, tense_falling_asleep: 3 }
      },
      {
        text: 'Катастрофізую — найгірші сценарії, страх не виспатися',
        weights: { anxiety_before_sleep: 5, tense_falling_asleep: 3 }
      }
    ]
  },
  {
    id: 6,
    text: 'Як ви почуваєтесь зранку після сну?',
    answers: [
      {
        text: 'Свіжо і з енергією — готовий до дня',
        weights: {}
      },
      {
        text: 'Трохи розбитий, але розкручуюся протягом дня',
        weights: { broken_sleep: 1, night_waking: 1 }
      },
      {
        text: 'Стомлений — відчуваю, що не відпочив взагалі',
        weights: { broken_sleep: 3, early_rising: 2 }
      },
      {
        text: 'Розбитий і роздратований — день починається з негативу',
        weights: { early_rising: 3, anxiety_before_sleep: 2, broken_sleep: 2 }
      }
    ]
  },
  {
    id: 7,
    text: 'Чи турбують вас думки про сон протягом дня?',
    answers: [
      {
        text: 'Ні — сон просто відбувається',
        weights: {}
      },
      {
        text: 'Іноді думаю, чи висплюся сьогодні',
        weights: { anxiety_before_sleep: 1, tense_falling_asleep: 1 }
      },
      {
        text: 'Часто переживаю про нічний сон заздалегідь',
        weights: { anxiety_before_sleep: 3, tense_falling_asleep: 2 }
      },
      {
        text: 'Постійно боюся ліжка — лягти спати = почати хвилюватись',
        weights: { anxiety_before_sleep: 5, tense_falling_asleep: 4 }
      }
    ]
  },
  {
    id: 8,
    text: 'Як стрес і тривога впливають на ваш сон?',
    answers: [
      {
        text: 'Майже не впливають — розслабляюся перед сном',
        weights: { night_waking: 1 }
      },
      {
        text: 'У стресові дні складніше заснути',
        weights: { tense_falling_asleep: 2, anxiety_before_sleep: 1 }
      },
      {
        text: 'Стрес майже завжди рвe мій сон',
        weights: { anxiety_before_sleep: 3, broken_sleep: 2 }
      },
      {
        text: 'Навіть без видимого стресу сон поганий — хронічне напруження',
        weights: { anxiety_before_sleep: 4, tense_falling_asleep: 3, broken_sleep: 2 }
      }
    ]
  },
  {
    id: 9,
    text: 'Скільки годин ви реально спите (не лежите в ліжку)?',
    answers: [
      {
        text: '7–9 годин — все добре',
        weights: {}
      },
      {
        text: '6–7 годин — трохи замало',
        weights: { tense_falling_asleep: 1, early_rising: 1 }
      },
      {
        text: '5–6 годин — відчуваю постійну нестачу сну',
        weights: { broken_sleep: 2, night_waking: 2, early_rising: 2 }
      },
      {
        text: 'Менше 5 годин або зовсім не можу спати кілька ночей',
        weights: { broken_sleep: 3, anxiety_before_sleep: 3, tense_falling_asleep: 3 }
      }
    ]
  },
  {
    id: 10,
    text: 'Як довго у вас тривають проблеми зі сном?',
    answers: [
      {
        text: 'Декілька днів — ситуативно',
        weights: { tense_falling_asleep: 1 }
      },
      {
        text: 'Кілька тижнів',
        weights: { tense_falling_asleep: 1, night_waking: 1, anxiety_before_sleep: 1 }
      },
      {
        text: 'Кілька місяців',
        weights: { broken_sleep: 2, early_rising: 2, anxiety_before_sleep: 2 }
      },
      {
        text: 'Більше року або не пам\'ятаю, коли спав нормально',
        weights: { broken_sleep: 3, night_waking: 3, anxiety_before_sleep: 3 }
      }
    ]
  }
]
