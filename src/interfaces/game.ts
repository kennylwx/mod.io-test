export default interface GameObject {
  name: string;
  date_added: number;
  logo: GameLogo;
  stats: GameStats;
}

interface GameStats {
  game_id: number;
  mods_count_total: number;
  mods_downloads_today: number;
  mods_downloads_total: number;
  mods_downloads_daily_average: number;
  mods_subscribers_total: number;
  date_expires: number;
}

interface GameLogo {
  filename: string;
  original: string;
}
