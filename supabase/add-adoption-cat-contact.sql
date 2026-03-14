-- Add contact number to all adoption cats for WhatsApp testing
UPDATE public.adoption_cats
SET contact = '601111458752'
WHERE contact IS NULL OR contact = '';

-- Verify the update
SELECT id, name, contact FROM public.adoption_cats;
