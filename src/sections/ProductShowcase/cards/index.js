// Tarjetas animadas de las páginas de producto, por `type` (data/showcases/*.js).
// Las usan el bento (IntroBentoSection) y las filas alternadas (ModulePage/ModuleRowsSection).
import EditorCard from './EditorCard';
import ChannelsCard from './ChannelsCard';
import ResultsCard from './ResultsCard';
import QuoteCard from './QuoteCard';
import InboxCard from './InboxCard';
import HandoffCard from './HandoffCard';
import DashboardCard from './DashboardCard';
import MetricsCard from './MetricsCard';
import AlertCard from './AlertCard';
import CampaignCard from './CampaignCard';
import FallbackCard from './FallbackCard';
import CallCard from './CallCard';
import BiometricsCard from './BiometricsCard';
import FlowCard from './FlowCard';
import EnginesCard from './EnginesCard';
import ChecklistCard from './ChecklistCard';
import CoursesCard from './CoursesCard';
import ImageCard from './ImageCard';

export const CARDS = {
  editor: EditorCard,
  channels: ChannelsCard,
  results: ResultsCard,
  quote: QuoteCard,
  inbox: InboxCard,
  handoff: HandoffCard,
  dashboard: DashboardCard,
  metrics: MetricsCard,
  alert: AlertCard,
  campaign: CampaignCard,
  fallback: FallbackCard,
  call: CallCard,
  biometrics: BiometricsCard,
  flow: FlowCard,
  engines: EnginesCard,
  checklist: ChecklistCard,
  courses: CoursesCard,
  image: ImageCard,
};
