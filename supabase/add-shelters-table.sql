-- Create shelters table (Admin managed)
CREATE TABLE IF NOT EXISTS public.shelters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  is_open BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.shelters ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public can view shelters" ON public.shelters FOR SELECT USING (true);

-- Allow authenticated users to manage (for admin)
CREATE POLICY "Authenticated can manage shelters" ON public.shelters FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO public.shelters (name, address, is_open) VALUES
  ('SPCA Selangor', 'No. 4, Jalan Kerja Ayer Lama, 68000 Ampang, Selangor', true),
  ('PAWS Subang', 'No. 12, Jalan SS15/4, 47500 Subang Jaya, Selangor', true),
  ('Second Chance', 'Lot 1234, Jalan Sungai Buloh, 47000 Sungai Buloh', true),
  ('Furry Friends', 'No. 8, Jalan PJU 5/1, Kota Damansara, 47810 Petaling Jaya', false);
