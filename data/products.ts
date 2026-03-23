import { Product } from '@/types'

export const PRODUCTS: Record<string, Product> = {
  sleep_reason: {
    id: 'sleep_reason',
    name: 'Причина вашого безсоння',
    description: 'Повна розшифровка вашого типу безсоння: що відбувається у вашому мозку та тілі, і конкретний план дій на 7 днів.',
    price: 29,
    type: 'text',
    tag: 'Базовий'
  },
  night_support_fall_asleep: {
    id: 'night_support_fall_asleep',
    name: 'Нічна підтримка: засинання',
    description: 'Аудіо-сесія 20 хвилин, що поступово переводить нервову систему в режим сну. Спеціально для тих, хто не може заснути.',
    price: 49,
    type: 'audio',
    tag: 'Аудіо'
  },
  night_support_woke_up: {
    id: 'night_support_woke_up',
    name: 'Нічна підтримка: прокинувся',
    description: 'Аудіо-сесія для повернення до сну після нічного пробудження. Не дає мозку «запустити» тривогу.',
    price: 49,
    type: 'audio',
    tag: 'Аудіо'
  },
  night_support_before_sleep: {
    id: 'night_support_before_sleep',
    name: 'Нічна підтримка: передсонна тривога',
    description: 'Аудіо-сесія для розрядки тривоги за 30 хвилин до сну. Переводить нервову систему з режиму «загроза» в режим «безпека».',
    price: 49,
    type: 'audio',
    tag: 'Аудіо'
  },
  sleep_return_protocol: {
    id: 'sleep_return_protocol',
    name: 'Протокол повернення сну',
    description: '14-денний структурований план нормалізації сну без медикаментів. Засновано на методах КПТ-I (когнітивно-поведінкова терапія безсоння).',
    price: 49,
    type: 'text',
    tag: 'Протокол'
  },
  sleep_7_nights_recovery: {
    id: 'sleep_7_nights_recovery',
    name: '7 ночей відновлення',
    description: 'Повна програма на 7 ночей: щовечірній ритуал, техніки для вашого типу, ранковий протокол. Все, що потрібно для перезапуску сну.',
    price: 149,
    type: 'text',
    tag: 'Програма'
  },
  course: {
    id: 'course',
    name: 'Курс лікаря: сон без таблеток',
    description: 'Повний відеокурс від лікаря-сомнолога. 8 модулів, 40+ відеоуроків, практичні техніки, особистий зворотній зв\'язок.',
    price: 590,
    type: 'video',
    tag: 'Курс'
  }
}

export const UPSELL_PRODUCTS = [
  PRODUCTS.night_support_fall_asleep,
  PRODUCTS.night_support_woke_up,
  PRODUCTS.night_support_before_sleep,
  PRODUCTS.sleep_return_protocol,
  PRODUCTS.sleep_7_nights_recovery,
  PRODUCTS.course
]
