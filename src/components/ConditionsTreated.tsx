import type { Category } from '@/components/ui/category-list';
import { CategoryList } from '@/components/ui/category-list';

const conditions: Category[] = [
  {
    id: 1,
    title: 'Arthritis',
    subtitle: 'Holistic therapies and Ayurvedic treatments focused on reducing joint pain, stiffness, inflammation, and improving mobility naturally.',
  },
  {
    id: 2,
    title: 'Degenerative Spine Conditions',
    subtitle: 'Supportive care for back pain, cervical and lumbar issues through strengthening therapies, pain management, and lifestyle guidance.',
  },
  {
    id: 3,
    title: 'Autoimmune Diseases',
    subtitle: 'Personalized Ayurvedic care aimed at improving immunity, reducing inflammation, and supporting long term wellness and balance.',
  },
  {
    id: 4,
    title: 'Allergies',
    subtitle: 'Natural treatment approaches to manage allergic reactions, improve respiratory health, and strengthen body resistance.',
  },
  {
    id: 5,
    title: 'Sinusitis',
    subtitle: 'Therapies designed to relieve sinus congestion, headaches, breathing difficulty, and recurring infections naturally.',
  },
  {
    id: 6,
    title: 'Psoriasis',
    subtitle: 'Internal detoxification and skin healing therapies focused on reducing flare ups, irritation, scaling, and inflammation.',
  },
  {
    id: 7,
    title: 'IBS (Irritable Bowel Syndrome)',
    subtitle: 'Comprehensive digestive care to manage bloating, abdominal discomfort, irregular bowel habits, acidity, and gut sensitivity through diet, lifestyle, and Ayurvedic therapies.',
  },
  {
    id: 8,
    title: 'And More',
    subtitle: 'Ayurvedic care for a wide range of chronic, lifestyle, metabolic, musculoskeletal, skin, respiratory, and stress related health conditions.',
  },
];

export default function ConditionsTreated() {
  return (
    <section id="conditions">
      <CategoryList
        title="Conditions Commonly Treated"
        categories={conditions}

      />
    </section>
  );
}
