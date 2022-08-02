const addTrackId = {
  Sakhir: 'bahrain',
  Imola: 'imola',
  'Algarve International': 'algarve',
  Catalunya: 'catalunya',
  'Monte Carlo': 'monaco',
  Baku: 'baku',
  'Circuit Paul Ricard': 'paul_ricard',
  'Red Bull Ring': 'red_bull_ring',
  Silverstone: 'silverstone',
  Hungaroring: 'hungaroring',
  'Spa-Francorchamps': 'spa',
  Zandvoort: 'zandvoort',
  Monza: 'monza',
  Sochi: 'sochi',
  'Istanbul Park Circuit': 'istanbul_park',
  'Circuit of the Americas': 'americas',
  'Autodromo Hermanos Rodriguez': 'hermanos_rodriguez',
  'Autodromo Jose Carlos Pace': 'interlagos',
  Jeddah: 'jeddah',
  'Yas Marina': 'yas_marina',
}

const addGrandPrixId = {
  'Bahrain Grand Prix': 'bahrain_grand_prix',
  'Imola Grand Prix': 'emilia-romagna_grand_prix',
  'Portuguese Grand Prix': 'portuguese_grand_prix',
  'Spanish Grand Prix': 'spanish_grand_prix',
  'Monaco Grand Prix': 'monaco_grand_prix',
  'Azerbaijan Grand Prix': 'azerbaijan_grand_prix',
  'French Grand Prix': 'french_grand_prix',
  'Styrian Grand Prix': 'styrian_grand_prix',
  'Austrian Grand Prix': 'austrian_grand_prix',
  'British Grand Prix': 'british_grand_prix',
  'Hungarian Grand Prix': 'hungarian_grand_prix',
  'Belgian Grand Prix': 'belgian_grand_prix',
  'Dutch Grand Prix': 'dutch_grand_prix',
  'Italian Grand Prix': 'italian_grand_prix',
  'Russian Grand Prix': 'russian_grand_prix',
  'Turkish Grand Prix': 'turkish_grand_prix',
  'United States Grand Prix': 'united_states_grand_prix',
  'Mexican Grand Prix': 'mexican_grand_prix',
  'Brazilian Grand Prix': 'brazilian_grand_prix',
  'Grand Prix of Saudi Arabia': 'saudi_arabian_grand_prix',
  'Abu Dhabi Grand Prix': 'abu_dhabi_grand_prix',
}

const changeCountryName = {
  'Great Britain': 'United Kingdom',
  USA: 'United States',
  'Abu Dhabi': 'United Arab Emirates',
}

const notWantedSessions = ['Grid', 'FastestLap']

const newSessionType = {
  'Practice 1': 'practice',
  'Practice 2': 'practice',
  'Practice 3': 'practice',
  'Qualifying 1': 'qualifying',
  'Qualifying 2': 'qualifying',
  'Qualifying 3': 'qualifying',
  Race: 'race',
}

const sessionsToRemove = ['Grid', 'FastestLap', 'Qualifying 2', 'Qualifying 3']

const points = {
  1: 25,
  2: 18,
  3: 15,
  4: 12,
  5: 10,
  6: 8,
  7: 6,
  8: 4,
  9: 2,
  10: 1,
}

const driverNum = {
  max_verstappen: '33',
  lando_norris: '4',
  esteban_ocon: '31',
  daniel_ricciardo: '3',
  kimi_raikkonen: '7',
  lewis_hamilton: '44',
  sergio_perez: '11',
  valtteri_bottas: '77',
  nicholas_latifi: '6',
  george_russell: '63',
  antonio_giovinazzi: '99',
  fernando_alonso: '14',
  lance_stroll: '18',
  sebastian_vettel: '5',
  charles_leclerc: '16',
  carlos_sainz: '55',
  pierre_gasly: '10',
  yuki_tsunoda: '22',
  mick_schumacher: '47',
  nikita_mazepin: '9',
}

const teamColorCode = {
  max_verstappen: 'red_bull',
  lando_norris: 'mclaren',
  esteban_ocon: 'alpine',
  daniel_ricciardo: 'mclaren',
  kimi_raikkonen: 'alfa_romeo',
  lewis_hamilton: 'mercedes',
  sergio_perez: 'red_bull',
  valtteri_bottas: 'mercedes',
  nicholas_latifi: 'williams',
  george_russell: 'williams',
  antonio_giovinazzi: 'alfa_romeo',
  fernando_alonso: 'alpine',
  lance_stroll: 'aston_martin',
  sebastian_vettel: 'aston_martin',
  charles_leclerc: 'ferrari',
  carlos_sainz: 'ferrari',
  pierre_gasly: 'alphatauri',
  yuki_tsunoda: 'alphatauri',
  mick_schumacher: 'haas',
  nikita_mazepin: 'haas',
}

const changeDriverId = {
  262348: 'max_verstappen',
  65527: 'lewis_hamilton',
  278857: 'valtteri_bottas',
  2975914: 'pierre_gasly',
  986827: 'charles_leclerc',
  63379: 'fernando_alonso',
  261679: 'carlos_sainz',
  78274: 'sergio_perez',
  307612: 'esteban_ocon',
  1619431: 'lando_norris',
  175030: 'daniel_ricciardo',
  2262088: 'lance_stroll',
  96004: 'sebastian_vettel',
  1054273: 'antonio_giovinazzi',
  194182: 'kimi_raikkonen',
  1641904: 'nicholas_latifi',
  2293954: 'george_russell',
  2113831: 'mick_schumacher',
  152605: 'yuki_tsunoda',
  841828: 'nikita_mazepin',
}

const changeDriverIdStanding = {
  87445: 'max_verstappen',
  21838: 'lewis_hamilton',
  92948: 'valtteri_bottas',
  991967: 'pierre_gasly',
  328938: 'charles_leclerc',
  21122: 'fernando_alonso',
  87222: 'carlos_sainz',
  26087: 'sergio_perez',
  102533: 'esteban_ocon',
  539806: 'lando_norris',
  58339: 'daniel_ricciardo',
  754025: 'lance_stroll',
  31997: 'sebastian_vettel',
  351420: 'antonio_giovinazzi',
  64723: 'kimi_raikkonen',
  547297: 'nicholas_latifi',
  764647: 'george_russell',
  704606: 'mick_schumacher',
  50864: 'yuki_tsunoda',
  280605: 'nikita_mazepin',
}

const getNationality = {
  Netherlands: 'Dutch',
  Finland: 'Finnish',
  'United Kingdom': 'British',
  Mexico: 'Mexican',
  Monaco: 'Monégasque',
  Australia: 'Australian',
  Spain: 'Spanish',
  Japan: 'Japanese',
  Canada: 'Canadian',
  Italy: 'Italian',
  France: 'French',
  Germany: 'German',
  Russia: 'Russian',
  China: 'Chinese',
  Thailand: 'Thai',
}

const month = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
}

const changeConstructorId = {
  71583: 'alfa_romeo',
  33121: 'red_bull',
  199493: 'alphatauri',
  31205: 'alpine',
  65311: 'aston_martin',
  143585: 'haas',
  56525: 'mclaren',
  58685: 'mercedes',
  183197: 'ferrari',
  163637: 'williams',
}

export {
  addTrackId,
  addGrandPrixId,
  changeCountryName,
  notWantedSessions,
  newSessionType,
  sessionsToRemove,
  points,
  driverNum,
  teamColorCode,
  changeDriverId,
  getNationality,
  month,
  changeConstructorId,
  changeDriverIdStanding,
}
