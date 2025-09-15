import InferenceMarketSketch from './makeChart'
import { useLang, type Lang } from "@/components/locale";
import dicts from "./locale";

type VisionChartLocale = { chart: string };

const dictByLang = dicts as Record<Lang, VisionChartLocale>;

export const known = [
  { date: '2021-01-01', value: 60.2e9 },
  { date: '2021-07-01', value: 65.2e9 },
  { date: '2022-01-01', value: 70.6e9 },
  { date: '2022-07-01', value: 76.5e9 },
  { date: '2023-01-01', value: 82.8e9 },
  { date: '2023-07-01', value: 89.7e9 },
  { date: '2024-01-01', value: 97.2e9 },  
  { date: '2024-07-01', value: 105.3e9 },
  { date: '2025-01-01', value: 114.1e9 },
];

export const forecast = [
  { date: '2025-01-01', value: 114.1e9 },
  { date: '2025-07-01', value: 123.6e9 },
  { date: '2026-01-01', value: 133.8e9 },
  { date: '2026-07-01', value: 145.0e9 },
  { date: '2027-01-01', value: 157.1e9 },
  { date: '2027-07-01', value: 170.1e9 },
  { date: '2028-01-01', value: 184.3e9 },
  { date: '2028-07-01', value: 199.7e9 },
  { date: '2029-01-01', value: 216.3e9 },
  { date: '2029-07-01', value: 234.3e9 },
  { date: '2030-01-01', value: 253.8e9 }, 
];

export default function Demo() {
  const lang = useLang();
  const t = dictByLang[lang] ?? dictByLang.en;

  return (
    <InferenceMarketSketch
      known={known}
      forecast={forecast}
      yLabel="$"
      title={t.chart}
      theme={{
        bg: 'transparent',
        axis: '#ffffff',
        knownStroke: '#ffffff',
        knownFill: 'rgba(255, 255, 255, 0.4)',
        forecastStroke: '#f9a729',
        forecastFill: 'rgba(249, 167, 41, 0.4)'
      }}
      width="100%"
      height={460}
      padding={{ top: 36, right: 28, bottom: 56, left: 72 }}
    />
  )
}
