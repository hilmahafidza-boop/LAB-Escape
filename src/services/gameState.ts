import { Room, Item, GameRandomSeeds, BestRecord, RoomId } from '../types';

// Helper to pick random digits/elements
function getRandomDigit(exclude: string[] = []): string {
  let digit = Math.floor(Math.random() * 10).toString();
  while (exclude.includes(digit)) {
    digit = Math.floor(Math.random() * 10).toString();
  }
  return digit;
}

// Generate randomized puzzle configuration on every new game
export function generateRandomSeeds(): GameRandomSeeds {
  const d1 = getRandomDigit();
  const d2 = getRandomDigit([d1]);
  const d3 = getRandomDigit([d1, d2]);
  const d4 = getRandomDigit([d1, d2, d3]);
  const exitCode = `${d1}${d2}${d3}${d4}`;

  // Locker 3-digit code
  const l1 = Math.floor(1 + Math.random() * 9).toString();
  const l2 = Math.floor(1 + Math.random() * 9).toString();
  const l3 = Math.floor(1 + Math.random() * 9).toString();
  const lockerCode = `${l1}${l2}${l3}`;

  // Wire shuffle (permutations of 0, 1, 2, 3)
  const wireOrder = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

  // Chemical shuffle (reagents order)
  const reagents = ['reagent_blue', 'reagent_red', 'reagent_green', 'reagent_purple'];
  const chemicalOrder = [...reagents].sort(() => Math.random() - 0.5);

  return {
    exitCode,
    cryoPodDigit: d1,
    microscopeDigit: d2,
    whiteboardEquationDigit: d3,
    whiteboardResultDigit: d4,
    lockerCode,
    wireOrder,
    chemicalOrder,
  };
}

// All available game items
export const ALL_ITEMS: Record<string, Item> = {
  screwdriver: {
    id: 'screwdriver',
    name: 'Obeng Teknisi',
    description: 'Alat mekanis dengan mata obeng magnetik berlapis titanium.',
    category: 'tool',
    icon: 'Wrench',
    color: 'text-amber-400',
    details: 'Dapat digunakan untuk membuka penutup ventilasi atau sekrup panel sirkuit.',
  },
  keycard_l1: {
    id: 'keycard_l1',
    name: 'Keycard Level 1 (Biru)',
    description: 'Kartu akses otorisasi untuk pintu pembatas Koridor Laser.',
    category: 'keycard',
    icon: 'CreditCard',
    color: 'text-cyan-400',
    details: 'Tercetak logo XENO-TECH. Memberikan izin masuk ke Sektor Keamanan.',
  },
  laser_prism: {
    id: 'laser_prism',
    name: 'Prisma Pembias Optik',
    description: 'Kristal kuarsa sintetis yang mampu membelokkan berkas laser keamanan.',
    category: 'component',
    icon: 'Sparkles',
    color: 'text-emerald-400',
    details: 'Dapat dipasang pada slot emitor laser untuk mendegradasi frekuensi penghalang.',
  },
  keycard_l2: {
    id: 'keycard_l2',
    name: 'Keycard Level 2 (Kuning)',
    description: 'Kartu otorisasi riset lanjutan untuk Ruang Lab & Reaktor Utama.',
    category: 'keycard',
    icon: 'CreditCard',
    color: 'text-yellow-400',
    details: 'Membuka akses fasilitas inti generator dan laboratorium senyawa.',
  },
  encryption_chip: {
    id: 'encryption_chip',
    name: 'Master Encryption Chip',
    description: 'Mikrocip kuantum berisi kunci bypass protokol karantina darurat.',
    category: 'component',
    icon: 'Cpu',
    color: 'text-purple-400',
    details: 'Diperlukan untuk menstabilkan konsol reaktor dan menyalakan daya pintu keluar.',
  },
  reactor_transponder: {
    id: 'reactor_transponder',
    name: 'Transponder Otorisasi Airlock',
    description: 'Kunci biometrik utama yang mengekstrak kode pembuka pintu keluar utama.',
    category: 'keycard',
    icon: 'KeyRound',
    color: 'text-rose-400',
    details: 'Langkah terakhir sebelum memasukkan 4-digit kode evakuasi darurat.',
  },
};

