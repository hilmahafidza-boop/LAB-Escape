export type RoomId = 'cryo_bay' | 'security_corridor' | 'research_lab' | 'reactor_core' | 'exit_airlock';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: 'keycard' | 'tool' | 'component' | 'document';
  icon: string; // lucide icon identifier
  color: string;
  details?: string;
}

export interface InteractiveObject {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'examined' | 'requires_item' | 'solved' | 'danger';
  requiredItemId?: string;
  hint?: string;
  actionType: 'examine' | 'keypad' | 'wire_puzzle' | 'chemical_puzzle' | 'laser_panel' | 'take_item' | 'airlock_door';
  containedItemId?: string;
  room: RoomId;
  position: { x: number; y: number }; // percentage 0-100 on room canvas
}

export interface Room {
  id: RoomId;
  name: string;
  sectorCode: string;
  description: string;
  isUnlocked: boolean;
  requiredKeycardId?: string;
  alertLevel: 'normal' | 'caution' | 'danger';
  ambientColor: string; // Tailwind tint
  objects: InteractiveObject[];
}

export interface WirePuzzleConfig {
  sourceWires: { color: string; label: string; index: number }[];
  targetSockets: { color: string; label: string; index: number }[];
  correctConnections: Record<number, number>; // sourceIndex -> targetIndex
}

export interface ChemicalPuzzleConfig {
  reagents: { id: string; name: string; color: string; formula: string }[];
  targetSequence: string[]; // sequence of reagent IDs
}

export interface GameRandomSeeds {
  exitCode: string; // e.g. "8419"
  cryoPodDigit: string; // digit 1
  microscopeDigit: string; // digit 2
  whiteboardEquationDigit: string; // digit 3
  whiteboardResultDigit: string; // digit 4
  lockerCode: string; // 3-digit code for security locker
  wireOrder: number[]; // randomized connection permutation
  chemicalOrder: string[]; // randomized chemical sequence
}

export type GameStatus = 'menu' | 'playing' | 'paused' | 'game_over' | 'victory';

export interface GameLog {
  id: string;
  timestamp: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'danger';
}

export interface BestRecord {
  timeRemainingSeconds: number;
  timeElapsedSeconds: number;
  date: string;
  formattedTime: string;
}
