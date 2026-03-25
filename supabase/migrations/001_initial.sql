-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL UNIQUE,
  product_id TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  email TEXT,
  result_type TEXT,
  access_token TEXT NOT NULL UNIQUE,
  wayforpay_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  paid_at TIMESTAMPTZ
);

-- Test results table
CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  result_type TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  type TEXT NOT NULL,
  tag TEXT,
  content_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed products
INSERT INTO products (id, name, description, price, type, tag, active) VALUES
  ('sleep_reason', 'Причина вашого безсоння', 'Повна розшифровка вашого типу безсоння: що відбувається у вашому мозку та тілі, і конкретний план дій на 7 днів.', 29, 'text', 'Базовий', true),
  ('night_support_fall_asleep', 'Нічна підтримка: засинання', 'Аудіо-сесія 20 хвилин, що поступово переводить нервову систему в режим сну. Спеціально для тих, хто не може заснути.', 49, 'audio', 'Аудіо', true),
  ('night_support_woke_up', 'Нічна підтримка: прокинувся', 'Аудіо-сесія для повернення до сну після нічного пробудження. Не дає мозку «запустити» тривогу.', 49, 'audio', 'Аудіо', true),
  ('night_support_before_sleep', 'Нічна підтримка: передсонна тривога', 'Аудіо-сесія для розрядки тривоги за 30 хвилин до сну. Переводить нервову систему з режиму «загроза» в режим «безпека».', 49, 'audio', 'Аудіо', true),
  ('sleep_return_protocol', 'Протокол повернення сну', '14-денний структурований план нормалізації сну без медикаментів. Засновано на методах КПТ-I (когнітивно-поведінкова терапія безсоння).', 49, 'text', 'Протокол', true),
  ('sleep_7_nights_recovery', '7 ночей відновлення', 'Повна програма на 7 ночей: щовечірній ритуал, техніки для вашого типу, ранковий протокол. Все, що потрібно для перезапуску сну.', 149, 'text', 'Програма', true),
  ('course', 'Курс лікаря: сон без таблеток', 'Повний відеокурс від лікаря-сомнолога. 8 модулів, 40+ відеоуроків, практичні техніки, особистий зворотній зв''язок.', 590, 'video', 'Курс', true)
ON CONFLICT (id) DO NOTHING;

-- Row Level Security: orders readable only via service role
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable (anon can read active products)
CREATE POLICY "products_public_read" ON products
  FOR SELECT USING (active = true);

-- Orders and test_results: service role only (no anon access)
CREATE POLICY "orders_service_role_only" ON orders
  FOR ALL USING (false);

CREATE POLICY "test_results_service_role_only" ON test_results
  FOR ALL USING (false);