// Initial rooms setup
export function createInitialRooms(seeds: GameRandomSeeds): Room[] {
  return [
    {
      id: 'cryo_bay',
      name: 'Ruang Karantina & Cryo',
      sectorCode: 'SEKTOR A-01',
      description: 'Ruang isolasi cryogenic tempat Anda terbangun. Udara dingin beruap dan lampu darurat berkedip.',
      isUnlocked: true,
      alertLevel: 'normal',
      ambientColor: 'from-cyan-950/40 to-slate-950',
      objects: [
        {
          id: 'cryo_pod',
          name: 'Tabung Cryo Pod 01',
          description: 'Kapsul pembeku tempat Anda terbangun. Pada kaca beku terdapat torehan angka darurat.',
          icon: 'ShieldAlert',
          status: 'examined',
          actionType: 'examine',
          room: 'cryo_bay',
          position: { x: 20, y: 55 },
          hint: `Pada kaca dingin tergores angka: [ ${seeds.cryoPodDigit} ] diikuti teks: "DIGIT 1 DARI KODE EVAKUASI"`,
        },
        {
          id: 'lab_desk',
          name: 'Meja Riset & Catatan',
          description: 'Meja kerja dengan tablet data dan perkakas teknisi tertinggal.',
          icon: 'ClipboardList',
          status: 'locked',
          actionType: 'take_item',
          containedItemId: 'screwdriver',
          room: 'cryo_bay',
          position: { x: 44, y: 68 },
        },
        {
          id: 'vent_grate',
          name: 'Penutup Ventilasi Dinding',
          description: 'Kisi ventilasi udara yang terkunci rapat dengan 4 baut silang.',
          icon: 'Layers',
          status: 'requires_item',
          requiredItemId: 'screwdriver',
          actionType: 'take_item',
          containedItemId: 'keycard_l1',
          room: 'cryo_bay',
          position: { x: 68, y: 30 },
        },
        {
          id: 'cryo_terminal',
          name: 'Terminal Status Karantina',
          description: 'Layar monitor monokrom menampilkan status subsistem fasilitas XENO-TECH.',
          icon: 'Monitor',
          status: 'unlocked',
          actionType: 'examine',
          room: 'cryo_bay',
          position: { x: 84, y: 62 },
        },
      ],
    },
    {
      id: 'security_corridor',
      name: 'Koridor Keamanan Laser',
      sectorCode: 'SEKTOR B-04',
      description: 'Lorong utama yang dipasangi sistem pertahanan kisi laser bertegangan tinggi.',
      isUnlocked: false,
      requiredKeycardId: 'keycard_l1',
      alertLevel: 'danger',
      ambientColor: 'from-red-950/40 to-slate-950',
      objects: [
        {
          id: 'laser_barrier',
          name: 'Penghalang Laser Merah',
          description: 'Kisi berkas laser inframerah termal aktif. Mencoba melintasinya akan memicu alarm!',
          icon: 'Zap',
          status: 'danger',
          actionType: 'laser_panel',
          room: 'security_corridor',
          position: { x: 50, y: 50 },
        },
        {
          id: 'fuse_box',
          name: 'Panel Sirkuit Sekering',
          description: 'Kotak distribusi kabel warna-warni yang mengendalikan frekuensi generator laser.',
          icon: 'SlidersHorizontal',
          status: 'locked',
          actionType: 'wire_puzzle',
          room: 'security_corridor',
          position: { x: 20, y: 42 },
        },
        {
          id: 'security_locker',
          name: 'Loker Personel Keamanan',
          description: 'Loker baja terenkripsi tombol kombinasi 3-digit.',
          icon: 'Lock',
          status: 'locked',
          actionType: 'keypad',
          containedItemId: 'laser_prism',
          room: 'security_corridor',
          position: { x: 80, y: 58 },
          hint: 'Memerlukan kode 3-digit petugas jaga.',
        },
      ],
    },
    {
      id: 'research_lab',
      name: 'Lab Riset Biokimia',
      sectorCode: 'SEKTOR C-12',
      description: 'Pusat sintesis senyawa dan analisis data spesimen mikrobiologi rahasia.',
      isUnlocked: false,
      requiredKeycardId: 'keycard_l1',
      alertLevel: 'caution',
      ambientColor: 'from-emerald-950/40 to-slate-950',
      objects: [
        {
          id: 'microscope_scanner',
          name: 'Mikroskop Elektron Kuantum',
          description: 'Instrumen pembesar spesimen biologis berdaya tinggi.',
          icon: 'Scan',
          status: 'unlocked',
          actionType: 'examine',
          room: 'research_lab',
          position: { x: 26, y: 64 },
          hint: `Pada slide preparat terukir mikro-pola: [ ${seeds.microscopeDigit} ] - "DIGIT 2 DARI KODE EVAKUASI"`,
        },
        {
          id: 'chemical_rack',
          name: 'Rak Sintesis Senyawa',
          description: 'Meja pencampuran tabung reaksi kimia untuk melarutkan wadah brankas korosif.',
          icon: 'FlaskConical',
          status: 'locked',
          actionType: 'chemical_puzzle',
          containedItemId: 'keycard_l2',
          room: 'research_lab',
          position: { x: 55, y: 52 },
        },
        {
          id: 'research_whiteboard',
          name: 'Papan Tulis Persamaan Kimia',
          description: 'Papan diagram coretan peneliti yang mengandung formula pemecah sandi.',
          icon: 'FileSpreadsheet',
          status: 'unlocked',
          actionType: 'examine',
          room: 'research_lab',
          position: { x: 82, y: 40 },
          hint: `Catatan Peneliti: "Loker keamanan Koridor disetel ke ID Pos: ${seeds.lockerCode}." Juga persamaan: [ X = ${seeds.whiteboardEquationDigit} ] (Digit 3) dan [ Y = ${seeds.whiteboardResultDigit} ] (Digit 4).`,
        },
      ],
    },
    {
      id: 'reactor_core',
      name: 'Generator Inti Reaktor',
      sectorCode: 'SEKTOR D-09',
      description: 'Pusat daya fasilitas yang berdenyut dengan medan energi fusi kuantum.',
      isUnlocked: false,
      requiredKeycardId: 'keycard_l2',
      alertLevel: 'danger',
      ambientColor: 'from-purple-950/40 to-slate-950',
      objects: [
        {
          id: 'reactor_terminal',
          name: 'Konsol Stabilisator Daya',
          description: 'Terminal utama pendingin dan pengatur daya pintu evakuasi.',
          icon: 'Activity',
          status: 'requires_item',
          requiredItemId: 'encryption_chip',
          actionType: 'take_item',
          containedItemId: 'reactor_transponder',
          room: 'reactor_core',
          position: { x: 50, y: 45 },
        },
        {
          id: 'containment_safe',
          name: 'Brankas Penahan Cryo',
          description: 'Kotak brankas bertekanan tempat penyimpanan Master Encryption Chip.',
          icon: 'Box',
          status: 'requires_item',
          requiredItemId: 'keycard_l2',
          actionType: 'take_item',
          containedItemId: 'encryption_chip',
          room: 'reactor_core',
          position: { x: 24, y: 65 },
        },
        {
          id: 'coolant_valves',
          name: 'Manifold Katup Nitrogen',
          description: 'Pengukur tekanan pendingin reaktor yang mendinginkan sirkuit darurat.',
          icon: 'Gauge',
          status: 'unlocked',
          actionType: 'examine',
          room: 'reactor_core',
          position: { x: 80, y: 60 },
        },
      ],
    },
    {
      id: 'exit_airlock',
      name: 'Pintu Keluar Utama (Airlock)',
      sectorCode: 'SEKTOR X-99',
      description: 'Gerbang evakuasi lapis baja tebal menuju permukaan dan kebebasan.',
      isUnlocked: false,
      requiredKeycardId: 'keycard_l2',
      alertLevel: 'caution',
      ambientColor: 'from-amber-950/40 to-slate-950',
      objects: [
        {
          id: 'exit_blast_door',
          name: 'Pintu Kedap Udara Evakuasi',
          description: 'Pintu baja tebal dengan sistem kunci ganda: Transponder Otorisasi dan Keypad Kode 4-Digit.',
          icon: 'DoorClosed',
          status: 'locked',
          actionType: 'airlock_door',
          room: 'exit_airlock',
          position: { x: 50, y: 48 },
        },
        {
          id: 'decontamination_shower',
          name: 'Bilik Dekontaminasi',
          description: 'Semprotan udara bertekanan untuk membersihkan partikel kimia sebelum keluar.',
          icon: 'ShowerHead',
          status: 'unlocked',
          actionType: 'examine',
          room: 'exit_airlock',
          position: { x: 18, y: 55 },
        },
        {
          id: 'evacuation_display',
          name: 'Layar Telemetri Evakuasi',
          description: 'Panel status protokol darurat yang menunggu otorisasi akhir untuk membuka pintu.',
          icon: 'Tv',
          status: 'unlocked',
          actionType: 'examine',
          room: 'exit_airlock',
          position: { x: 82, y: 48 },
        },
      ],
    },
  ];
}

// LocalStorage helpers for persistent records
const STORAGE_BEST_TIME = 'lab_escape_best_time';
const STORAGE_HISTORY = 'lab_escape_history';

export function getStoredBestTime(): BestRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_BEST_TIME);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveBestTime(record: BestRecord): boolean {
  try {
    const current = getStoredBestTime();
    let isNewBest = false;
    if (!current || record.timeElapsedSeconds < current.timeElapsedSeconds) {
      localStorage.setItem(STORAGE_BEST_TIME, JSON.stringify(record));
      isNewBest = true;
    }

    // Save history
    const historyRaw = localStorage.getItem(STORAGE_HISTORY);
    const history: BestRecord[] = historyRaw ? JSON.parse(historyRaw) : [];
    history.unshift(record);
    localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history.slice(0, 10)));

    return isNewBest;
  } catch {
    return false;
  }
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
