import BotsPreview from './BotsPreview';
import AgentsPreview from './AgentsPreview';
import StatsPreview from './StatsPreview';
import SendPreview from './SendPreview';
import VoicePreview from './VoicePreview';
import PipelinePreview from './PipelinePreview';

// Vista previa de cada plataforma, por id de SUITE_MODULES (y SimplePipeline).
export const MODULE_PREVIEWS = {
  simplebots: BotsPreview,
  simpleagents: AgentsPreview,
  simplestats: StatsPreview,
  simplesend: SendPreview,
  simplevoice: VoicePreview,
  simplepipeline: PipelinePreview, // no es un módulo de SUITE_MODULES, pero usa el mismo hero
};
