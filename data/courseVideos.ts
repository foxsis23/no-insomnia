// Уроки курсу. id — це Video ID з Bunny Stream (вкладка Videos у бібліотеці),
// довгий рядок виду "a1b2c3d4-1234-5678-90ab-cdef12345678".
// Порядок у масиві = порядок уроків на сторінці.

export interface CourseVideo {
  /** Video ID з Bunny Stream — не віддаємо в браузер, підписуємо на сервері. */
  id: string
  title: string
  poster: string
}

/** Те, що можна показувати всім: назва й кадр-прев'ю. Без ідентифікаторів відео. */
export interface LessonPreview {
  title: string
  poster: string
}

export const COURSE_VIDEOS: CourseVideo[] = [
  { id: 'd0a0bb66-aa7b-4ac6-a63c-901c611e62cd', title: 'Що насправді відбувається, коли ви не спите', poster: '/images/lessons/1.webp' },
  { id: 'e0e2c6bc-1f8c-42fb-b7ab-ab853ab35e98', title: 'Типи безсоння (щоб перестати панікувати)', poster: '/images/lessons/2.webp' },
  { id: '957b8877-6893-4d39-a588-fd98e7b1238b', title: 'Чому таблетки здаються рішенням', poster: '/images/lessons/3.webp' },
  { id: '1b2960e6-666f-4f9c-8b4e-74098c92af39', title: 'Головний механізм безсоння — гіперактивація', poster: '/images/lessons/4.webp' },
  { id: '31f30ba0-283a-46fc-bd05-a097af870c52', title: 'Найбільші помилки, які погіршують сон', poster: '/images/lessons/5.webp' },
  { id: '865a4bad-80cf-46b5-9bad-adc5efb122b2', title: 'Що робити саме вночі (практика)', poster: '/images/lessons/6.webp' },
  { id: '9e4dbe82-8b14-4a59-94bb-66aabed4fffa', title: 'Режим і біологічний годинник', poster: '/images/lessons/7.webp' },
  { id: '5385193d-e601-43c3-b0e1-373e4b068210', title: 'Кофеїн, гаджети, їжа — правда без міфів', poster: '/images/lessons/8.webp' },
  { id: 'd7431582-7fbc-4107-b95b-e224b270d200', title: 'Безсоння: розбір лікаря', poster: '/images/lessons/9.webp' },
  { id: 'cbf4a500-6fd7-405c-b245-8ebc018e6fac', title: 'Коли потрібен лікар', poster: '/images/lessons/10.webp' },
]

/** Продукт, покупка якого відкриває доступ до уроків. */
export const COURSE_PRODUCT_ID = 'course'

/** Вітрина на лендінгу: постери видно всім, відтворення — після оплати. */
export const LESSON_PREVIEWS: LessonPreview[] = COURSE_VIDEOS.map(({ title, poster }) => ({
  title,
  poster,
}))
