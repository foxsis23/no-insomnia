import BuyInTelegram from '@/components/shared/BuyInTelegram'

interface Props {
  price: number
}

export default function CoursePurchase({ price }: Props) {
  return (
    <div className="max-w-md mx-auto bg-white/5 rounded-2xl border border-white/10 p-8">
      <h3 className="font-bold text-white text-xl mb-2 text-center">Отримати курс</h3>
      <p className="text-slate-400 text-sm text-center mb-6">
        Довічний доступ до всіх уроків.
      </p>
      <BuyInTelegram productId="course" price={price} label={`Придбати курс — ${price} грн`} />
    </div>
  )
}
