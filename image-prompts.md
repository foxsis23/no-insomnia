# Промпты на картинки — безсоння.net

Приём взят с `/Users/apple/trivoga.net`, но палитра — НАША: indigo + slate.
У тревоги янтарь на #0d0d1a. У нас indigo на slate-950.

## Палитра (точные значения из проекта)

| Роль | Tailwind | HEX |
|---|---|---|
| Фон картинки/секции | slate-950 | `#020617` |
| Ядро свечения | indigo-200 | `#c7d2fe` |
| Тело линии | indigo-400 | `#818cf8` |
| Ореол | indigo-500 | `#6366f1` |
| Дальний ореол | indigo-600 | `#4f46e5` |

Свечение строится тремя слоями: почти белое холодное ядро → indigo-400 тело →
размытый indigo-500/600 ореол. Без ядра неон выглядит грязным.

---

## СИСТЕМА СТИЛЯ

### Тип A — «неоновый символ» (90% картинок)

```
Ultra-minimal glowing neon line art on a deep slate-black background (#020617).
A single continuous light stroke with a near-white cool core (#c7d2fe), an indigo
body (#818cf8) and a soft radiant indigo halo (#6366f1 fading to #4f46e5).
Fine film grain over the whole frame, deep vignette at the corners.
Cool moonlight palette, no warm tones anywhere. Nothing else in the frame —
no objects, no text, no letters, no logos, no watermarks.
Cinematic, quiet, expensive-looking. Slow flowing motion, soft falloff, calm.
Square 1:1 composition, subject centered.
```

**Критично:** фон строго `#020617` — точно как фон секции. Тогда края картинки
не видны и свечение выглядит встроенным в страницу. Это главный секрет приёма.

**Отличие от тревоги:** там линия рвётся и разлетается осколками — язык паники.
У нас линия **течёт**: плавная, ниже контраст, свечение мягче. Другая палитра
плюс другая динамика — сайты не спутаешь.

### Тип B — «кинокадр» (только Hero)

```
Photorealistic cinematic still, night interior, shot on 35mm, shallow depth of field.
Cold blue-indigo moonlight as the dominant light source, deep slate-black shadows.
Desaturated cool color grade, no warm tones. Natural film grain. A person is
small in the frame, positioned to the RIGHT, the entire LEFT HALF is empty dark
space for text overlay. No text, no logos. 16:9.
```

---

## 1. HERO — 1672×941

```
Photorealistic cinematic still: a person lying awake in bed at night, eyes open,
staring at the ceiling, blanket pulled up, head on pillow, seen from the side.
Cold indigo moonlight falls through the window across the bed. A phone face-down
on the nightstand. Calm exhaustion, not despair. Subject on the RIGHT side of
frame, entire LEFT HALF empty dark space for text. [+ Тип B]
```
→ `components/landing/Hero.tsx`

Альтернатива, если нужно сильнее в боль: человек сидит на краю кровати в 3 ночи,
холодный свет телефона снизу освещает лицо.

---

## 2. ПЯТЬ ТИПОВ БЕССОННИЦЫ — 1254×1254

**Генерить одной серией, за один заход, одной моделью.**

**2.1 Напружений тип** → `sleep-tense.webp`
```
A single indigo neon line that should descend into rest but instead coils into a dense
glowing tangle in the center, still burning, refusing to settle. The line enters
smooth from the left, knots in the middle, never exits. [+ Тип A]
```

**2.2 Нічні пробудження** → `sleep-waking.webp`
```
A long horizontal indigo neon line running edge to edge, broken by three sharp vertical
spikes that jump upward at irregular intervals, then return to the flat line each time.
[+ Тип A]
```

**2.3 Раннє прокидання** → `sleep-early.webp`
```
An indigo neon line descending gently into a deep valley, then cut short — rising
abruptly back to the top far too early, ending in a small bright glowing point.
Asymmetric: the valley is too short. [+ Тип A]
```

**2.4 Переривчастий сон** → `sleep-fragmented.webp`
```
An indigo neon wave oscillating only near the top of the frame in shallow ripples,
never reaching the deep bottom. Below it, a faint dark empty space where the deep
wave should have been. [+ Тип A]
```

**2.5 Передсонна тривога** → `sleep-anxiety.webp`
```
A minimal indigo neon outline of a bed seen from above, with three concentric pulsing
rings radiating outward from it like a silent alarm. The bed itself is the source
of the signal. [+ Тип A]
```

---

## 3. НОЧНАЯ ПОДДЕРЖКА — 600×600

**3.1 Заснути** → `audio-fall.webp`
```
An indigo neon spiral slowly unwinding downward and fading into darkness at the
bottom. Descending, releasing. [+ Тип A]
```

**3.2 Прокинувся вночі** → `audio-woke.webp`
```
A single small indigo glowing point in the center of a vast dark empty field,
with a very soft cool halo. Solitary but not lonely — a companion light. [+ Тип A]
```

**3.3 Перед сном** → `audio-before.webp`
```
An indigo neon line, tightly wound on the left, gradually unwinding into a long
smooth flowing curve toward the right. Tension releasing into calm. [+ Тип A]
```

---

## 4. ПРОДУКТЫ — 1254×1254

**4.1 Протокол повернення сну** → `prod-protocol.webp`
```
An indigo neon line entering chaotic and jagged from the left, gradually smoothing
into a perfect calm flowing wave by the right edge. Order emerging from disorder.
[+ Тип A]
```

**4.2 7 ночей відновлення** → `prod-7nights.webp`
```
Seven indigo neon wave arcs in a row, each one deeper and smoother than the last,
the final one glowing brightest. A progression across seven steps. [+ Тип A]
```

**4.3 Курс** → `prod-course.webp`
```
An indigo neon line rising in smooth rounded steps from bottom-left toward the
top-right, ending in a bright cool glowing point of light. [+ Тип A]
```

---

## 5. OG-IMAGE — строго 1200×630

```
Wide banner, deep slate-black (#020617). A single indigo neon line flowing
smoothly from the left edge and settling into a calm resting curve in the
left third. The right two-thirds completely empty dark space for text overlay.
Soft cool bloom, film grain. Nothing else. [+ Тип A, 1200x630]
```
Текст накладывать кодом, не генерить.

---

## 6. ИНТЕГРАЦИЯ

Лендинг сейчас светлый (`bg-white`, `bg-slate-50`), картинки тёмные.
На белом фоне неоновый приём развалится — станут видны края.

Тёмными делать **только** секции с картинками:

| Секция | Фон |
|---|---|
| Hero | `bg-slate-950` |
| SleepTypes | `bg-slate-950` |
| NightSupport | `bg-slate-950` |
| FurtherProducts | `bg-slate-950` |
| остальные | оставить светлыми |

Чередование светлых и тёмных секций даёт ритм.

Плюс единой палитры: `bg-indigo-500` на кнопках теперь родной картинкам, а не спорит
с ними. Ничего в UI менять не нужно — только фоны четырёх секций.

### Технически
- `public/images/`, WebP качество 80. У тревоги вес 40–70 КБ — держим тот же.
- `next/image` с `sizes`; Hero — `priority`, остальное лениво.
- `alt` украинским по смыслу картинки, не «зображення».
- Иконки lucide в `SleepTypes.tsx` при добавлении картинок убрать — не мешать
  два визуальных языка в одной карточке.
