// Íconos de trazo (24×24) para la página de SimpleBots. Usan currentColor.
const PATHS = {
  flow: 'M6 4h4v4H6zM14 16h4v4h-4zM8 8v4h8v4M14 4h4v4h-4M16 8v4',
  check: 'M4 12.5l5 5L20 6.5',
  plug: 'M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4',
  spark: 'M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z',
  handoff: 'M8 11a3 3 0 100-6 3 3 0 000 6zM3 20a5 5 0 0110 0M16 8h5M18.5 5.5L21 8l-2.5 2.5',
  smile: 'M12 21a9 9 0 100-18 9 9 0 000 18zM8.5 14a4 4 0 007 0M9 9.5h.01M15 9.5h.01',
  scan: 'M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M8 12h8',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  bot: 'M5 9h14v10H5zM12 5v4M9 13.5h.01M15 13.5h.01M9.5 16.5h5M12 3.5h.01M2.5 13v2M21.5 13v2',
  headset: 'M4 14v-2a8 8 0 0116 0v2M4 14h3v5H5a1 1 0 01-1-1zM20 14h-3v5h2a1 1 0 001-1zM17 19c0 1.5-2 2-5 2',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  inbox: 'M3 13l3-8h12l3 8v6H3zM3 13h5l1 2h6l1-2h5',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6zM9 12l2 2 4-4',
  users: 'M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2.5 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 6.5M18 14a6 6 0 013.5 6',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM20.5 20.5L16 16',
  phone: 'M7 2.5h10a1 1 0 011 1v17a1 1 0 01-1 1H7a1 1 0 01-1-1v-17a1 1 0 011-1zM11 18.5h2',
  bell: 'M6 16V11a6 6 0 0112 0v5l1.5 2h-15zM10 20.5a2 2 0 004 0',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  send: 'M21 3L3 10.5l7 2.5 2.5 7zM21 3l-11 10',
  x: 'M6 6l12 12M18 6L6 18',
  list: 'M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01',
  // Canales
  whatsapp:
    'M4 20l1.3-3.9A8 8 0 1112 20a8 8 0 01-4.1-1.1zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a3.5 3.5 0 01-2-2l1-1-1-2z',
  instagram:
    'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zM12 16a4 4 0 100-8 4 4 0 000 8zM17.5 6.5h.01',
  messenger:
    'M12 3C7 3 3 6.7 3 11.3c0 2.5 1.2 4.7 3 6.2V21l3.2-1.8c.9.3 1.8.4 2.8.4 5 0 9-3.7 9-8.3S17 3 12 3zM7 13.5l3.5-3.5 2.5 2 3.5-3.5',
  sms: 'M4 5h16v11H9l-5 4zM8 10.5h.01M12 10.5h.01M16 10.5h.01',
  webchat: 'M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01M8 14h8',
};

export default function Icon({ name, size = 20, strokeWidth = 1.7, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
