'use strict';

// ── DEBUG INSTRUMENTATION (remove when bug is found) ──────────────────────
window.addEventListener('error', e => {
  console.error('[DEBUG] Uncaught error:', e.message, '\n  at', e.filename, 'line', e.lineno, '\n', e.error);
});
window.addEventListener('unhandledrejection', e => {
  console.error('[DEBUG] Unhandled promise rejection:', e.reason);
});
// ──────────────────────────────────────────────────────────────────────────

// ════════════════════════════════════════════════
//  LOCALISATION (i18n)
// ════════════════════════════════════════════════
const LOCALES = {
  en: {
    // Group overlay
    'lbl.university': 'University',
    'lbl.group': 'Group',
    'btn.start': 'Start →',
    // Header
    'btn.changeGroup': '⇄ Group',
    'title.changeGroup': 'Switch university / group',
    'btn.prev': '◀ Prev',
    'btn.next': 'Next ▶',
    'btn.light': '☀ Light',
    'btn.dark':  '🌙 Dark',
    'btn.lang':  'FR',
    // Toggle bar
    'show': 'Show:',
    'layer.tracks':   'Tracks',
    'layer.emcal':    'EM cal',
    'layer.hadcal':   'HAD cal',
    'layer.clusters': 'Clusters',
    'layer.muons':    'Muon sys.',
    // Selection panel
    'sel.instructions': 'Use the Discovery panel → click tracks & clusters to identify particles',
    'btn.record': '⊕ Record',
    'btn.clear':  'Clear',
    // Measurements panel
    'meas.none':       'No measurements yet',
    'meas.count':      '{n} measurement(s)',
    'btn.export':      '⬇ Export .txt',
    'btn.clearAll':    '✕ Clear all',
    'btn.reset':       '↺ Reset',
    'title.reset':     'Clear saved progress and return to group selector',
    // Discovery panel
    'disc.title':      'Discovery',
    'disc.subtitle':   'click rows to select',
    'disc.tracks':     'Tracks',
    'disc.clusters':   'Calorimeter Clusters',
    // Cuts panel
    'cuts.title':      'Track Quality Cuts',
    'cuts.desc':       'd₀/z₀ in cm (2.5 mm = 0.25 cm). TRT unavailable for |η| > 2.0.',
    'cuts.reset':      '↺ Reset to defaults',
    // View labels
    'view.rp': 'Transverse (r-φ)',
    'view.lz': 'Longitudinal (ρ-z)',
    // Detector cards
    'card.innerDet': 'Inner Det.',
    'card.muonSys':  'Muon Sys.',
    'card.tracks':   'Tracks',
    'card.segs':     'Segs',
    // Dynamic: selection hints
    'hint.classify':       'Click the e/μ or γ button above to classify',
    'hint.classifyFirst':  'Classify remaining item(s) above first',
    'hint.oneMorePhoton':  'Select one more γ',
    'hint.moreParticles':  'Select more particles',
    'hint.selectToCompute':'Select particles to compute a mass',
    'hint.oneMore':        'Select one more…',
    // Dynamic: buttons
    'btn.alreadyRecorded': '✗ Already recorded',
    'btn.recorded':        '✓ Recorded',
    // Dynamic: confirms
    'confirm.unrecorded':  'You have an unrecorded measurement. Leave this event without recording?',
    'confirm.clearAll':    'Clear all {n} recorded measurement(s)?',
    'confirm.reset':       'Clear all saved progress and return to the group selector?',
    // Errors
    'err.loadEvents': 'Error loading events',
    // Loading
    'loading': 'Loading…',
  },
  fr: {
    // Group overlay
    'lbl.university': 'Université',
    'lbl.group': 'Groupe',
    'btn.start': 'Démarrer →',
    // Header
    'btn.changeGroup': '⇄ Groupe',
    'title.changeGroup': 'Changer d\'université / groupe',
    'btn.prev': '◀ Préc.',
    'btn.next': 'Suiv. ▶',
    'btn.light': '☀ Clair',
    'btn.dark':  '🌙 Sombre',
    'btn.lang':  'EN',
    // Toggle bar
    'show': 'Afficher :',
    'layer.tracks':   'Traces',
    'layer.emcal':    'Cal. EM',
    'layer.hadcal':   'Cal. HAD',
    'layer.clusters': 'Amas',
    'layer.muons':    'Syst. muons',
    // Selection panel
    'sel.instructions': 'Panneau Découverte → cliquez sur les traces et amas pour identifier les particules',
    'btn.record': '⊕ Enregistrer',
    'btn.clear':  'Effacer',
    // Measurements panel
    'meas.none':       'Aucune mesure',
    'meas.count':      '{n} mesure(s)',
    'btn.export':      '⬇ Exporter .txt',
    'btn.clearAll':    '✕ Tout effacer',
    'btn.reset':       '↺ Réinitialiser',
    'title.reset':     'Effacer la progression et revenir au sélecteur de groupe',
    // Discovery panel
    'disc.title':      'Découverte',
    'disc.subtitle':   'cliquer pour sélectionner',
    'disc.tracks':     'Traces',
    'disc.clusters':   'Amas calorimétriques',
    // Cuts panel
    'cuts.title':      'Coupures sur les traces',
    'cuts.desc':       'd₀/z₀ en cm (2,5 mm = 0,25 cm). TRT indisponible pour |η| > 2,0.',
    'cuts.reset':      '↺ Réinitialiser',
    // View labels
    'view.rp': 'Transverse (r-φ)',
    'view.lz': 'Longitudinal (ρ-z)',
    // Detector cards
    'card.innerDet': 'Dét. interne',
    'card.muonSys':  'Syst. muons',
    'card.tracks':   'Traces',
    'card.segs':     'Seg.',
    // Dynamic: selection hints
    'hint.classify':       'Cliquez sur e/μ ou γ ci-dessus pour classifier',
    'hint.classifyFirst':  'Classifiez d\'abord les éléments restants ci-dessus',
    'hint.oneMorePhoton':  'Sélectionnez un γ de plus',
    'hint.moreParticles':  'Sélectionnez plus de particules',
    'hint.selectToCompute':'Sélectionnez des particules pour calculer une masse',
    'hint.oneMore':        'Sélectionnez une de plus…',
    // Dynamic: buttons
    'btn.alreadyRecorded': '✗ Déjà enregistré',
    'btn.recorded':        '✓ Enregistré',
    // Dynamic: confirms
    'confirm.unrecorded':  'Mesure non enregistrée. Quitter cet événement sans enregistrer ?',
    'confirm.clearAll':    'Effacer {n} mesure(s) enregistrée(s) ?',
    'confirm.reset':       'Effacer toute la progression et revenir au sélecteur de groupe ?',
    // Errors
    'err.loadEvents': 'Erreur lors du chargement des événements',
    // Loading
    'loading': 'Chargement…',
  },
};

/** Default language for a given university key (e.g. 'unige_2026' → 'fr') */
function defaultLangForUni(uni) {
  if (!uni) return 'en';
  if (uni.startsWith('unige')) return 'fr';
  return 'en';
}

/**
 * Apply the university's default locale, but only if the user hasn't
 * already made an explicit choice (i.e. hypatia_lang is not in localStorage).
 */
function applyDefaultLang(uni) {
  try { if (localStorage.getItem('hypatia_lang')) return; } catch(e) {}
  currentLang = defaultLangForUni(uni);
}

let currentLang = (() => {
  try { return localStorage.getItem('hypatia_lang') || 'en'; } catch(e) { return 'en'; }
})();

/** Translate key, optionally interpolating {n} */
function t(key, vars) {
  const dict = LOCALES[currentLang] || LOCALES.en;
  let s = dict[key] ?? LOCALES.en[key] ?? key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(`{${k}}`, v); });
  return s;
}

/** Re-stamp all data-i18n / data-i18n-title elements in the DOM */
function applyLocale() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t(el.getAttribute('data-i18n'));
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const v = t(el.getAttribute('data-i18n-title'));
    if (v) el.title = v;
  });
  // Re-render panels that contain translated dynamic strings
  updateMeasurementBar();
  updateSelectionPanel();
  if (data) updateDiscoveryPanel(data);
}

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem('hypatia_lang', lang); } catch(e) {}
  applyLocale();
}

// ════════════════════════════════════════════════
//  CONFIGURATION
// ════════════════════════════════════════════════
const N_EVENTS = 50;
const PHI_BINS = 128;
const MUON_MASS = 0.10566;  // GeV/c²

// Feature flags — set false to hide feature without removing code
const ENABLE_JETS = false;  // set true to re-enable jet display & toggle button

// ATLAS detector geometry (cm) — from AGeometry.xml / AMuonGeometry.xml
const D = {
  beamPipe : 3,
  pixelR   : [5.10, 8.88, 12.27],
  sctR     : [30.13, 37.21, 44.43, 51.47],
  trtInner : 56.73,
  trtOuter : 107.23,
  larPreR  : [142.17, 143.86],
  larInner : 148.18,
  larMid   : 158.0,
  larMid2  : 184.0,
  larOuter : 198.47,
  tilInner : 229.0,
  tilMid1  : 260.0,
  tilMid2  : 344.0,
  tilOuter : 386.0,
  muInner  : 450,
  // Approximate barrel z half-lengths (cm)
  zID      : 345,
  zLAr     : 345,
  zTILE    : 620,
  zMuon    : 730,
  // Endcap calorimeter geometry (cm) — from ATLAS geometry files
  zECLArNear : 368,  zECLArFar : 424,  rECLArIn : 29,   rECLArOut : 203,
  zHECNear   : 435,  zHECFar   : 605,  rHECIn   : 37,   rHECOut   : 203,
  zFCALNear  : 467,  zFCALFar  : 605,  rFCALIn  : 8,    rFCALOut  : 48,
};

// HYPATIA colour scheme
const COL = {
  electron : '#00e676',
  photon   : '#ffd600',
  muon     : '#ff1744',
  jet      : '#ff6d00',
  met      : '#f44336',
  caloEM   : '#ffd600',
  caloHAD  : '#ff9100',
  selected : '#ce93d8',
  selGlow  : 'rgba(206,147,216,0.55)',
};

// ────────────────────────────────────────────────
//  MUON CHAMBER GEOMETRY
// ────────────────────────────────────────────────
// Barrel MDT stations for transverse (r-φ) view
// Each: ri/ro in cm, phis = sector centre degrees, hw = half-width degrees
const MUON_SEGS = [
  { ri:441, ro:469,  phis:[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5], hw:8.5 }, // BIS
  { ri:474, ro:516,  phis:[0,45,90,135,180,225,270,315],                    hw:12  }, // BIL
  { ri:675, ro:754,  phis:[0,45,90,135,180,225,270,315],                    hw:13  }, // BML
  { ri:778, ro:842,  phis:[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5], hw:9   }, // BMS
  { ri:924, ro:989,  phis:[0,45,90,135,180,225,270,315],                    hw:14  }, // BOL
  { ri:1019,ro:1082, phis:[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5], hw:9   }, // BOS
];

// Barrel MDT stations for longitudinal (ρ-z) view
// Each: ri/ro in cm, zSegs = [{zi, zo}] (positive z only; mirrored in code)
const MDT_RZ = [
  { ri:441, ro:469, zSegs:[{zi:1,zo:111},{zi:111,zo:203},{zi:203,zo:295},{zi:295,zo:387},{zi:387,zo:479},{zi:479,zo:571},{zi:571,zo:681}] }, // BIS
  { ri:474, ro:516, zSegs:[{zi:33,zo:125},{zi:125,zo:235},{zi:235,zo:327},{zi:327,zo:455},{zi:455,zo:547},{zi:547,zo:657}] },               // BIL
  { ri:675, ro:754, zSegs:[{zi:15,zo:185},{zi:185,zo:355},{zi:355,zo:525}] },  // BML
  { ri:778, ro:842, zSegs:[{zi:15,zo:185},{zi:185,zo:365},{zi:365,zo:514},{zi:514,zo:692}] }, // BMS
  { ri:924, ro:989, zSegs:[{zi:15,zo:233},{zi:233,zo:453},{zi:453,zo:673}] },   // BOL
  { ri:1019,ro:1082,zSegs:[{zi:1,zo:219},{zi:219,zo:437},{zi:437,zo:657}] },    // BOS
];

// ────────────────────────────────────────────────
//  ENDCAP MUON DISC CHAMBERS (MDT/CSC)
// ────────────────────────────────────────────────
// Each: zi/zo = z extent (cm), ri/ro = radial extent (cm)
// Mirrored to ±z in drawing code.
const ENDCAP_DISC = [
  { name:'CSC-S', zi:708, zo:738, ri: 87, ro:208 },  // CSC small wheel (inner)
  { name:'CSC-L', zi:745, zo:775, ri: 92, ro:207 },  // CSC small wheel (outer)
  { name:'EIS',   zi:708, zo:745, ri:208, ro:447 },  // Endcap Inner Small
  { name:'EIL',   zi:749, zo:786, ri:208, ro:639 },  // Endcap Inner Large
  // Endcap Extra (EE) — fills gap between inner and middle
  { name:'EES',   zi:824, zo:866, ri: 57, ro:298 },
  { name:'EEL',   zi:812, zo:854, ri:298, ro:475 },
  // Endcap Middle (EM)
  { name:'EMS',   zi:952, zo:992, ri: 57, ro:296 },
  { name:'EML',   zi:942, zo:982, ri:296, ro:636 },
];

// ════════════════════════════════════════════════
//  GLOBAL STATE
// ════════════════════════════════════════════════
let idx        = 0;
let cache      = {};
let data       = null;
let eventsBase = null;   // set once student chooses university + group

// Layer visibility — raw signals + muon system ON; pre-labelled objects hidden
const layers = {
  tracks: true, emcal: true, hadcal: true, jets: false,
  electrons: false, photons: true, muons: true, met: false,
};

// Active mobile view ('rp' or 'lz')
let mobileView = 'rp';

// Selection state
let selected   = [];  // [{key, type, label, pt, eta, phi, energy}]
let hitAreas   = [];  // hit areas for transverse view
let hitAreasLZ = [];  // hit areas for longitudinal view

// Measurement log — persists across events
// Each entry: { mass, label, evNum }  (4-lepton also: zMasses:[mZ1,mZ2] )
let measurements = [];

// ATLAS Z masterclass channel display names
const CHANNEL_DISPLAY = {
  ee        : 'e⁺e⁻',
  mumu      : 'μ⁺μ⁻',
  eeee      : '4e',
  mumumumu  : '4μ',
  eemumu    : '2e2μ',
  gg        : 'γγ',
};
// Short labels used in the exported text file (matches HYPATIA format)
const EXPORT_LABEL = {
  ee       : 'e',
  mumu     : 'm',
  gg       : 'g',
  eeee     : '4ee',
  mumumumu : '4mm',
  eemumu   : '4me',   // muon-first to match HYPATIA
};

// Zoom state (per canvas)
const zoom = { rp: 1.0, lz: 1.0 };
const pan  = { rp: {x:0, y:0}, lz: {x:0, y:0} };

// ════════════════════════════════════════════════
//  TRACK CUTS — configurable quality filters
// ════════════════════════════════════════════════
// d0/z0 are stored in JiveXML in cm.  pt in GeV, eta dimensionless.
// pT/d0/z0 are always-on (slider only); hit cuts are toggleable (checkbox + value).
const trackCuts = {
  minPt:  2.0,  maxEta: 2.5,       // always-on
  maxD0:  0.25,                     // |d0| < 0.25 cm = 2.5 mm, always-on
  maxZ0:  20.0,                     // |z0| < 20.0 cm, always-on
  minPixHits:  2,  usePixHits: true,
  minSCTHits:  7,  useSCTHits: true,
  minTRTHits: 15,  useTRTHits: true,
};

// pT threshold for reconstructed objects (electrons, muons, photons)
const OBJ_PT_MIN = 5.0; // GeV

// Option A: draw track-matched EM clusters in green (set false to hide)
const SHOW_ELECTRON_CLUSTERS = true;

function passTrackCuts(tk) {
  if (Math.abs(tk.pt)    < trackCuts.minPt)  return false;
  if (Math.abs(tk.eta)   > trackCuts.maxEta) return false;
  if (Math.abs(tk.d0||0) > trackCuts.maxD0)  return false;
  if (Math.abs(tk.z0||0) > trackCuts.maxZ0)  return false;
  // Hit cuts: skip if hit count unavailable (< 0)
  if (trackCuts.usePixHits && tk.nPixHits >= 0 && tk.nPixHits < trackCuts.minPixHits) return false;
  if (trackCuts.useSCTHits && tk.nSCTHits >= 0 && tk.nSCTHits < trackCuts.minSCTHits) return false;
  if (trackCuts.useTRTHits && tk.nTRTHits >= 0 && tk.nTRTHits < trackCuts.minTRTHits) return false;
  return true;
}

// ════════════════════════════════════════════════
//  XML HELPERS
// ════════════════════════════════════════════════
function floats(text) {
  if (!text) return [];
  return text.trim().split(/\s+/).reduce((a, s) => {
    const v = parseFloat(s); if (!isNaN(v)) a.push(v); return a;
  }, []);
}
function child(el, tag) {
  const c = el.getElementsByTagName(tag)[0]; return c ? c.textContent : '';
}
function findEl(root, tag, key) {
  const all = root.getElementsByTagName(tag);
  for (const el of all) { if (!key || el.getAttribute('storeGateKey') === key) return el; }
  return null;
}

// ════════════════════════════════════════════════
//  PARSING
// ════════════════════════════════════════════════
function parseTracks(el) {
  if (!el) return [];
  const count     = parseInt(el.getAttribute('count')) || 0;
  const phi0_arr  = floats(child(el, 'phi0'));
  const pt_arr    = floats(child(el, 'pt'));
  const d0_arr    = floats(child(el, 'd0'));
  const z0_arr    = floats(child(el, 'z0'));
  const cot_arr   = floats(child(el, 'cotTheta'));
  const nPoly_arr = floats(child(el, 'numPolyline'));
  const px_arr    = floats(child(el, 'polylineX'));
  const py_arr    = floats(child(el, 'polylineY'));
  const pz_arr    = floats(child(el, 'polylineZ'));
  const npix_arr  = floats(child(el, 'nPixHits'));
  const nsct_arr  = floats(child(el, 'nSCTHits'));
  const ntrt_arr  = floats(child(el, 'nTRTHits'));
  const tracks = []; let off = 0;
  for (let i = 0; i < count; i++) {
    const n = nPoly_arr[i] || 2;
    const xs = px_arr.slice(off, off + n);
    const ys = py_arr.slice(off, off + n);
    off += n;
    const zs = pz_arr.slice(off - n, off);
    // Store individual hit counts; -1 means not available (e.g. MS tracks)
    const nPix = (npix_arr[i] != null) ? npix_arr[i] : -1;
    const nSCT = (nsct_arr[i] != null) ? nsct_arr[i] : -1;
    const nTRT = (ntrt_arr[i] != null) ? ntrt_arr[i] : -1;
    tracks.push({
      phi0: phi0_arr[i] || 0, pt: pt_arr[i] || 0,
      d0: d0_arr[i] || 0,    z0: z0_arr[i] || 0,
      eta: Math.asinh(cot_arr[i] || 0),
      nPixHits: nPix, nSCTHits: nSCT, nTRTHits: nTRT,
      xs, ys, zs
    });
  }
  return tracks;
}

function parseParticles(el) {
  if (!el) return [];
  const count  = parseInt(el.getAttribute('count')) || 0;
  const pt     = floats(child(el, 'pt'));
  const eta    = floats(child(el, 'eta'));
  const phi    = floats(child(el, 'phi'));
  const energy = floats(child(el, 'energy'));
  const pdgId  = floats(child(el, 'pdgId'));
  const isEMs = (child(el, 'isEMString') || '').trim().split(/\s+/);
  const result = [];
  for (let i = 0; i < count && i < pt.length; i++) {
    const quality = isEMs[i] || '';
    if (quality === 'none') continue;  // skip reconstruction failures
    result.push({
      pt: pt[i]||0, eta: eta[i]||0, phi: phi[i]||0,
      energy: energy[i]||0, pdgId: pdgId[i]||0, quality
    });
  }
  return result;
}

// Dedicated parser for ElectronCollection.
// Unlike parseParticles, we:
//  • do NOT filter on isEMString (all ATLAS electrons in this dataset have isEMString="none")
//  • capture trackIndex so we can link each electron to its inner-detector track
//  • pt is the cluster ET, energy is the cluster energy  (HYPATIA convention)
function parseElectrons(el) {
  if (!el) return [];
  const count      = parseInt(el.getAttribute('count')) || 0;
  const pt         = floats(child(el, 'pt'));       // cluster ET
  const eta        = floats(child(el, 'eta'));
  const phi        = floats(child(el, 'phi'));
  const energy     = floats(child(el, 'energy'));   // cluster energy
  const tIdxRaw    = (child(el, 'trackIndex') || '').trim();
  const tIdxs      = tIdxRaw ? tIdxRaw.split(/\s+/).map(Number) : [];
  const result = [];
  for (let i = 0; i < count && i < pt.length; i++) {
    const tIdx = (tIdxs[i] != null && !isNaN(tIdxs[i])) ? tIdxs[i] : -1;
    result.push({
      pt: pt[i]||0, eta: eta[i]||0, phi: phi[i]||0,
      energy: energy[i]||0,
      trackIndex: tIdx   // index into ev.tracks (generic Tracks collection)
    });
  }
  return result;
}

// Dedicated parser for Muon particle collections (StacoMuonCollection / Muons).
// Reads combined-fit pT, eta, phi, energy, and pdgId (for charge sign).
function parseMuons(el) {
  if (!el) return [];
  const count  = parseInt(el.getAttribute('count')) || 0;
  const pt     = floats(child(el, 'pt'));
  const eta    = floats(child(el, 'eta'));
  const phi    = floats(child(el, 'phi'));
  const energy = floats(child(el, 'energy'));
  const pdgRaw = (child(el, 'pdgId') || '').trim().split(/\s+/).map(Number);
  const result = [];
  for (let i = 0; i < count && i < pt.length; i++) {
    result.push({
      pt: pt[i]||0, eta: eta[i]||0, phi: phi[i]||0,
      energy: energy[i]||0,
      pdgId: pdgRaw[i] || 0   // 13 = µ+, -13 = µ−, 0 = unknown
    });
  }
  return result;
}

function parseJets(el) {
  if (!el) return [];
  const count = parseInt(el.getAttribute('count')) || 0;
  const et = floats(child(el,'et')), eta = floats(child(el,'eta')), phi = floats(child(el,'phi'));
  const result = [];
  for (let i = 0; i < count && i < et.length; i++)
    result.push({ et: et[i]||0, eta: eta[i]||0, phi: phi[i]||0 });
  return result;
}

function parseCalo(el) {
  if (!el) return { energy:[], phi:[], eta:[] };
  return { energy: floats(child(el,'energy')), phi: floats(child(el,'phi')), eta: floats(child(el,'eta')) };
}

function phiBins(energies, phis, n, thr) {
  const bins = new Float32Array(n);
  for (let i = 0; i < energies.length; i++) {
    if (energies[i] < thr) continue;
    let p = ((phis[i] % (2*Math.PI)) + 2*Math.PI) % (2*Math.PI);
    const b = Math.floor(p / (2*Math.PI) * n);
    if (b >= 0 && b < n) bins[b] += energies[i];
  }
  return bins;
}

function parseEvent(xmlText) {
  const doc  = new DOMParser().parseFromString(xmlText, 'text/xml');
  const root = doc.documentElement;
  if (root.tagName === 'parsererror') throw new Error('XML parse error');

  const meta = {
    run   : root.getAttribute('runNumber'),
    evNum : root.getAttribute('eventNumber'),
    date  : (root.getAttribute('dateTime')||'').replace(/ CE[S]?T/,''),
    lumi  : root.getAttribute('lumiBlock'),
  };

  const tracks     = parseTracks(findEl(root,'Track','Tracks'));
  const muonTracks = parseTracks(findEl(root,'Track','MuonSpectrometerTracks'));
  const electrons  = parseElectrons(findEl(root,'Electron','ElectronCollection'));
  const photons    = parseParticles(findEl(root,'Photon','PhotonCollection'));
  // StacoMuonCollection preferred (has pdgId/charge); fall back to Muons or CombinedFitMuons
  const muonObjs   = parseMuons(
    findEl(root,'Muon','StacoMuonCollection') ||
    findEl(root,'Muon','Muons')               ||
    findEl(root,'Muon','CombinedFitMuons')
  );
  const jets       = ENABLE_JETS
    ? parseJets(findEl(root,'Jet','AntiKt4LCTopoJets') || findEl(root,'Jet','AntiKt4LCTopoJets_AOD'))
    : [];

  const metEl = findEl(root,'ETMis','MET_RefFinal') || findEl(root,'ETMis',null);
  const met = metEl
    ? { et: parseFloat(child(metEl,'et'))||0, etx: parseFloat(child(metEl,'etx'))||0, ety: parseFloat(child(metEl,'ety'))||0 }
    : { et:0, etx:0, ety:0 };

  const lar  = parseCalo(findEl(root,'LAr', null));
  const tile = parseCalo(findEl(root,'TILE',null));
  const fcal = parseCalo(findEl(root,'FCAL',null));

  // Annotate electron-matched tracks with cluster ET so every display context
  // (canvas, track list, unclassified chip) shows the HYPATIA-consistent pT
  // rather than the raw ID-track curvature pT.  Bremsstrahlung can make the
  // raw pT substantially lower (e.g. 27 GeV track vs 45.6 GeV cluster).
  for (const el of electrons) {
    if (el.pt <= 0) continue;
    let bestI = -1, bestDR = 0.1;
    for (let i = 0; i < tracks.length; i++) {
      const tk = tracks[i];
      let dPhi = Math.abs(tk.phi0 - el.phi);
      if (dPhi > Math.PI) dPhi = 2 * Math.PI - dPhi;
      const dR = Math.sqrt(dPhi * dPhi + (tk.eta - el.eta) ** 2);
      if (dR < bestDR) { bestDR = dR; bestI = i; }
    }
    if (bestI >= 0) {
      // Preserve charge sign from raw track; magnitude from cluster ET
      tracks[bestI]._displayPt = Math.sign(tracks[bestI].pt || 1) * el.pt;
      tracks[bestI]._elEnergy  = el.energy;
    }
  }

  // Same annotation for muon-matched tracks: use combined-fit muon pT (from
  // StacoMuonCollection / Muons), not the raw ID track curvature pT.
  for (const mu of muonObjs) {
    if (mu.pt <= 0) continue;
    let bestI = -1, bestDR = 0.2;
    for (let i = 0; i < tracks.length; i++) {
      const tk = tracks[i];
      let dPhi = Math.abs(tk.phi0 - mu.phi);
      if (dPhi > Math.PI) dPhi = 2 * Math.PI - dPhi;
      const dR = Math.sqrt(dPhi * dPhi + (tk.eta - mu.eta) ** 2);
      if (dR < bestDR) { bestDR = dR; bestI = i; }
    }
    if (bestI >= 0 && !tracks[bestI]._displayPt) {  // don't overwrite electron annotation
      // pdgId 13 = µ+, -13 = µ−; fall back to charge sign from raw track pT
      const charge = mu.pdgId === 13 ? 1 : mu.pdgId === -13 ? -1 : Math.sign(tracks[bestI].pt || 1);
      tracks[bestI]._displayPt = charge * mu.pt;
      tracks[bestI]._muEnergy  = mu.energy;
    }
  }

  // Annotate MS tracks (muonTracks) with combined-fit pT so that pt=9999
  // straight tracks display the physically correct combined muon pT, not the
  // sentinel value.  Uses ΔR < 0.3 matching to StacoMuon / Muons object.
  for (const msTk of muonTracks) {
    let bestMu = null, bestDR = 0.3;
    for (const mu of muonObjs) {
      if (mu.pt <= 0) continue;
      let dPhi = Math.abs(msTk.phi0 - mu.phi);
      if (dPhi > Math.PI) dPhi = 2 * Math.PI - dPhi;
      const dR = Math.sqrt(dPhi * dPhi + (msTk.eta - mu.eta) ** 2);
      if (dR < bestDR) { bestDR = dR; bestMu = mu; }
    }
    if (bestMu) {
      const charge = bestMu.pdgId === 13 ? 1 : bestMu.pdgId === -13 ? -1 : Math.sign(msTk.pt || 1);
      msTk._displayPt = charge * bestMu.pt;
    }
  }

  return {
    meta, tracks, muonTracks, electrons, photons, jets, met, lar, tile, fcal,
    larBins  : phiBins(lar.energy,  lar.phi,  PHI_BINS, 0.5),  // was 0.15 — cut sub-threshold noise
    tilBins  : phiBins(tile.energy, tile.phi, PHI_BINS, 0.3),  // was 0.05
    fcalBins : phiBins(fcal.energy, fcal.phi, PHI_BINS, 0.3),  // was 0.10
  };
}

// ════════════════════════════════════════════════
//  LOADING
// ════════════════════════════════════════════════
async function loadEvent(i) {
  if (cache[i]) return cache[i];
  const r = await fetch(`${eventsBase}/event${String(i+1).padStart(3,'0')}.xml`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const ev = parseEvent(await r.text());
  cache[i] = ev; return ev;
}

// ════════════════════════════════════════════════
//  CANVAS SETUP
// ════════════════════════════════════════════════
const canvasRP = document.getElementById('canvas-rp');
const ctxRP    = canvasRP.getContext('2d');
const canvasLZ = document.getElementById('canvas-lz');
const ctxLZ    = canvasLZ.getContext('2d');

let csz = 300, dpr = 1;

function setupCanvas() {
  const wrapRP  = document.getElementById('wrap-rp');
  const wrapLZ  = document.getElementById('wrap-lz');
  const areaW   = document.getElementById('canvas-area').clientWidth;
  const mobile  = window.innerWidth < 640;

  dpr = window.devicePixelRatio || 1;

  if (mobile) {
    // Fill the screen width; cap at 480 so there's always room below for panels
    csz = Math.min(window.innerWidth - 8, 480);
    wrapRP.style.display = (mobileView === 'rp') ? 'flex' : 'none';
    wrapLZ.style.display = (mobileView === 'lz') ? 'flex' : 'none';
  } else {
    csz = Math.min(Math.floor((areaW - 10) / 2), 540);
    wrapRP.style.display = 'flex';
    wrapLZ.style.display = 'flex';
  }

  for (const cv of [canvasRP, canvasLZ]) {
    cv.width  = csz * dpr; cv.height = csz * dpr;
    cv.style.width  = csz + 'px';
    cv.style.height = csz + 'px';
  }
  ctxRP.setTransform(dpr,0,0,dpr,0,0);
  ctxLZ.setTransform(dpr,0,0,dpr,0,0);
}

// ════════════════════════════════════════════════
//  LAYER TOGGLE
// ════════════════════════════════════════════════
function setLayer(key, btn) {
  layers[key] = !layers[key];
  btn.classList.toggle('on', layers[key]);
  if (layers[key]) btn.style.setProperty('--tc', btn.dataset.color);
  else             btn.style.removeProperty('--tc');
  render();
}

function setMobileView(v) {
  mobileView = v;
  document.getElementById('tab-rp').classList.toggle('on', v === 'rp');
  document.getElementById('tab-lz').classList.toggle('on', v === 'lz');
  setupCanvas(); render();
}

// Initialise toggle button colours for layers that start ON
document.querySelectorAll('.tgl').forEach(btn => {
  const key = btn.dataset.layer;
  if (layers[key]) btn.style.setProperty('--tc', btn.dataset.color);
});

// ════════════════════════════════════════════════
//  SELECTION
// ════════════════════════════════════════════════
function isSelected(key) { return selected.some(s => s.key === key); }

function toggleSelect(hit) {
  const i = selected.findIndex(s => s.key === hit.key);
  if (i >= 0) {
    selected.splice(i, 1);             // deselect
  } else {
    if (selected.length >= 4) selected.shift();  // max 4 — drop oldest
    selected.push(hit);
  }
  render(); updateSelectionPanel(); if (data) updateDiscoveryPanel(data);
}

function removeSelected(key) {
  selected = selected.filter(s => s.key !== key);
  render(); updateSelectionPanel(); if (data) updateDiscoveryPanel(data);
}

function clearSelection() {
  selected = []; render(); updateSelectionPanel(); if (data) updateDiscoveryPanel(data);
}

function systemMass(particles) {
  let E=0, px=0, py=0, pz=0;
  for (const p of particles) {
    if (p.type === 'track' || p.type === 'cluster') continue;  // unclassified — skip
    let absPt, ep;
    if (p.type === 'muon') {
      // Muons: use track momentum (well-measured, no bremsstrahlung)
      absPt = Math.abs(p.pt);
      ep    = Math.sqrt((absPt * Math.cosh(p.eta))**2 + MUON_MASS**2);
    } else if (p.type === 'electron' && p.energy > 0) {
      // Electrons: use calorimeter cluster energy (HYPATIA convention).
      // Cluster ET = energy/cosh(η) gives the transverse momentum scale;
      // using it for all components ensures a consistent massless 4-vector.
      ep    = p.energy;
      absPt = p.energy / Math.cosh(p.eta);   // cluster ET
    } else {
      // Photons or any other classified particle
      absPt = Math.abs(p.pt);
      ep    = p.energy || (absPt * Math.cosh(p.eta));
    }
    px += absPt * Math.cos(p.phi);
    py += absPt * Math.sin(p.phi);
    pz += absPt * Math.sinh(p.eta);
    E  += ep;
  }
  return Math.sqrt(Math.max(0, E*E - px*px - py*py - pz*pz));
}

// ════════════════════════════════════════════════
//  CHARGE VALIDATION
// ════════════════════════════════════════════════
// For each lepton flavour (e, μ) with ≥2 selected, charges must sum to 0.
// Photons (charge 0) are always allowed. Returns {valid, msg}.
function chargesValid(particles) {
  for (const [type, sym] of [['electron','e'], ['muon','μ']]) {
    // Only check particles whose charge is known (±1); skip unknown-charge (0) particles
    const group = particles.filter(p => p.type === type && p.charge !== 0);
    if (group.length < 2) continue;
    const sum = group.reduce((s, p) => s + p.charge, 0);
    if (sum !== 0) {
      return {
        valid: false,
        msg: `Same-charge ${sym} pair — charges don't cancel (Q=${sum > 0 ? '+' : ''}${sum})`
      };
    }
  }
  return { valid: true };
}

// ════════════════════════════════════════════════
//  MEASUREMENTS — record, export, clear
// ════════════════════════════════════════════════

// Determine ATLAS masterclass channel label from selected particles
function channelLabel(particles) {
  const ps = particles.filter(p => p.type !== 'track' && p.type !== 'cluster');
  const nE = ps.filter(p => p.type === 'electron').length;
  const nM = ps.filter(p => p.type === 'muon').length;
  const nG = ps.filter(p => p.type === 'photon').length;
  const n  = ps.length;
  if (nG >= 2 && nE === 0 && nM === 0) return 'gg';
  if (n >= 4) {
    if (nE >= 4 && nM === 0)          return 'eeee';
    if (nM >= 4 && nE === 0)          return 'mumumumu';
    if (nE >= 2 && nM >= 2)           return 'eemumu';
  }
  if (nE >= 2 && nM === 0) return 'ee';
  if (nM >= 2 && nE === 0) return 'mumu';
  return 'ee';  // fallback
}

// Is this a complete, recordable channel?
function isCompleteChannel(particles) {
  const ps = particles.filter(p => p.type !== 'track' && p.type !== 'cluster');
  const nE = ps.filter(p => p.type === 'electron').length;
  const nM = ps.filter(p => p.type === 'muon').length;
  const nG = ps.filter(p => p.type === 'photon').length;
  const n  = ps.length;
  return (n === 2 && nG === 2) ||
         (n === 2 && nE === 2) ||
         (n === 2 && nM === 2) ||
         (n === 4 && nE === 4) ||
         (n === 4 && nM === 4) ||
         (n === 4 && nE === 2 && nM === 2);
}

// Hint text for partial selections
function selectionHint(particles) {
  const ps = particles.filter(p => p.type !== 'track' && p.type !== 'cluster');
  const nPending = particles.filter(p => p.type === 'track' || p.type === 'cluster').length;
  if (nPending > 0 && ps.length === 0) return t('hint.classify');
  if (nPending > 0) return t('hint.classifyFirst');
  const nE = ps.filter(p => p.type === 'electron').length;
  const nM = ps.filter(p => p.type === 'muon').length;
  const nG = ps.filter(p => p.type === 'photon').length;
  if (nG === 1)  return t('hint.oneMorePhoton');
  if (ps.length > 0) return t('hint.moreParticles');
  return t('hint.selectToCompute');
}

// Find the Z₁/Z₂ pairing that minimises |M₁−MZ| + |M₂−MZ| (best Z pair).
// Only considers OSSF (opposite-sign same-flavour) pairings.
// Returns [mZ1, mZ2] with mZ1 ≥ mZ2.
function zPairMasses(leptons) {
  if (leptons.length < 4) return null;
  const MZ = 91.2;
  // All three pairings of four leptons
  const pairings = [[0,1,2,3],[0,2,1,3],[0,3,1,2]];
  let best = null, bestScore = Infinity;
  for (const [a,b,c,d] of pairings) {
    // Enforce OSSF: both pairs must be opposite-sign
    const ossf1 = (leptons[a].charge || 0) * (leptons[b].charge || 0) < 0;
    const ossf2 = (leptons[c].charge || 0) * (leptons[d].charge || 0) < 0;
    if (!ossf1 || !ossf2) continue;
    const m1 = systemMass([leptons[a], leptons[b]]);
    const m2 = systemMass([leptons[c], leptons[d]]);
    const score = Math.abs(m1 - MZ) + Math.abs(m2 - MZ);
    if (score < bestScore) {
      bestScore = score;
      best = m1 >= m2 ? [m1, m2] : [m2, m1];
    }
  }
  return best;
}

// Returns [{mass, label}, {mass, label}] for the two Z candidates in a 4l event.
// label is the short export label ('e' or 'm') for each pair.
function zPairInfo(leptons) {
  if (leptons.length < 4) return null;
  const electrons = leptons.filter(p => p.type === 'electron');
  const muons     = leptons.filter(p => p.type === 'muon');
  if (electrons.length === 2 && muons.length === 2) {
    // 2e2μ: only valid OSSF pairing is e+e− and μ+μ−
    const mEE = systemMass(electrons);
    const mMM = systemMass(muons);
    const z1 = mEE >= mMM ? { mass: mEE, label: 'e' } : { mass: mMM, label: 'm' };
    const z2 = mEE >= mMM ? { mass: mMM, label: 'm' } : { mass: mEE, label: 'e' };
    return [z1, z2];
  }
  // 4e or 4μ: use best OSSF pairing from zPairMasses
  const pairLabel = electrons.length === 4 ? 'e' : 'm';
  const [mZ1, mZ2] = zPairMasses(leptons);
  return [{ mass: mZ1, label: pairLabel }, { mass: mZ2, label: pairLabel }];
}

function recordMeasurement() {
  if (selected.length < 2) return;
  if (!chargesValid(selected).valid) return;     // safeguard (button should be hidden)
  if (!isCompleteChannel(selected)) return;
  const mass    = systemMass(selected);
  const label   = channelLabel(selected);
  const evNum   = data ? data.meta.evNum : '?';
  const leptons = selected.filter(p => p.type === 'electron' || p.type === 'muon');
  // Only one measurement per event — flash the button to inform the student
  if (measurements.some(m => m.evNum === evNum)) {
    const btn = document.getElementById('btn-record');
    if (btn) { btn.textContent = t('btn.alreadyRecorded'); btn.disabled = true;
      setTimeout(() => { btn.textContent = t('btn.record'); btn.disabled = false; }, 1200); }
    return;
  }
  const entry   = { mass, label, evNum, evIdx: idx };
  if (leptons.length >= 4) entry.zPairs = zPairInfo(leptons);
  measurements.push(entry);
  updateMeasurementBar();
  saveState();
  // Flash the record button
  const btn = document.getElementById('btn-record');
  if (btn) { btn.textContent = t('btn.recorded'); btn.disabled = true;
    setTimeout(() => { btn.textContent = t('btn.record'); btn.disabled = false; }, 900); }
  // Clear selection so btn-record hides and confirm-on-navigate won't fire
  selected = [];
  render();
  updateSelectionPanel();
  // Advance to next event automatically
  go(1);
}

function exportMeasurements() {
  if (!measurements.length) return;
  const lines = [];
  for (const m of measurements) {
    const expLbl = EXPORT_LABEL[m.label] || m.label;
    if (m.zPairs) {
      // 4-lepton event: m4l first, then higher mll, then lower mll
      lines.push(`${m.mass.toFixed(4)} ${expLbl}`);
      lines.push(`${m.zPairs[0].mass.toFixed(4)} ${m.zPairs[0].label}`);
      lines.push(`${m.zPairs[1].mass.toFixed(4)} ${m.zPairs[1].label}`);
    } else {
      lines.push(`${m.mass.toFixed(4)} ${expLbl}`);
    }
  }
  const blob = new Blob([lines.join('\n') + '\n'], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'hypatia_measurements.txt';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function deleteMeasurement(idx) {
  measurements.splice(idx, 1);
  updateMeasurementBar();
  saveState();
}

function clearMeasurements() {
  if (measurements.length && !confirm(t('confirm.clearAll', { n: measurements.length }))) return;
  measurements = []; updateMeasurementBar(); saveState();
}

function updateMeasurementBar() {
  const n     = measurements.length;
  const countEl  = document.getElementById('meas-count');
  const exportBtn = document.getElementById('btn-export');
  const clearBtn  = document.getElementById('btn-meas-clear');
  const listEl   = document.getElementById('meas-list');
  if (!countEl) return;

  countEl.textContent = n ? t('meas.count', { n }) : t('meas.none');
  exportBtn.disabled = n === 0;
  clearBtn.style.display = n > 0 ? 'inline-block' : 'none';

  // Populate full list (all measurements, newest first)
  listEl.innerHTML = '';
  measurements.slice().reverse().forEach((m, revIdx) => {
    const realIdx = measurements.length - 1 - revIdx;
    const row = document.createElement('div');
    row.className = 'meas-row';
    const lbl = CHANNEL_DISPLAY[m.label] || m.label;
    const delBtn = `<button class="meas-del" onclick="deleteMeasurement(${realIdx})" title="Remove">×</button>`;
    if (m.zPairs) {
      // 4-lepton: main row for m4l, then two indented mll sub-rows
      const pLbl0 = m.zPairs[0].label === 'e' ? 'ee' : 'μμ';
      const pLbl1 = m.zPairs[1].label === 'e' ? 'ee' : 'μμ';
      row.innerHTML =
        `<span class="meas-lbl lbl-${m.label}">${lbl}</span>` +
        `<span class="meas-val">m<sub>4ℓ</sub> = ${m.mass.toFixed(2)} GeV</span>` +
        `<span class="meas-ev">#${m.evIdx + 1}</span>` +
        delBtn +
        `<div class="meas-sub">` +
          `<span class="meas-sub-row">m<sub>ℓℓ</sub><sup>(1)</sup> = ${m.zPairs[0].mass.toFixed(2)} GeV <em>(${pLbl0})</em></span>` +
          `<span class="meas-sub-row">m<sub>ℓℓ</sub><sup>(2)</sup> = ${m.zPairs[1].mass.toFixed(2)} GeV <em>(${pLbl1})</em></span>` +
        `</div>`;
    } else {
      row.innerHTML =
        `<span class="meas-lbl lbl-${m.label}">${lbl}</span>` +
        `<span class="meas-val">${m.mass.toFixed(2)} GeV</span>` +
        `<span class="meas-ev">#${m.evIdx + 1}</span>` +
        delBtn;
    }
    listEl.appendChild(row);
  });
}

function updateSelectionPanel() {
  const chips   = document.getElementById('sel-chips');
  const massEl  = document.getElementById('sel-mass');
  const clearEl = document.getElementById('sel-clear');
  const instrEl = document.getElementById('sel-instructions');

  chips.innerHTML = '';
  if (selected.length === 0) {
    instrEl.style.display = 'block';
    massEl.style.display  = 'none';
    clearEl.style.display = 'none';
    return;
  }
  instrEl.style.display = 'none';
  clearEl.style.display = 'inline-block';

  for (const p of selected) {
    const chip = document.createElement('div');
    if (p.type === 'track') {
      // Unclassified track — show e/μ buttons; charge (sign) is already known
      const eL  = p.charge > 0 ? 'e⁺' : 'e⁻';
      const muL = p.charge > 0 ? 'μ⁺' : 'μ⁻';
      chip.className = 'sel-chip t-track needs-classify';
      chip.innerHTML =
        `<span class="chip-pt"><b>${Math.abs(p.pt).toFixed(1)}</b> GeV — classify:</span>` +
        `<button class="cls-btn cls-e"  onclick="classifySelected('${p.key}','electron')">${eL}</button>` +
        `<button class="cls-btn cls-mu" onclick="classifySelected('${p.key}','muon')">${muL}</button>` +
        `<span class="rm" onclick="removeSelected('${p.key}')">×</span>`;
    } else if (p.type === 'cluster' || p.type === 'ecluster') {
      chip.className = 'sel-chip t-cluster needs-classify';
      const eBtn = p.type === 'ecluster'
        ? `<button class="cls-btn cls-e cls-disabled" disabled
             title="To classify as electron, select the matching inner-detector track instead">e</button>`
        : '';
      chip.innerHTML =
        `<span class="chip-pt"><b>${p.pt.toFixed(1)}</b> GeV — classify:</span>` +
        `<button class="cls-btn cls-g" onclick="classifySelected('${p.key}','photon')">γ</button>` +
        eBtn +
        `<span class="rm" onclick="removeSelected('${p.key}')">×</span>`;
    } else {
      // Already classified — normal chip
      chip.className = `sel-chip t-${p.type}`;
      chip.innerHTML = `${p.label} <b>${Math.abs(p.pt).toFixed(1)}</b> GeV`
        + ` <span class="rm" onclick="removeSelected('${p.key}')">×</span>`;
    }
    chips.appendChild(chip);
  }

  const recordBtn = document.getElementById('btn-record');

  if (selected.length >= 2) {
    const chk = chargesValid(selected);
    if (!chk.valid) {
      // Same-charge pair — warn clearly, do not allow recording
      massEl.textContent = '⚠ ' + chk.msg;
      massEl.style.display = 'inline-block';
      massEl.style.cssText = 'display:inline-block;color:#ff5252;background:rgba(255,82,82,0.12);border-color:rgba(255,82,82,0.4);';
      if (recordBtn) recordBtn.style.display = 'none';
      return;
    }

    const complete = isCompleteChannel(selected);
    const chLabel  = channelLabel(selected);
    const chName   = CHANNEL_DISPLAY[chLabel] || chLabel;

    if (complete) {
      const m       = systemMass(selected);
      const leptons = selected.filter(p => p.type === 'electron' || p.type === 'muon');
      let   text    = `${chName}  ·  m₄ℓ = ${m.toFixed(2)} GeV`;

      if (leptons.length >= 4) {
        const zp = zPairMasses(leptons);
        if (zp) text += `  ·  mℓℓ: ${zp[0].toFixed(1)} / ${zp[1].toFixed(1)} GeV`;
      }

      massEl.textContent = text;
      massEl.style.cssText = '';
      massEl.style.display = 'inline-block';
      if (recordBtn) {
        recordBtn.style.display  = 'inline-block';
        recordBtn.disabled       = false;
        recordBtn.textContent    = '⊕ Record';
      }
    } else {
      // Partial but charge-valid — show hint, no record yet
      massEl.textContent = selectionHint(selected);
      massEl.style.cssText = '';
      massEl.style.display = 'inline-block';
      if (recordBtn) recordBtn.style.display = 'none';
    }
  } else {
    massEl.textContent = selected.length === 1 ? selectionHint(selected) : t('hint.oneMore');
    massEl.style.cssText = '';
    massEl.style.display = 'inline-block';
    if (recordBtn) recordBtn.style.display = 'none';
  }

  // Keep Objects tab row highlights in sync with canvas selection changes
  updateDiscoveryPanel(data);
}

// ════════════════════════════════════════════════
//  TRACK COLOUR  (uniform cyan — matches HYPATIA)
// ════════════════════════════════════════════════
function trackColor(pt) {
  return 'rgba(0,220,255,0.78)';
}

// ════════════════════════════════════════════════
//  CLASSIFICATION  (user explicitly types tracks as e/μ, clusters as γ)
// ════════════════════════════════════════════════
function classifySelected(key, newType) {
  const item = selected.find(s => s.key === key);
  if (!item) return;
  const pMag = Math.abs(item.pt) * Math.cosh(item.eta);
  item.type = newType;
  if (newType === 'photon') {
    item.label  = 'γ';
    item.charge = 0;
  } else if (newType === 'electron') {
    item.label  = item.charge > 0 ? 'e⁺' : item.charge < 0 ? 'e⁻' : 'e±';
    {
      // Use the cluster ET/energy already annotated on the track at parse time
      // (ΔR<0.1 match to ElectronCollection).  This is always correct.
      // Never re-match via trackIndex: ElectronCollection.trackIndex points to
      // GSFTrackParticleCandidate indices which do NOT correspond to the
      // generic Tracks array, causing spurious coincidental matches.
      let clEnergy = 0, clPt = 0;

      const tIdx = item.key && item.key.startsWith('track_')
        ? parseInt(item.key.replace('track_', ''), 10) : -1;
      const origTk = (tIdx >= 0 && data) ? data.tracks[tIdx] : null;

      // (1) Parse-time annotation — authoritative, already ΔR-matched correctly
      if (origTk && origTk._elEnergy > 0) {
        clEnergy = origTk._elEnergy;
        clPt     = Math.abs(origTk._displayPt) || clEnergy / Math.cosh(item.eta);
      }

      // (2) ΔR fallback: find the *closest* EM cluster within ΔR < 0.2
      //     (use closest, not Array.find first-match, to avoid wrong-cluster collisions)
      if (clEnergy <= 0 && data) {
        const emClusters = mergedEmClusters(data);
        let bestDR = 0.2, bestCl = null;
        for (const cl of emClusters) {
          let dPhi = Math.abs((cl._phi || cl.phi) - item.phi);
          if (dPhi > Math.PI) dPhi = 2*Math.PI - dPhi;
          const dR = Math.sqrt(dPhi*dPhi + (cl.eta - item.eta)**2);
          if (dR < bestDR) { bestDR = dR; bestCl = cl; }
        }
        if (bestCl && bestCl.energy > 0) { clEnergy = bestCl.energy; clPt = bestCl.pt; }
      }

      if (clEnergy > 0) {
        item.energy = clEnergy;
        item.pt = Math.sign(item.pt || 1) * (clPt > 0 ? clPt : clEnergy / Math.cosh(item.eta));
      } else {
        item.energy = pMag;
      }
    }
  } else if (newType === 'muon') {
    item.label  = item.charge > 0 ? 'μ⁺' : 'μ⁻';
    item.energy = Math.sqrt(pMag**2 + MUON_MASS**2);
  }
  render();
  updateSelectionPanel();
}

// ════════════════════════════════════════════════
//  TYPE RESOLUTION HELPERS  (used by canvas draw + Discovery panel)
// ════════════════════════════════════════════════
// Return 'electron' if any passing ID track is within ΔR < 0.1 of the cluster; else 'photon'
function resolveClustrType(phi, eta, tracks, clPt = 0) {
  const DR_MAX = 0.1;
  for (const tk of (tracks || [])) {
    if (!passTrackCuts(tk)) continue;
    if (clPt > 0 && Math.abs(tk.pt) < clPt * 0.40) continue;
    let dPhi = Math.abs(tk.phi0 - phi);
    if (dPhi > Math.PI) dPhi = 2*Math.PI - dPhi;
    const dEta = tk.eta - eta;
    const dR = Math.sqrt(dPhi*dPhi + dEta*dEta);
    if (dR < DR_MAX) return 'electron';
  }
  return 'photon';
}
// Return 'muon' if any muon spectrometer track is within ΔR < 0.2 of the ID track; else 'track'
function resolveTrackType(phi0, eta0, muonTracks) {
  const DR_MAX = 0.2;
  for (const mu of (muonTracks || [])) {
    if (Math.abs(mu.pt) < OBJ_PT_MIN) continue;
    let dPhi = Math.abs(mu.phi0 - phi0);
    if (dPhi > Math.PI) dPhi = 2*Math.PI - dPhi;
    const dEta = mu.eta - eta0;
    if (Math.sqrt(dPhi*dPhi + dEta*dEta) < DR_MAX) return 'muon';
  }
  return 'track';
}

// ════════════════════════════════════════════════
//  SHARED DRAW HELPERS
// ════════════════════════════════════════════════
function drawGlowCtx(ctx, x, y, r, color) {
  ctx.save();
  ctx.shadowColor = color; ctx.shadowBlur = 14;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.restore();
}

function selRing(ctx, x, y, r) {
  drawGlowCtx(ctx, x, y, r+6, COL.selected);
  ctx.beginPath(); ctx.arc(x, y, r+6, 0, 2*Math.PI);
  ctx.strokeStyle = COL.selected; ctx.lineWidth = 2; ctx.stroke();
}

function pushHit(arr, key, type, label, x, y, r, pt, eta, phi, energy, charge) {
  arr.push({ key, type, label, x, y, r, pt, eta, phi, energy, charge: charge ?? 0 });
}

// Build EM-cluster list from PhotonCollection only (quality-filtered by ATLAS reconstruction).
// ElectronCollection entries are intentionally excluded here — they appear via their associated
// inner-detector tracks (annotated with _elEnergy/_displayPt at parse time).  Including raw
// ElectronCollection clusters produced spurious extra entries (e.g. event003: 5 vs 2 in HYPATIA).
function mergedEmClusters(ev) {
  return (ev.photons || []).map((ph, i) => ({ ...ph, _key: `photon_${i}`, _phi: ph.phi }));
}

// ════════════════════════════════════════════════
//  DRAW: TRANSVERSE  (r-φ)
// ════════════════════════════════════════════════
function drawTransverse(ev) {
  hitAreas = [];
  const cx = csz/2, cy = csz/2;
  const maxR = 1120;   // full barrel muon system (BOS outer ~1082 cm) + small margin
  const sc   = (csz/2 - 4) / maxR;

  const r2px = r      => r * sc;
  const ptX  = x      => cx + x * sc;
  const ptY  = y      => cy - y * sc;
  const phiX = (r, p) => cx + r * sc * Math.cos(p);
  const phiY = (r, p) => cy - r * sc * Math.sin(p);

  ctxRP.clearRect(0, 0, csz, csz);
  ctxRP.fillStyle = '#000'; ctxRP.fillRect(0, 0, csz, csz);

  // Apply zoom + pan centred on canvas centre
  ctxRP.save();
  ctxRP.translate(cx + pan.rp.x, cy + pan.rp.y); ctxRP.scale(zoom.rp, zoom.rp); ctxRP.translate(-cx, -cy);

  // ── Background region fills ────────────────────────────────────────────
  // Outermost fill — muon system region (dark, neutral)
  ctxRP.beginPath(); ctxRP.arc(cx, cy, r2px(maxR), 0, 2*Math.PI);
  ctxRP.fillStyle = '#050508'; ctxRP.fill();

  // TILE hadronic calorimeter — vivid red, matching HYPATIA
  ctxRP.beginPath(); ctxRP.arc(cx, cy, r2px(D.tilOuter), 0, 2*Math.PI);
  ctxRP.fillStyle = 'rgba(160,28,14,0.90)'; ctxRP.fill();

  // LAr EM calorimeter — vivid green, matching HYPATIA
  ctxRP.beginPath(); ctxRP.arc(cx, cy, r2px(D.larOuter), 0, 2*Math.PI);
  ctxRP.fillStyle = 'rgba(14,110,20,0.95)'; ctxRP.fill();

  // Inner detector — dark blue-black
  ctxRP.beginPath(); ctxRP.arc(cx, cy, r2px(D.trtOuter), 0, 2*Math.PI);
  ctxRP.fillStyle = '#010109'; ctxRP.fill();

  ctxRP.beginPath(); ctxRP.arc(cx, cy, r2px(D.beamPipe), 0, 2*Math.PI);
  ctxRP.fillStyle = '#000'; ctxRP.fill();

  // ── Calorimeter towers ─────────────────────────────────────────────────
  // Draws discrete separated bars — threshold cuts noise, gap keeps towers distinct
  function drawTowers(bins, rIn, rOut, color, thr) {
    const eThr  = thr || 0.6;                  // minimum bin energy to show (GeV)
    const TOWER_FILL = 0.65;                   // fraction of bin width to draw (30% gap)
    const binW  = 2*Math.PI / PHI_BINS;
    const hw    = binW * TOWER_FILL / 2;       // half-angle of drawn arc
    const maxE  = Math.max(...bins, 0.001);
    const norm  = Math.log1p(Math.max(maxE * 0.5, 4));  // needs more energy for full height
    for (let b = 0; b < PHI_BINS; b++) {
      const e = bins[b]; if (e < eThr) continue;
      const pc = (b + 0.5) / PHI_BINS * 2*Math.PI;  // bin centre angle
      const p1 = pc - hw, p2 = pc + hw;
      const frac   = Math.min(1, Math.log1p(e) / norm);
      const rOutPx = r2px(rIn) + frac * (r2px(rOut) - r2px(rIn));
      const alpha  = Math.min(1, 0.4 + frac * 0.6);
      ctxRP.beginPath();
      ctxRP.arc(cx, cy, rOutPx,   -p2, -p1);
      ctxRP.arc(cx, cy, r2px(rIn),-p1, -p2, true);
      ctxRP.closePath();
      const c = parseInt(color.slice(1), 16);
      ctxRP.fillStyle = `rgba(${(c>>16)&255},${(c>>8)&255},${c&255},${alpha.toFixed(2)})`;
      ctxRP.fill();
    }
  }

  if (layers.hadcal) {
    drawTowers(ev.tilBins, D.tilInner, D.tilOuter, COL.caloHAD);
    drawTowers(ev.fcalBins, D.tilMid1, D.tilMid2,  '#ffcc02');
  }
  if (layers.emcal) {
    drawTowers(ev.larBins, D.larInner, D.larOuter, COL.caloEM);
  }

  // ── Real ATLAS detector geometry ──────────────────────────────────────
  // TILE module boundaries
  [D.tilInner, D.tilMid1, D.tilMid2].forEach(r => {
    ctxRP.beginPath(); ctxRP.arc(cx,cy,r2px(r),0,2*Math.PI);
    ctxRP.strokeStyle='rgba(240,140,100,0.45)'; ctxRP.lineWidth=0.7; ctxRP.stroke();
  });
  ctxRP.beginPath(); ctxRP.arc(cx,cy,r2px(D.tilOuter),0,2*Math.PI);
  ctxRP.strokeStyle='rgba(255,170,130,0.75)'; ctxRP.lineWidth=1.5; ctxRP.stroke();

  // LAr EM layers
  [D.larPreR[0],D.larPreR[1],D.larInner,D.larMid,D.larMid2].forEach(r => {
    ctxRP.beginPath(); ctxRP.arc(cx,cy,r2px(r),0,2*Math.PI);
    ctxRP.strokeStyle='rgba(100,255,120,0.35)'; ctxRP.lineWidth=0.5; ctxRP.stroke();
  });
  ctxRP.beginPath(); ctxRP.arc(cx,cy,r2px(D.larOuter),0,2*Math.PI);
  ctxRP.strokeStyle='rgba(100,255,120,0.70)'; ctxRP.lineWidth=1.2; ctxRP.stroke();

  // TRT envelope
  ctxRP.beginPath(); ctxRP.arc(cx,cy,r2px(D.trtOuter),0,2*Math.PI);
  ctxRP.strokeStyle='rgba(80,110,210,0.45)'; ctxRP.lineWidth=0.9; ctxRP.stroke();
  ctxRP.beginPath(); ctxRP.arc(cx,cy,r2px(D.trtInner),0,2*Math.PI);
  ctxRP.strokeStyle='rgba(80,110,210,0.22)'; ctxRP.lineWidth=0.5; ctxRP.stroke();

  // SCT barrel layers
  D.sctR.forEach(r => {
    ctxRP.beginPath(); ctxRP.arc(cx,cy,r2px(r),0,2*Math.PI);
    ctxRP.strokeStyle='rgba(120,145,235,0.42)'; ctxRP.lineWidth=0.7; ctxRP.stroke();
  });

  // Pixel barrel layers
  D.pixelR.forEach(r => {
    ctxRP.beginPath(); ctxRP.arc(cx,cy,r2px(r),0,2*Math.PI);
    ctxRP.strokeStyle='rgba(170,200,255,0.70)'; ctxRP.lineWidth=1.0; ctxRP.stroke();
  });

  ctxRP.beginPath(); ctxRP.arc(cx,cy,r2px(D.beamPipe),0,2*Math.PI);
  ctxRP.strokeStyle='rgba(200,215,255,0.35)'; ctxRP.lineWidth=1.2; ctxRP.stroke();

  // ── Muon chamber segments (MDT barrel) ────────────────────────────────
  // Lit sectors are ALWAYS computed — the glowing chambers are the key visual
  // cue students use to identify muons, independent of the Muon Sys. toggle.
  const litSectors = new Set();
  for (const mu of ev.muonTracks) {
    if (Math.abs(mu.pt) < OBJ_PT_MIN) continue;
    for (let si = 0; si < MUON_SEGS.length; si++) {
      const seg = MUON_SEGS[si];
      const hwRad = (seg.hw + 3) * Math.PI / 180;  // +3° tolerance
      for (let pi = 0; pi < seg.phis.length; pi++) {
        const pc = seg.phis[pi] * Math.PI / 180;
        let diff = ((mu.phi0 - pc) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI);
        if (diff > Math.PI) diff -= 2*Math.PI;
        if (Math.abs(diff) < hwRad) litSectors.add(`${si}_${pi}`);
      }
    }
  }

  for (const [si, seg] of MUON_SEGS.entries()) {
    const ri = r2px(seg.ri), ro = r2px(seg.ro);
    for (const [pi, phi_deg] of seg.phis.entries()) {
      const pc  = phi_deg * Math.PI / 180;
      const phw = seg.hw  * Math.PI / 180;
      const p1  = -(pc + phw), p2 = -(pc - phw);
      const lit = litSectors.has(`${si}_${pi}`);
      ctxRP.beginPath();
      ctxRP.arc(cx, cy, ro, p1, p2);
      ctxRP.arc(cx, cy, ri, p2, p1, true);
      ctxRP.closePath();
      ctxRP.fillStyle   = lit ? 'rgba(0,210,255,0.50)'  : 'rgba(55,75,95,0.55)';
      ctxRP.fill();
      ctxRP.strokeStyle = lit ? 'rgba(0,235,255,0.95)'  : 'rgba(160,195,225,0.90)';
      ctxRP.lineWidth   = lit ? 1.4 : 0.9;
      ctxRP.stroke();
    }
  }

  // ── ID tracks ─────────────────────────────────────────────────────────
  if (layers.tracks) {
    for (const [origI, tk] of ev.tracks.entries()) {
      if (!passTrackCuts(tk)) continue;
      const key = `track_${origI}`;
      const sel = isSelected(key);
      const dpt = tk._displayPt ?? tk.pt;   // cluster ET for electron tracks, raw pT otherwise
      const col = sel ? COL.selected : trackColor(dpt);
      const lw  = sel ? 2.0 : (Math.abs(dpt) > 3 ? 1.2 : 0.65);
      let hx, hy;
      if (!tk.xs || tk.xs.length < 2) {
        hx = phiX(D.trtOuter*0.95, tk.phi0);
        hy = phiY(D.trtOuter*0.95, tk.phi0);
        ctxRP.beginPath(); ctxRP.moveTo(cx, cy);
        ctxRP.lineTo(hx, hy);
        ctxRP.strokeStyle = col; ctxRP.lineWidth = sel ? 2.0 : 0.5; ctxRP.stroke();
      } else {
        // Start from IP so all tracks originate at the interaction point (matches original HYPATIA)
        ctxRP.beginPath(); ctxRP.moveTo(cx, cy);
        for (let k = 0; k < tk.xs.length; k++) ctxRP.lineTo(ptX(tk.xs[k]), ptY(tk.ys[k]));
        ctxRP.strokeStyle = col; ctxRP.lineWidth = lw; ctxRP.stroke();
        hx = ptX(tk.xs[tk.xs.length-1]);
        hy = ptY(tk.ys[tk.ys.length-1]);
      }
      if (sel) selRing(ctxRP, hx, hy, 5);
      // Type left as 'track' — user classifies as electron or muon in selection panel
      const tkCharge = tk.pt >= 0 ? 1 : -1;
      pushHit(hitAreas, key, 'track', 'trk', hx, hy, 7, dpt, tk.eta, tk.phi0, 0, tkCharge);
    }
  }

    // ── Muon spectrometer tracks — dim; light up when matched ID track is selected ──
  if (layers.muons) {
    for (const [muIdx, mu] of ev.muonTracks.entries()) {
      if (Math.abs(mu.pt) < OBJ_PT_MIN) continue;
      // Resolve matched ID track first so selection uses the exact shared key
      const matchedI = ev.tracks.findIndex(tk => {
        if (!passTrackCuts(tk)) return false;
        let dPhi = Math.abs(tk.phi0 - mu.phi0); if (dPhi > Math.PI) dPhi = 2*Math.PI - dPhi;
        const dEta = tk.eta - mu.eta;
        return Math.sqrt(dPhi*dPhi + dEta*dEta) < 0.20;
      });
      const muKey  = matchedI >= 0 ? `track_${matchedI}` : `muon_${muIdx}`;
      const isMuSel = isSelected(muKey);   // exact key lookup — no phi-proximity false positives
      if (mu.xs && mu.xs.length >= 2) {
        ctxRP.beginPath(); ctxRP.moveTo(ptX(mu.xs[0]), ptY(mu.ys[0]));
        for (let k = 1; k < mu.xs.length; k++) ctxRP.lineTo(ptX(mu.xs[k]), ptY(mu.ys[k]));
        ctxRP.strokeStyle = isMuSel ? COL.selected : 'rgba(200,180,255,0.45)';
        ctxRP.lineWidth   = isMuSel ? 2.5 : 1.2; ctxRP.stroke();
      }
      const mx = phiX(492, mu.phi0), my = phiY(492, mu.phi0);
      // Only draw selRing for unmatched muons; matched ones already have an ID-track ring
      if (isMuSel && matchedI < 0) selRing(ctxRP, mx, my, 5);
      ctxRP.beginPath(); ctxRP.arc(mx, my, isMuSel ? 6 : 4, 0, 2*Math.PI);
      ctxRP.fillStyle   = isMuSel ? COL.selected            : 'rgba(220,200,255,0.70)'; ctxRP.fill();
      ctxRP.strokeStyle = isMuSel ? COL.selected            : 'rgba(180,160,255,0.85)';
      ctxRP.lineWidth   = isMuSel ? 1.5 : 0.8; ctxRP.stroke();
      const muDpt   = mu._displayPt ?? mu.pt;
      const muCharge = muDpt >= 0 ? 1 : -1;
      pushHit(hitAreas, muKey, 'track', 'trk', mx, my, 12, muDpt, mu.eta, mu.phi0, 0, muCharge);
    }
  }

  // ── Jets ──────────────────────────────────────────────────────────────
  if (ENABLE_JETS && layers.jets) {
    for (const jet of ev.jets) {
      if (Math.abs(jet.eta) > 2.7) continue;
      const tf   = 1 / Math.cosh(jet.eta); if (tf < 0.1) continue;
      const half = Math.max(0.12, Math.min(0.5, 0.4*tf));
      const alpha = Math.min(0.8, 0.25 + jet.et/250*0.55);
      const c = parseInt(COL.jet.slice(1), 16);
      ctxRP.beginPath();
      ctxRP.moveTo(cx, cy);
      ctxRP.lineTo(phiX(D.tilOuter, jet.phi - half), phiY(D.tilOuter, jet.phi - half));
      ctxRP.arc(cx, cy, r2px(D.tilOuter), -(jet.phi + half), -(jet.phi - half));
      ctxRP.closePath();
      ctxRP.fillStyle = `rgba(${(c>>16)&255},${(c>>8)&255},${c&255},${alpha.toFixed(2)})`;
      ctxRP.fill();
      ctxRP.strokeStyle = 'rgba(255,200,80,0.6)'; ctxRP.lineWidth = 0.8; ctxRP.stroke();
    }
  }

  // ── Electrons ─────────────────────────────────────────────────────────
  if (layers.electrons) {
    for (const [i, el] of ev.electrons.entries()) {
      if (Math.abs(el.eta) > 4 || el.pt < OBJ_PT_MIN) continue;
      const key     = `electron_${i}`, sel = isSelected(key);
      const xx      = phiX(D.larOuter+10, el.phi), yy = phiY(D.larOuter+10, el.phi);
      const rad     = Math.max(4, Math.min(9, el.pt/10+3));
      // PDG 11 = e⁻ (charge -1), PDG -11 = e⁺ (charge +1)
      const lbl     = el.pdgId===11 ? 'e⁻' : el.pdgId===-11 ? 'e⁺' : 'e±';
      const eCharge = el.pdgId === 11 ? -1 : el.pdgId === -11 ? 1 : 0;
      if (sel) selRing(ctxRP, xx, yy, rad);
      ctxRP.beginPath(); ctxRP.arc(xx, yy, rad, 0, 2*Math.PI);
      ctxRP.fillStyle = sel ? COL.selected : COL.electron; ctxRP.fill();
      ctxRP.strokeStyle = '#000'; ctxRP.lineWidth = 0.5; ctxRP.stroke();
      if (el.pt > 4) {
        ctxRP.font = '9px sans-serif';
        ctxRP.fillStyle = sel ? COL.selected : '#a5ffd0';
        ctxRP.textAlign = 'center';
        ctxRP.fillText(`${lbl} ${el.pt.toFixed(0)}`, xx, yy-rad-3);
        ctxRP.textAlign = 'left';
      }
      pushHit(hitAreas, key, 'electron', lbl, xx, yy, rad+6, el.pt, el.eta, el.phi, el.energy, eCharge);
    }
  }

  // ── Calorimeter clusters — ET bars (anonymous: photons + electrons combined) ──
  // Type resolved at click time via track-phi matching; no "γ"/"e" labels shown
  if (layers.photons) {
    const BAR_SCALE = 3.5;
    const BAR_MAX   = 420;
    const BAR_HW    = 6.5 * Math.PI / 180;

    // All EM deposits: PhotonCollection + any ElectronCollection entries not already covered
    const clusters_rp = mergedEmClusters(ev);

    for (const cl of clusters_rp) {
      if (Math.abs(cl.eta) > 2.5 || cl.pt < OBJ_PT_MIN) continue;
      if (resolveClustrType(cl._phi, cl.eta, ev.tracks, cl.pt) !== 'photon') continue;  // skip electron-matched
      const key   = cl._key, sel = isSelected(key);
      const barH  = Math.max(8, Math.min(BAR_MAX, cl.pt * BAR_SCALE));
      const rBase = D.tilOuter;
      const rTip  = rBase + barH;
      const phi   = cl._phi;
      const p1    = -(phi + BAR_HW), p2 = -(phi - BAR_HW);

      ctxRP.beginPath();
      ctxRP.arc(cx, cy, r2px(rTip),  p1, p2);
      ctxRP.arc(cx, cy, r2px(rBase), p2, p1, true);
      ctxRP.closePath();
      ctxRP.fillStyle   = sel ? 'rgba(206,147,216,0.88)' : 'rgba(255,214,0,0.88)';
      ctxRP.strokeStyle = sel ? COL.selected : 'rgba(255,240,100,0.95)';
      ctxRP.lineWidth   = sel ? 1.8 : 0.8;
      ctxRP.fill(); ctxRP.stroke();

      const tx = phiX(rTip, phi), ty = phiY(rTip, phi);
      if (sel) selRing(ctxRP, tx, ty, 5);

      // ET label — no particle type hint
      if (cl.pt > 15) {
        ctxRP.save();
        ctxRP.font = '9px sans-serif';
        ctxRP.fillStyle = sel ? COL.selected : '#ffe566';
        ctxRP.textAlign = 'center';
        ctxRP.fillText(`${cl.pt.toFixed(0)} GeV`, tx, ty - 7);
        ctxRP.restore();
      }

      const rMid = rBase + barH * 0.5;
      const hx = phiX(rMid, phi), hy = phiY(rMid, phi);
      const hitR = Math.max(10, r2px(barH * 0.4));
      pushHit(hitAreas, key, 'cluster', 'clu', hx, hy, hitR, cl.pt, cl.eta, phi, cl.energy, 0);
    }
  }

  // ── Option A: electron-matched clusters (green), flag-gated ──────────────
  if (SHOW_ELECTRON_CLUSTERS && layers.photons) {
    const BAR_SCALE_E = 3.5, BAR_MAX_E = 420, BAR_HW_E = 6.5 * Math.PI / 180;
    // Use the same merged list (and same keys) as the yellow bars to prevent double-selection
    const elClusters = mergedEmClusters(ev);
    for (const cl of elClusters) {
      if (Math.abs(cl.eta) > 2.5 || cl.pt < OBJ_PT_MIN) continue;
      if (resolveClustrType(cl._phi, cl.eta, ev.tracks, cl.pt) !== 'electron') continue;
      const key  = cl._key, sel = isSelected(key);
      const barH = Math.max(8, Math.min(BAR_MAX_E, cl.pt * BAR_SCALE_E));
      const rBase = D.tilOuter, rTip = rBase + barH;
      const phi   = cl._phi;
      const p1 = -(phi + BAR_HW_E), p2 = -(phi - BAR_HW_E);
      ctxRP.beginPath();
      ctxRP.arc(cx, cy, r2px(rTip),  p1, p2);
      ctxRP.arc(cx, cy, r2px(rBase), p2, p1, true);
      ctxRP.closePath();
      ctxRP.fillStyle   = sel ? 'rgba(206,147,216,0.88)' : 'rgba(0,230,118,0.40)';
      ctxRP.strokeStyle = sel ? COL.selected               : 'rgba(0,230,118,0.80)';
      ctxRP.lineWidth   = sel ? 1.8 : 0.9; ctxRP.fill(); ctxRP.stroke();
      if (sel) { const tx = phiX(rTip, phi), ty = phiY(rTip, phi); selRing(ctxRP, tx, ty, 5); }
      const rMidE = rBase + barH * 0.5;
      const hxE = phiX(rMidE, phi), hyE = phiY(rMidE, phi);
      const hitRE = Math.max(10, r2px(barH * 0.4));
      pushHit(hitAreas, key, 'ecluster', 'ecl', hxE, hyE, hitRE, cl.pt, cl.eta, phi, cl.energy, 0);
    }
  }

  // ── Option B: dashed connector — selected track → matched EM cluster ──────
  if (layers.tracks) {
    const allClRP = [...(ev.photons||[]), ...(ev.electrons||[])];
    for (const [origI, tk] of ev.tracks.entries()) {
      if (!passTrackCuts(tk) || !isSelected('track_' + origI)) continue;
      const cl = allClRP.find(c => {
        let d = Math.abs((c.phi||0) - tk.phi0); if (d > Math.PI) d = 2*Math.PI - d;
        return d < 0.15 && c.pt >= OBJ_PT_MIN && Math.abs(c.eta) <= 2.5
            && Math.abs((c.eta||0) - tk.eta) < 0.4;  // η-match: same pseudorapidity region
      });
      if (!cl) continue;
      const x1 = phiX(D.trtOuter, tk.phi0), y1 = phiY(D.trtOuter, tk.phi0);
      const x2 = phiX(D.tilOuter, tk.phi0), y2 = phiY(D.tilOuter, tk.phi0);
      ctxRP.save(); ctxRP.setLineDash([4, 3]);
      ctxRP.beginPath(); ctxRP.moveTo(x1, y1); ctxRP.lineTo(x2, y2);
      ctxRP.strokeStyle = COL.electron; ctxRP.lineWidth = 1.8; ctxRP.stroke();
      ctxRP.restore();
    }
  }

  // ── Missing ET ────────────────────────────────────────────────────────
  if (layers.met && ev.met.et > 5) {
    const { etx, ety, et } = ev.met;
    const phi = Math.atan2(ety, etx) + Math.PI;
    const x2  = phiX(D.tilOuter*0.87, phi), y2 = phiY(D.tilOuter*0.87, phi);
    ctxRP.save(); ctxRP.setLineDash([6,4]);
    ctxRP.beginPath(); ctxRP.moveTo(cx,cy); ctxRP.lineTo(x2,y2);
    ctxRP.strokeStyle = COL.met; ctxRP.lineWidth = 2; ctxRP.stroke(); ctxRP.restore();
    const ang = Math.atan2(y2-cy, x2-cx);
    ctxRP.beginPath(); ctxRP.moveTo(x2,y2);
    ctxRP.lineTo(x2-13*Math.cos(ang-0.38), y2-13*Math.sin(ang-0.38));
    ctxRP.lineTo(x2-13*Math.cos(ang+0.38), y2-13*Math.sin(ang+0.38));
    ctxRP.closePath(); ctxRP.fillStyle = COL.met; ctxRP.fill();
    ctxRP.font = '9px sans-serif'; ctxRP.fillStyle = COL.met;
    ctxRP.textAlign = 'center'; ctxRP.fillText(`MET ${et.toFixed(0)} GeV`, x2, y2-10);
    ctxRP.textAlign = 'left';
  }

  // ── Axis labels & beam spot ────────────────────────────────────────────
  ctxRP.font='10px sans-serif'; ctxRP.fillStyle='rgba(150,150,170,0.35)';
  ctxRP.fillText('x →', csz-24, cy-5);
  ctxRP.fillText('↑ y', cx+5, 14);
  ctxRP.beginPath(); ctxRP.arc(cx,cy,2.5,0,2*Math.PI);
  ctxRP.fillStyle='#fff'; ctxRP.fill();

  // Zoom hint (show when zoomed)
  if (zoom.rp !== 1) {
    ctxRP.font='10px sans-serif'; ctxRP.fillStyle='rgba(200,200,200,0.5)';
    ctxRP.fillText(`×${zoom.rp.toFixed(1)}`, 6, 16);
    ctxRP.fillText('dbl-click: reset', 6, 30);
  }

  ctxRP.restore(); // restore zoom transform
}

// ════════════════════════════════════════════════
//  DRAW: LONGITUDINAL  (ρ-z)
// ════════════════════════════════════════════════
function drawLongitudinal(ev) {
  hitAreasLZ = [];
  const VL  = 1120;  // view half-limit in cm — matches transverse maxR, shows full muon system
  const cx  = csz/2, cy = csz/2;
  const sc  = (csz/2 - 6) / VL;

  const toX  = z  => cx + z  * sc;
  const toY  = r  => cy - r  * sc;
  const toPx = cm => Math.abs(cm * sc);

  ctxLZ.clearRect(0, 0, csz, csz);
  ctxLZ.fillStyle = '#000'; ctxLZ.fillRect(0, 0, csz, csz);

  ctxLZ.save();
  ctxLZ.translate(cx + pan.lz.x, cy + pan.lz.y); ctxLZ.scale(zoom.lz, zoom.lz); ctxLZ.translate(-cx, -cy);

  // Fill band: z1..z2 cm, r1..r2 cm (positive AND negative ρ, both sides)
  function fillBand(z1, z2, r1, r2, color) {
    ctxLZ.fillStyle = color;
    const x = toX(Math.min(z1,z2)), w = toPx(z2-z1);
    const h = toPx(r2-r1);
    ctxLZ.fillRect(x, toY(Math.max(r1,r2)), w, h);  // positive ρ
    ctxLZ.fillRect(x, toY(-Math.min(r1,r2)), w, h); // negative ρ
  }

  // Stroke band outline (mirrored)
  function strokeBand(z1, z2, r1, r2, color, lw) {
    ctxLZ.strokeStyle = color; ctxLZ.lineWidth = lw;
    const x = toX(Math.min(z1,z2)), w = toPx(z2-z1), h = toPx(r2-r1);
    ctxLZ.strokeRect(x, toY(Math.max(r1,r2)), w, h);
    ctxLZ.strokeRect(x, toY(-Math.min(r1,r2)), w, h);
  }

  // ── Background fills ───────────────────────────────────────────────────
  fillBand(-VL, VL, 0, VL, '#050508');                                          // outer — muon system
  fillBand(-D.zTILE, D.zTILE, D.tilInner, D.tilOuter, 'rgba(160,28,14,0.90)'); // TILE — vivid red
  fillBand(-D.zLAr,  D.zLAr,  D.larInner, D.larOuter,  'rgba(14,110,20,0.95)'); // LAr  — vivid green
  fillBand(-D.zID,   D.zID,   0,           D.trtOuter,  'rgba(1,2,15,0.95)');   // ID

  // ── Calo energy deposits ───────────────────────────────────────────────
  if (layers.emcal) {
    const maxE = Math.max(...ev.lar.energy, 0.001);
    const rLAr = (D.larInner + D.larOuter) / 2;
    for (let i = 0; i < ev.lar.energy.length; i++) {
      const e = ev.lar.energy[i]; if (e < 1.0) continue;  // was 0.3 — cut noise
      const eta = ev.lar.eta[i]; if (Math.abs(eta) > 1.475) continue;
      const z   = rLAr * Math.sinh(eta); if (Math.abs(z) > VL) continue;
      const frac = Math.min(1, e / (maxE * 0.25));         // was 0.15 — less aggressive fill
      const h = Math.max(2, frac * (D.larOuter-D.larInner)*0.85*sc);
      ctxLZ.fillStyle = `rgba(255,214,0,${Math.min(0.9,0.2+frac*0.7)})`;
      ctxLZ.fillRect(toX(z)-1.5, toY(rLAr)-h/2, 3, h);
      ctxLZ.fillRect(toX(z)-1.5, toY(-rLAr)-h/2, 3, h);
    }
  }
  if (layers.hadcal) {
    const maxE = Math.max(...ev.tile.energy, 0.001);
    const rTIL = (D.tilInner + D.tilOuter) / 2;
    for (let i = 0; i < ev.tile.energy.length; i++) {
      const e = ev.tile.energy[i]; if (e < 0.6) continue;  // was 0.2
      const eta = ev.tile.eta[i]; if (Math.abs(eta) > 1.0) continue;
      const z   = rTIL * Math.sinh(eta); if (Math.abs(z) > VL) continue;
      const frac = Math.min(1, e / (maxE * 0.25));          // was 0.15
      const h = Math.max(2, frac * (D.tilOuter-D.tilInner)*0.85*sc);
      ctxLZ.fillStyle = `rgba(255,145,0,${Math.min(0.9,0.2+frac*0.7)})`;
      ctxLZ.fillRect(toX(z)-1.5, toY(rTIL)-h/2, 3, h);
      ctxLZ.fillRect(toX(z)-1.5, toY(-rTIL)-h/2, 3, h);
    }
  }

  // ── Geometry boundary outlines ─────────────────────────────────────────
  strokeBand(-D.zTILE, D.zTILE, D.tilInner, D.tilMid1,  'rgba(240,140,100,0.45)', 0.6);
  strokeBand(-D.zTILE, D.zTILE, D.tilMid1,  D.tilMid2,  'rgba(240,140,100,0.45)', 0.6);
  strokeBand(-D.zTILE, D.zTILE, D.tilMid2,  D.tilOuter, 'rgba(255,170,130,0.75)', 1.2);
  strokeBand(-D.zLAr,  D.zLAr,  D.larInner, D.larMid,   'rgba(100,255,120,0.35)', 0.5);
  strokeBand(-D.zLAr,  D.zLAr,  D.larMid,   D.larMid2,  'rgba(100,255,120,0.35)', 0.5);
  strokeBand(-D.zLAr,  D.zLAr,  D.larMid2,  D.larOuter, 'rgba(100,255,120,0.70)', 1.0);
  strokeBand(-D.zID,   D.zID,   0, D.trtOuter,           'rgba(80,110,210,0.45)', 0.9);

  // SCT horizontal lines in ρ-z
  D.sctR.forEach(r => {
    ctxLZ.strokeStyle='rgba(120,145,235,0.35)'; ctxLZ.lineWidth=0.5;
    ctxLZ.beginPath(); ctxLZ.moveTo(toX(-D.zID),toY(r));  ctxLZ.lineTo(toX(D.zID),toY(r));  ctxLZ.stroke();
    ctxLZ.beginPath(); ctxLZ.moveTo(toX(-D.zID),toY(-r)); ctxLZ.lineTo(toX(D.zID),toY(-r)); ctxLZ.stroke();
  });
  D.pixelR.forEach(r => {
    ctxLZ.strokeStyle='rgba(170,200,255,0.60)'; ctxLZ.lineWidth=0.7;
    ctxLZ.beginPath(); ctxLZ.moveTo(toX(-D.zID),toY(r));  ctxLZ.lineTo(toX(D.zID),toY(r));  ctxLZ.stroke();
    ctxLZ.beginPath(); ctxLZ.moveTo(toX(-D.zID),toY(-r)); ctxLZ.lineTo(toX(D.zID),toY(-r)); ctxLZ.stroke();
  });
  // Beam pipe
  ctxLZ.strokeStyle='rgba(200,215,255,0.3)'; ctxLZ.lineWidth=1;
  ctxLZ.beginPath(); ctxLZ.moveTo(toX(-VL),toY(D.beamPipe));  ctxLZ.lineTo(toX(VL),toY(D.beamPipe));  ctxLZ.stroke();
  ctxLZ.beginPath(); ctxLZ.moveTo(toX(-VL),toY(-D.beamPipe)); ctxLZ.lineTo(toX(VL),toY(-D.beamPipe)); ctxLZ.stroke();

  // ── Barrel MDT chambers ───────────────────────────────────────────────
  const GAP_CM = 3;
  for (const layer of MDT_RZ) {
    for (const seg of layer.zSegs) {
      if (seg.zo - seg.zi < 5) continue;
      const x1p = toX(seg.zi+GAP_CM), x2p = toX(seg.zo-GAP_CM);
      const x1n = toX(-(seg.zo-GAP_CM)), x2n = toX(-(seg.zi+GAP_CM));
      const w = x2p - x1p; if (w < 0.8) continue;
      const yHi = toY(layer.ro), yLo = toY(layer.ri);
      const h   = yLo - yHi; if (h < 0.5) continue;
      ctxLZ.fillStyle   = 'rgba(55,75,95,0.55)';    // grey
      ctxLZ.strokeStyle = 'rgba(160,195,225,0.90)'; // light grey-blue
      ctxLZ.lineWidth   = 0.9;
      // positive z, positive ρ
      ctxLZ.fillRect(x1p, yHi, w, h);  ctxLZ.strokeRect(x1p, yHi, w, h);
      // negative z, positive ρ
      ctxLZ.fillRect(x1n, yHi, w, h);  ctxLZ.strokeRect(x1n, yHi, w, h);
      // mirrors for negative ρ
      const yHi_neg = toY(-layer.ri), yLo_neg = toY(-layer.ro);
      ctxLZ.fillRect(x1p, yLo_neg, w, h); ctxLZ.strokeRect(x1p, yLo_neg, w, h);
      ctxLZ.fillRect(x1n, yLo_neg, w, h); ctxLZ.strokeRect(x1n, yLo_neg, w, h);
    }
  }

  // ── Endcap calorimeters ───────────────────────────────────────────────
  // LAr EM endcap (vivid green, same shade as barrel LAr)
  fillBand( D.zECLArNear,  D.zECLArFar, D.rECLArIn, D.rECLArOut, 'rgba(14,110,20,0.95)');
  fillBand(-D.zECLArFar,  -D.zECLArNear, D.rECLArIn, D.rECLArOut, 'rgba(14,110,20,0.95)');
  strokeBand( D.zECLArNear,  D.zECLArFar, D.rECLArIn, D.rECLArOut, 'rgba(100,255,120,0.70)', 1.0);
  strokeBand(-D.zECLArFar,  -D.zECLArNear, D.rECLArIn, D.rECLArOut, 'rgba(100,255,120,0.70)', 1.0);
  // HEC hadronic endcap (vivid red, same shade as barrel Tile)
  fillBand( D.zHECNear,  D.zHECFar, D.rHECIn, D.rHECOut, 'rgba(160,28,14,0.90)');
  fillBand(-D.zHECFar,  -D.zHECNear, D.rHECIn, D.rHECOut, 'rgba(160,28,14,0.90)');
  strokeBand( D.zHECNear,  D.zHECFar, D.rHECIn, D.rHECOut, 'rgba(255,170,130,0.75)', 1.0);
  strokeBand(-D.zHECFar,  -D.zHECNear, D.rHECIn, D.rHECOut, 'rgba(255,170,130,0.75)', 1.0);
  // FCAL (innermost, greenish — EM dominant)
  fillBand( D.zFCALNear,  D.zFCALFar, D.rFCALIn, D.rFCALOut, 'rgba(14,110,20,0.85)');
  fillBand(-D.zFCALFar,  -D.zFCALNear, D.rFCALIn, D.rFCALOut, 'rgba(14,110,20,0.85)');
  strokeBand( D.zFCALNear,  D.zFCALFar, D.rFCALIn, D.rFCALOut, 'rgba(100,255,120,0.55)', 0.7);
  strokeBand(-D.zFCALFar,  -D.zFCALNear, D.rFCALIn, D.rFCALOut, 'rgba(100,255,120,0.55)', 0.7);

  // ── Endcap MDT / CSC disc chambers ───────────────────────────────────
  for (const disc of ENDCAP_DISC) {
    ctxLZ.fillStyle   = 'rgba(55,75,95,0.55)';
    ctxLZ.strokeStyle = 'rgba(160,195,225,0.90)';
    ctxLZ.lineWidth   = 0.9;
    // Use fillBand/strokeBand: draw +z side, then -z side
    fillBand( disc.zi,  disc.zo, disc.ri, disc.ro, 'rgba(55,75,95,0.55)');
    fillBand(-disc.zo, -disc.zi, disc.ri, disc.ro, 'rgba(55,75,95,0.55)');
    strokeBand( disc.zi,  disc.zo, disc.ri, disc.ro, 'rgba(160,195,225,0.90)', 0.9);
    strokeBand(-disc.zo, -disc.zi, disc.ri, disc.ro, 'rgba(160,195,225,0.90)', 0.9);
  }

    // ── ID tracks (ρ-z projection, y-component = ρ·sin φ) ─────────────────
  if (layers.tracks) {
    for (const [origI, tk] of ev.tracks.entries()) {
      if (!passTrackCuts(tk)) continue;
      const cotTh = Math.sinh(tk.eta); if (Math.abs(cotTh) > 15) continue;
      const key  = 'track_' + origI;
      const sel  = isSelected(key);
      const R    = D.trtOuter;
      const yE   = R * Math.sin(tk.phi0);
      const zE   = (tk.z0||0) + R * cotTh;
      ctxLZ.beginPath(); ctxLZ.moveTo(toX(tk.z0||0), toY(0)); ctxLZ.lineTo(toX(zE), toY(yE));
      const dptLZ = tk._displayPt ?? tk.pt;
      ctxLZ.strokeStyle = sel ? COL.selected : trackColor(dptLZ);
      ctxLZ.lineWidth   = sel ? 1.8 : 0.55; ctxLZ.stroke();
      if (sel) selRing(ctxLZ, toX(zE), toY(yE), 5);
      const tkChargeLZ = tk.pt >= 0 ? 1 : -1;
      pushHit(hitAreasLZ, key, 'track', 'trk', toX(zE), toY(yE), 9,
              dptLZ, tk.eta, tk.phi0, 0, tkChargeLZ);
      // If muon-matched and selected: extend dashed line to TILE outer
      if (sel && resolveTrackType(tk.phi0, tk.eta, ev.muonTracks) === 'muon') {
        const Rmu = D.tilOuter;
        const yMu = Rmu * Math.sin(tk.phi0);
        const zMu = (tk.z0||0) + Rmu * cotTh;
        ctxLZ.save(); ctxLZ.setLineDash([4, 3]);
        ctxLZ.beginPath(); ctxLZ.moveTo(toX(zE), toY(yE)); ctxLZ.lineTo(toX(zMu), toY(yMu));
        ctxLZ.strokeStyle = COL.selected; ctxLZ.lineWidth = 1.4; ctxLZ.stroke();
        ctxLZ.restore();
      }
    }
  }

  // ── Muon tracks in ρ-z — dim; highlight when matched ID track is selected ──
  if (layers.muons) {
    for (const [muIdx, mu] of ev.muonTracks.entries()) {
      if (Math.abs(mu.pt) < OBJ_PT_MIN) continue;
      // Resolve matched ID track first so selection uses the exact shared key
      const matchedI = ev.tracks.findIndex(tk => {
        if (!passTrackCuts(tk)) return false;
        let dPhi = Math.abs(tk.phi0 - mu.phi0); if (dPhi > Math.PI) dPhi = 2*Math.PI - dPhi;
        const dEta = tk.eta - mu.eta;
        return Math.sqrt(dPhi*dPhi + dEta*dEta) < 0.20;
      });
      const muKeyLZ  = matchedI >= 0 ? `track_${matchedI}` : `muon_${muIdx}`;
      const isMuSel  = isSelected(muKeyLZ);  // exact key lookup — no phi-proximity false positives
      const cotTh = Math.sinh(mu.eta);
      // Use actual 3D polyline if available (ys = polylineY = rho*sin(phi) projection)
      let zE, yE;
      // Count how many polyline points fall within the LZ view window
      const nInView = mu.zs ? mu.zs.filter((zk, k) =>
        Math.abs(zk) <= VL && Math.abs(mu.ys[k]) <= VL).length : 0;
      if (mu.zs && mu.zs.length >= 2 && nInView > 0) {
        ctxLZ.beginPath(); ctxLZ.moveTo(toX(mu.z0||0), toY(0));
        for (let k = 0; k < mu.zs.length; k++) {
          const zk = mu.zs[k], yk = mu.ys[k];
          if (Math.abs(zk) > VL || Math.abs(yk) > VL) break;
          ctxLZ.lineTo(toX(zk), toY(yk));
        }
        ctxLZ.strokeStyle = isMuSel ? COL.selected : 'rgba(200,180,255,0.45)';
        ctxLZ.lineWidth   = isMuSel ? 2.2 : 1.0; ctxLZ.stroke();
        // endpoint = last in-view polyline point
        const lastK = mu.zs.reduce((best, zk, k) =>
          (Math.abs(zk)<=VL && Math.abs(mu.ys[k])<=VL) ? k : best, 0);
        zE = mu.zs[lastK]; yE = mu.ys[lastK];
      } else {
        // Parametric fallback: forward/endcap muons whose polyline is outside the
        // current view window (e.g. eta>2, z>VL).  Draw a straight line to the
        // view edge so the track direction is still visible.
        const R_ext = Math.abs(cotTh) < 0.001 ? VL
                    : Math.min(VL, VL / Math.abs(cotTh));
        yE = R_ext * Math.sin(mu.phi0);
        zE = (mu.z0||0) + R_ext * cotTh;
        // Clamp to view boundary so the dot lands on the canvas edge
        if (Math.abs(zE) > VL) { const s = VL/Math.abs(zE); zE *= s; yE *= s; }
        ctxLZ.beginPath(); ctxLZ.moveTo(toX(mu.z0||0), toY(0)); ctxLZ.lineTo(toX(zE), toY(yE));
        ctxLZ.strokeStyle = isMuSel ? COL.selected : 'rgba(200,180,255,0.45)';
        ctxLZ.lineWidth   = isMuSel ? 2.2 : 1.0; ctxLZ.stroke();
      }
      // Only draw selRing for unmatched muons; matched ones already have an ID-track ring
      if (isMuSel && matchedI < 0) selRing(ctxLZ, toX(zE), toY(yE), 5);
      const muDptLZ    = mu._displayPt ?? mu.pt;
      const muChargeLZ = muDptLZ >= 0 ? 1 : -1;
      pushHit(hitAreasLZ, muKeyLZ, 'track', 'trk', toX(zE), toY(yE), 12,
              muDptLZ, mu.eta, mu.phi0, 0, muChargeLZ);
    }
  }

   // ── Electrons in ρ-z ─────────────────────────────────────────────────
  if (layers.electrons) {
    for (const [i, el] of ev.electrons.entries()) {
      const cotTh = Math.sinh(el.eta);
      if (Math.abs(cotTh) > 15 || el.pt < OBJ_PT_MIN) continue;
      const key     = `electron_${i}`, sel = isSelected(key);
      const R       = D.larOuter + 12;
      const yE      = R * Math.sin(el.phi), zE = R * cotTh;
      const lbl     = el.pdgId===11 ? 'e⁻' : el.pdgId===-11 ? 'e⁺' : 'e±';
      const eCharge = el.pdgId === 11 ? -1 : el.pdgId === -11 ? 1 : 0;
      if (sel) selRing(ctxLZ, toX(zE), toY(yE), 5);
      ctxLZ.beginPath(); ctxLZ.arc(toX(zE), toY(yE), 5, 0, 2*Math.PI);
      ctxLZ.fillStyle = sel?COL.selected:COL.electron; ctxLZ.fill();
      pushHit(hitAreasLZ, key, 'electron', lbl, toX(zE), toY(yE), 9,
              el.pt, el.eta, el.phi, el.energy, eCharge);
    }
  }

  // ── Calorimeter clusters in ρ-z — ET bars (anonymous: photons + electrons combined) ──
  if (layers.photons) {
    const BAR_SCALE = 3.5;
    const BAR_MAX   = 420;
    const BAR_W_CM  = 16;

    // All EM deposits: PhotonCollection + any ElectronCollection entries not already covered
    const clusters_lz = mergedEmClusters(ev);

    for (const ph of clusters_lz) {
      const cotTh = Math.sinh(ph.eta);
      if (Math.abs(cotTh) > 15 || ph.pt < OBJ_PT_MIN) continue;
      if (resolveClustrType(ph._phi, ph.eta, ev.tracks, ph.pt) !== 'photon') continue;  // skip electron-matched
      const key  = ph._key, sel = isSelected(key);
      const zPh  = D.larOuter * cotTh;
      if (Math.abs(zPh) > VL) continue;
      const barH = Math.max(8, Math.min(BAR_MAX, ph.pt * BAR_SCALE));

      // Radial bar: starts at LAr outer face, points away from IP along (sinθ, cosθ) in (ρ,z)
      const sinT = 1 / Math.cosh(ph.eta);   // sin(polar angle) — always positive
      const cosT = Math.tanh(ph.eta);        // cos(polar angle) — sign follows η
      const rS = D.larOuter, zS = zPh;
      const rE = rS + barH * sinT, zE = zS + barH * cosT;

      // Canvas start/end (sc = pixels/cm, toX/toY are affine)
      const sx = toX(zS), sy = toY(rS);
      const ex = toX(zE), ey = toY(rE);
      const dxB = ex - sx, dyB = ey - sy;
      const blen = Math.sqrt(dxB*dxB + dyB*dyB) || 1;
      const hwPx = Math.max(2, toPx(BAR_W_CM) / 2);
      // Perpendicular (half-width) unit vector:
      const nx = -dyB / blen * hwPx, ny = dxB / blen * hwPx;

      ctxLZ.fillStyle   = sel ? 'rgba(206,147,216,0.88)' : 'rgba(255,214,0,0.88)';
      ctxLZ.strokeStyle = sel ? COL.selected : 'rgba(255,240,100,0.95)';
      ctxLZ.lineWidth   = sel ? 1.8 : 0.8;
      ctxLZ.beginPath();
      ctxLZ.moveTo(sx + nx, sy + ny); ctxLZ.lineTo(sx - nx, sy - ny);
      ctxLZ.lineTo(ex - nx, ey - ny); ctxLZ.lineTo(ex + nx, ey + ny);
      ctxLZ.closePath(); ctxLZ.fill(); ctxLZ.stroke();

      if (sel) selRing(ctxLZ, ex, ey, 5);

      // ET label above tip
      if (ph.pt > 15) {
        ctxLZ.save();
        ctxLZ.font = '9px sans-serif';
        ctxLZ.fillStyle = sel ? COL.selected : '#ffe566';
        ctxLZ.textAlign = 'center';
        ctxLZ.fillText(`${ph.pt.toFixed(0)} GeV`, ex, ey - 5);
        ctxLZ.restore();
      }

      const mx = (sx + ex) / 2, my = (sy + ey) / 2;
      const hitR = Math.min(28, Math.max(8, blen * 0.5));
      pushHit(hitAreasLZ, key, 'cluster', 'clu', mx, my, hitR,
              ph.pt, ph.eta, ph._phi, ph.energy, 0);
    }
  }

  // ── Option A: electron-matched clusters (green), flag-gated ──────────────
  if (SHOW_ELECTRON_CLUSTERS && layers.photons) {
    const BAR_SCALE_E = 3.5, BAR_MAX_E = 420, BAR_W_E = 16;
    // Use the same merged list (and same keys) as the yellow bars to prevent double-selection
    const elClustersLZ = mergedEmClusters(ev);
    for (const cl of elClustersLZ) {
      const cotTh = Math.sinh(cl.eta);
      if (Math.abs(cotTh) > 15 || cl.pt < OBJ_PT_MIN) continue;
      if (resolveClustrType(cl._phi || cl.phi, cl.eta, ev.tracks, cl.pt) !== 'electron') continue;
      const key  = cl._key, sel = isSelected(key);
      const zPh  = D.larOuter * cotTh;
      if (Math.abs(zPh) > VL) continue;
      const barH   = Math.max(8, Math.min(BAR_MAX_E, cl.pt * BAR_SCALE_E));
      const sinT   = 1 / Math.cosh(cl.eta), cosT = Math.tanh(cl.eta);
      const rS = D.larOuter, zS = zPh;
      const rE = rS + barH * sinT, zE = zS + barH * cosT;
      const sx = toX(zS), sy = toY(rS), ex = toX(zE), ey = toY(rE);
      const dxB = ex - sx, dyB = ey - sy;
      const blen = Math.sqrt(dxB*dxB + dyB*dyB) || 1;
      const hwPx = Math.max(2, toPx(BAR_W_E) / 2);
      const nx = -dyB / blen * hwPx, ny = dxB / blen * hwPx;
      ctxLZ.fillStyle   = sel ? 'rgba(206,147,216,0.88)' : 'rgba(0,230,118,0.40)';
      ctxLZ.strokeStyle = sel ? COL.selected               : 'rgba(0,230,118,0.80)';
      ctxLZ.lineWidth   = sel ? 1.8 : 0.9;
      ctxLZ.beginPath();
      ctxLZ.moveTo(sx + nx, sy + ny); ctxLZ.lineTo(sx - nx, sy - ny);
      ctxLZ.lineTo(ex - nx, ey - ny); ctxLZ.lineTo(ex + nx, ey + ny);
      ctxLZ.closePath(); ctxLZ.fill(); ctxLZ.stroke();
      if (sel) selRing(ctxLZ, ex, ey, 5);
      // Clickable hit
      const mxE = (sx + ex) / 2, myE = (sy + ey) / 2;
      const hitRE = Math.min(28, Math.max(8, blen * 0.5));
      pushHit(hitAreasLZ, key, 'ecluster', 'ecl', mxE, myE, hitRE,
              cl.pt, cl.eta, cl._phi || cl.phi, cl.energy, 0);
    }
  }

  // ── Option B: dashed connector — selected track → matched cluster ─────────
  if (layers.tracks) {
    const allClLZ = [...(ev.photons||[]), ...(ev.electrons||[])];
    for (const [origI, tk] of ev.tracks.entries()) {
      if (!passTrackCuts(tk) || !isSelected('track_' + origI)) continue;
      const cl = allClLZ.find(c => {
        let d = Math.abs((c.phi||0) - tk.phi0); if (d > Math.PI) d = 2*Math.PI - d;
        return d < 0.15 && c.pt >= OBJ_PT_MIN
            && Math.abs((c.eta||0) - tk.eta) < 0.4;  // η-match: prevent wrong-side clusters
      });
      if (!cl) continue;
      const cotTk = Math.sinh(tk.eta);
      const zTk   = (tk.z0||0) + D.trtOuter * cotTk;
      const yTk   = D.trtOuter * Math.sin(tk.phi0);
      const cotCl = Math.sinh(cl.eta);
      const zCl   = D.larOuter * cotCl;
      const yCl   = D.larOuter * Math.sin(tk.phi0);  // φ-projected: same half as track
      ctxLZ.save(); ctxLZ.setLineDash([4, 3]);
      ctxLZ.beginPath();
      ctxLZ.moveTo(toX(zTk), toY(yTk));
      ctxLZ.lineTo(toX(zCl), toY(yCl));
      ctxLZ.strokeStyle = COL.electron; ctxLZ.lineWidth = 1.8; ctxLZ.stroke();
      ctxLZ.restore();
    }
  }

  // ── Axis labels ────────────────────────────────────────────────────────
  ctxLZ.font='10px sans-serif'; ctxLZ.fillStyle='rgba(150,150,170,0.35)';
  ctxLZ.fillText('z →', csz-24, cy-5);
  ctxLZ.fillText('↑ y', cx+5, 14);
  ctxLZ.beginPath(); ctxLZ.arc(cx,cy,2.5,0,2*Math.PI);
  ctxLZ.fillStyle='#fff'; ctxLZ.fill();

  // Axis cross-hairs
  ctxLZ.strokeStyle='rgba(255,255,255,0.07)'; ctxLZ.lineWidth=0.5;
  ctxLZ.beginPath(); ctxLZ.moveTo(0,cy); ctxLZ.lineTo(csz,cy); ctxLZ.stroke();
  ctxLZ.beginPath(); ctxLZ.moveTo(cx,0); ctxLZ.lineTo(cx,csz); ctxLZ.stroke();

  // Zoom hint
  if (zoom.lz !== 1) {
    ctxLZ.font='10px sans-serif'; ctxLZ.fillStyle='rgba(200,200,200,0.5)';
    ctxLZ.fillText(`×${zoom.lz.toFixed(1)}`, 6, 16);
    ctxLZ.fillText('dbl-click: reset', 6, 30);
  }

  ctxLZ.restore();
}

// ════════════════════════════════════════════════
//  RENDER
// ════════════════════════════════════════════════
function render() {
  if (!data) return;
  setupCanvas();
  drawTransverse(data);
  drawLongitudinal(data);
}

// ════════════════════════════════════════════════
//  UI — DISCOVERY PANEL (tracks + anonymous clusters)
// ════════════════════════════════════════════════
function updateDiscoveryPanel(ev) {
  if (!ev) return;

  function makeHit(type, key, label, pt, eta, phi, energy, charge) {
    return { key, type, label, pt, eta, phi, energy, charge, x:0, y:0, r:0 };
  }

  function fillBody(tbodyId, items, rowFn) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!items.length) {
      const tr = tbody.insertRow();
      const td = tr.insertCell();
      td.colSpan = 4; td.className = 'obj-none'; td.textContent = 'none';
      return;
    }
    items.forEach(item => rowFn(tbody, item));
  }

  // ── Tracks — all passing cuts, badge if muon-chamber match ────────────
  const trkItems = (ev.tracks || [])
    .map((tk, i) => ({ ...tk, _i: i }))
    .filter(passTrackCuts)
    .sort((a, b) => Math.abs(b._displayPt ?? b.pt) - Math.abs(a._displayPt ?? a.pt))
    .slice(0, 20);

  fillBody('disc-track-tbody', trkItems, (tbody, tk) => {
    const key      = `track_${tk._i}`;
    const tkCharge = tk.pt >= 0 ? 1 : -1;
    const dpt      = tk._displayPt ?? tk.pt;
    const hit      = makeHit('track', key, 'trk', dpt, tk.eta, tk.phi0, 0, tkCharge);
    const sel      = isSelected(key);
    const row      = tbody.insertRow();
    row.className  = 'obj-row' + (sel ? ' obj-sel' : '');
    row.innerHTML  =
      `<td class="obj-type" style="color:${tkCharge>0?'#5cf':'#f77'}">${tkCharge>0?'+':'−'}</td>` +
      `<td>${Math.abs(dpt).toFixed(1)}</td>` +
      `<td>${tk.phi0.toFixed(2)}</td>` +
      `<td>${(2*Math.atan(Math.exp(-tk.eta))).toFixed(2)}</td>`;
    row.onclick = () => toggleSelect(hit);
  });

  // ── Clusters — PhotonCollection only (electrons shown via their ID tracks)
  const _allEm = mergedEmClusters(ev);
  const clItems = _allEm
  .filter(cl => cl.pt >= OBJ_PT_MIN && Math.abs(cl.eta) <= 4)
  .map(cl => ({
    ...cl,
    _type: resolveClustrType(cl._phi, cl.eta, ev.tracks, cl.pt) === 'electron' ? 'ecluster' : 'cluster',
  }))
  .sort((a, b) => b.pt - a.pt);

  fillBody('disc-clust-tbody', clItems, (tbody, cl) => {
    const key = cl._key;
    const hit = makeHit(cl._type, key, 'clu', cl.pt, cl.eta, cl._phi, cl.energy, 0);
    const sel = isSelected(key);
    const row = tbody.insertRow();
    row.className = 'obj-row' + (sel ? ' obj-sel' : '');
    const color = cl._type === 'ecluster' ? '#00e676' : '#ffd600';
    row.innerHTML =
      `<td class="obj-type" style="color:${color}">◆</td>` +
      `<td>${cl.pt.toFixed(1)}</td>` +
      `<td>${cl._phi.toFixed(2)}</td>` +
      `<td>${(2*Math.atan(Math.exp(-cl.eta))).toFixed(2)}</td>`;
    row.onclick = () => toggleSelect(hit);
  });
}

// ════════════════════════════════════════════════
//  UI — header + detector info cards + track table
// ════════════════════════════════════════════════
function updateUI(ev) {
  const { meta, tracks, muonTracks, met } = ev;
  document.getElementById('event-meta').innerHTML =
    `Run&nbsp;${meta.run}&nbsp;·&nbsp;Evt&nbsp;${meta.evNum}&nbsp;&nbsp;${meta.date}`;

  const cards = document.getElementById('pcards');
  cards.innerHTML = '';

  function infoCard(cls, label, lines) {
    const d = document.createElement('div');
    d.className = `pcard ${cls}`;
    d.innerHTML = `<div class="pcard-name">${label}</div>`
      + lines.map(l => `<div class="pcard-val">${l}</div>`).join('');
    cards.appendChild(d);
  }

  const nTracks = (tracks||[]).filter(passTrackCuts).length;
  const nMuTrks = (muonTracks||[]).filter(m => Math.abs(m.pt) >= OBJ_PT_MIN).length;
  const totEM   = (ev.lar.energy||[]).reduce((s,e) => s+(e>0.5?e:0), 0);
  const totHAD  = (ev.tile.energy||[]).reduce((s,e) => s+(e>0.3?e:0), 0);

  infoCard('e',  t('card.innerDet'), [`${t('card.tracks')}: <b>${nTracks}</b>`]);
  if (totEM  > 0) infoCard('g',  'EM Cal.',  [`ΣE: <b>${totEM.toFixed(0)} GeV</b>`]);
  if (totHAD > 0) infoCard('mu', 'HAD Cal.', [`ΣE: <b>${totHAD.toFixed(0)} GeV</b>`]);
  if (nMuTrks > 0) infoCard('mu', t('card.muonSys'), [`${t('card.segs')}: <b>${nMuTrks}</b>`]);
  if (met.et > 10) infoCard('m', 'MET',      [`ET: <b>${met.et.toFixed(0)} GeV</b>`]);

  document.getElementById('evt-counter').textContent = `Event ${idx+1} / ${N_EVENTS}`;
  document.getElementById('btn-prev').disabled = idx === 0;
  document.getElementById('btn-next').disabled = idx === N_EVENTS-1;

  updateTrackTable(ev);
  updateDiscoveryPanel(ev);
}

function updateTrackTable(ev) {
  const tbody = document.getElementById('track-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const tks = (ev.tracks||[])
    .filter(passTrackCuts)
    .sort((a,b) => Math.abs(b._displayPt ?? b.pt) - Math.abs(a._displayPt ?? a.pt))
    .slice(0, 15);
  for (const [i,tk] of tks.entries()) {
    const dpt   = tk._displayPt ?? tk.pt;
    const p     = Math.abs(dpt) * Math.cosh(tk.eta);
    const theta = Math.PI/2 - Math.atan(Math.abs(Math.sinh(tk.eta)));
    const row   = tbody.insertRow();
    row.innerHTML =
      `<td>Track_${i+1}</td>` +
      `<td style="color:${tk.pt>=0?'#5cf':'#f77'}">${tk.pt>=0?'+':'−'}</td>` +
      `<td>${p.toFixed(2)}</td>` +
      `<td>${Math.abs(dpt).toFixed(2)}</td>` +
      `<td>${tk.phi0.toFixed(2)}</td>` +
      `<td>${theta.toFixed(2)}</td>`;
  }
}

// ════════════════════════════════════════════════
//  NAVIGATION
// ════════════════════════════════════════════════
let isNavigating = false;  // prevents concurrent go() calls racing on idx

async function go(delta) {
  if (isNavigating) return;          // drop the call if already mid-navigation
  if (!eventsBase) return;           // group not yet chosen (overlay is open)
  const nxt = idx + delta;
  if (nxt < 0 || nxt >= N_EVENTS) return;
  // Check application state directly (not DOM) — DOM can lag or be stale
  const canRecord = selected.length >= 2
                 && chargesValid(selected).valid
                 && isCompleteChannel(selected);
  if (canRecord) {
    if (!confirm(t('confirm.unrecorded'))) return;
  }
  isNavigating = true;
  try {
    idx = nxt;
    saveState();
    selected = []; updateSelectionPanel();
    const ld = document.getElementById('loading');
    ld.style.display = 'block';
    try { data = await loadEvent(idx); render(); updateUI(data); }
    catch(e) { console.error(e); }
    ld.style.display = 'none';
    if (idx+1 < N_EVENTS) loadEvent(idx+1).catch(()=>{});
    if (idx-1 >= 0)       loadEvent(idx-1).catch(()=>{});
  } finally {
    isNavigating = false;
  }
}

// ════════════════════════════════════════════════
//  NAVIGATION BUTTONS
// ════════════════════════════════════════════════
(function setupNavButtons() {
  [['btn-prev', -1], ['btn-next', +1]].forEach(([id, delta]) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    // Touch: fire on touchend (tap) — preventDefault stops the ghost click
    btn.addEventListener('touchstart', e => { e.preventDefault(); }, { passive: false });
    btn.addEventListener('touchend', e => {
      e.preventDefault();
      if (!btn.disabled) go(delta);
    }, { passive: false });

    // Desktop/pen: normal click
    btn.addEventListener('click', e => {
      if (e.pointerType === 'touch') return; // already handled above
      go(delta);
    });
  });
})();

// ════════════════════════════════════════════════
//  INPUT: KEYBOARD, POINTER, ZOOM
// ════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  // Don't steal arrow keys from inputs/selects, and don't fire when overlay is open
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
  if (!eventsBase) return;
  if (e.key==='ArrowRight'||e.key==='ArrowDown') go(+1);
  if (e.key==='ArrowLeft' ||e.key==='ArrowUp')   go(-1);
});

function stepZoom(key, factor) {
  // factor=0 resets; otherwise multiplies current zoom
  zoom[key] = factor === 0 ? 1.0 : Math.max(0.4, Math.min(16, zoom[key] * factor));
  if (factor === 0) { pan[key].x = 0; pan[key].y = 0; }
  render();
}

function attachPointerHandlers(canvas, zoomKey) {
  let pStart = null, lastDrag = null, isDragging = false;
  let isPinching = false, pinchDist = 0, pinchMid = null;

  // Convert raw canvas coords → world coords
  function toWorld(rawX, rawY) {
    const cx = csz / 2, z = zoom[zoomKey], p = pan[zoomKey];
    return { x: (rawX - p.x - cx) / z + cx, y: (rawY - p.y - cx) / z + cx };
  }

  // Zoom toward a specific raw-canvas point (mx, my) by factor f
  function zoomAt(mx, my, f) {
    const cx = csz / 2;
    const newZ = Math.max(0.4, Math.min(16, zoom[zoomKey] * f));
    const realF = newZ / zoom[zoomKey];
    pan[zoomKey].x = (mx - cx) * (1 - realF) + pan[zoomKey].x * realF;
    pan[zoomKey].y = (my - cx) * (1 - realF) + pan[zoomKey].y * realF;
    zoom[zoomKey] = newZ;
  }

  // ── Mouse wheel zoom (toward cursor) ──
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    const rect  = canvas.getBoundingClientRect();
    const scale = csz / rect.width;
    const mx = (e.clientX - rect.left) * scale;
    const my = (e.clientY - rect.top)  * scale;
    zoomAt(mx, my, e.deltaY < 0 ? 1.15 : 0.87);
    render();
  }, { passive: false });

  // Double-tap / double-click resets
  canvas.addEventListener('dblclick', () => {
    zoom[zoomKey] = 1.0; pan[zoomKey].x = 0; pan[zoomKey].y = 0; render();
  });

  // ── Touch: pinch-zoom + two-finger pan ──
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      e.preventDefault();
      isPinching = true;
      pStart = null; lastDrag = null; isDragging = false; // cancel any single-finger drag
      const t0 = e.touches[0], t1 = e.touches[1];
      pinchDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      pinchMid  = { x: (t0.clientX + t1.clientX) / 2,
                    y: (t0.clientY + t1.clientY) / 2 };
    }
  }, { passive: false });

  canvas.addEventListener('touchmove', e => {
    if (e.touches.length === 2 && isPinching) {
      e.preventDefault();
      const t0 = e.touches[0], t1 = e.touches[1];
      const rect  = canvas.getBoundingClientRect();
      const scale = csz / rect.width;

      const newDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      const newMid  = { x: (t0.clientX + t1.clientX) / 2,
                        y: (t0.clientY + t1.clientY) / 2 };

      // Zoom toward the pinch midpoint
      const mx = (newMid.x - rect.left) * scale;
      const my = (newMid.y - rect.top)  * scale;
      if (pinchDist > 0) zoomAt(mx, my, newDist / pinchDist);

      // Two-finger pan (track midpoint translation)
      pan[zoomKey].x += (newMid.x - pinchMid.x) * scale;
      pan[zoomKey].y += (newMid.y - pinchMid.y) * scale;

      pinchDist = newDist;
      pinchMid  = newMid;
      render();
    }
  }, { passive: false });

  canvas.addEventListener('touchend', e => {
    if (e.touches.length < 2) {
      isPinching = false; pinchDist = 0; pinchMid = null;
    }
  }, { passive: true });

  // ── Pointer events: single-finger drag + tap/swipe ──
  canvas.addEventListener('pointercancel', () => {
    pStart = null; lastDrag = null; isDragging = false;
    canvas.style.cursor = zoom[zoomKey] > 1.05 ? 'grab' : 'default';
  }, { passive: true });

  canvas.addEventListener('pointerdown', e => {
    if (!e.isPrimary || isPinching) return;
    pStart   = { x: e.clientX, y: e.clientY };
    lastDrag = { x: e.clientX, y: e.clientY };
    isDragging = false;
  }, { passive: true });

  canvas.addEventListener('pointermove', e => {
    if (isPinching) return; // pinch is handled by touchmove
    if (pStart) {
      const dx = e.clientX - pStart.x, dy = e.clientY - pStart.y;
      if (!isDragging && Math.sqrt(dx*dx + dy*dy) > 5) isDragging = true;
      if (isDragging) {
        const scale = csz / canvas.getBoundingClientRect().width;
        pan[zoomKey].x += (e.clientX - lastDrag.x) * scale;
        pan[zoomKey].y += (e.clientY - lastDrag.y) * scale;
        lastDrag = { x: e.clientX, y: e.clientY };
        canvas.style.cursor = 'grabbing';
        render();
      }
      return;
    }
    // Hover — update cursor
    const areas = (zoomKey === 'rp') ? hitAreas : hitAreasLZ;
    const rect  = canvas.getBoundingClientRect();
    const rawX  = (e.clientX - rect.left) * (csz / rect.width);
    const rawY  = (e.clientY - rect.top)  * (csz / rect.height);
    const { x: mx, y: my } = toWorld(rawX, rawY);
    canvas.style.cursor = areas.some(a => (mx-a.x)**2+(my-a.y)**2 <= a.r**2)
      ? 'pointer' : zoom[zoomKey] > 1.05 ? 'grab' : 'default';
  }, { passive: true });

  canvas.addEventListener('pointerup', e => {
    if (!pStart || isPinching) return;
    const dx = e.clientX - pStart.x, dy = e.clientY - pStart.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const wasDragging = isDragging;
    pStart = null; lastDrag = null; isDragging = false;
    canvas.style.cursor = zoom[zoomKey] > 1.05 ? 'grab' : 'default';

    if (!wasDragging && dist < 12) {
      // Tap / click — hit test
      const areas = (zoomKey === 'rp') ? hitAreas : hitAreasLZ;
      const rect  = canvas.getBoundingClientRect();
      const rawX  = (e.clientX - rect.left) * (csz / rect.width);
      const rawY  = (e.clientY - rect.top)  * (csz / rect.height);
      const { x: mx, y: my } = toWorld(rawX, rawY);
      let best = null, bestD2 = Infinity;
      for (const a of areas) {
        const d2 = (mx-a.x)**2 + (my-a.y)**2;
        if (d2 <= a.r**2 && d2 < bestD2) { best=a; bestD2=d2; }
      }
      if (best) toggleSelect(best);
    } else if (!wasDragging && e.pointerType === 'touch' && Math.abs(dx) > 45 && zoom[zoomKey] < 1.2) {
      // Swipe to navigate — only at near-default zoom
      go(dx < 0 ? +1 : -1);
    }
  }, { passive: true });
}

attachPointerHandlers(canvasRP, 'rp');
attachPointerHandlers(canvasLZ, 'lz');

// ════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════
// ── Group selector helpers ──────────────────────
function prettifyUni(s) {
  // "unige_2026" → "UniGe 2026"
  return s.replace(/_/g, ' ').replace(/\b\w+/g, w => w.charAt(0).toUpperCase() + w.slice(1));
}
function prettifyGroup(s) {
  // "group9A" → "Group 9A", "group10T" → "Group 10T"
  return s.replace(/^group(\d+)([A-Za-z]+)$/, 'Group $1$2');
}
function sortGroups(groups) {
  return [...groups].sort((a, b) => {
    const ma = a.match(/^group(\d+)([A-Za-z]+)$/);
    const mb = b.match(/^group(\d+)([A-Za-z]+)$/);
    if (ma && mb) {
      const nd = parseInt(ma[1]) - parseInt(mb[1]);
      return nd !== 0 ? nd : ma[2].localeCompare(mb[2]);
    }
    return a.localeCompare(b);
  });
}

function setupGroupSelector(manifest) {
  const uniSel  = document.getElementById('sel-uni');
  const grpSel  = document.getElementById('sel-grp');
  const btnStart = document.getElementById('btn-start');

  Object.keys(manifest).forEach(uni => {
    const opt = document.createElement('option');
    opt.value = uni; opt.textContent = prettifyUni(uni);
    uniSel.appendChild(opt);
  });

  function populateGroups() {
    grpSel.innerHTML = '';
    const groups = sortGroups(manifest[uniSel.value] || []);
    groups.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g; opt.textContent = prettifyGroup(g);
      grpSel.appendChild(opt);
    });
    btnStart.disabled = groups.length === 0;
  }
  populateGroups();
  uniSel.addEventListener('change', populateGroups);

  btnStart.addEventListener('click', () => {
    eventsBase = `events/${uniSel.value}/${grpSel.value}`;
    clearSavedState();
    applyDefaultLang(uniSel.value);   // set FR for unige if no explicit pref
    cache = {}; idx = 0; data = null;
    document.getElementById('group-overlay').style.display = 'none';
    applyLocale();
    startSession();
  });
}

function changeGroup() {
  console.warn('[DEBUG] changeGroup() called — stack trace:');
  console.trace();
  clearSavedState();
  cache = {}; idx = 0; data = null; eventsBase = null;
  document.getElementById('group-overlay').style.display = 'flex';
}

async function startSession() {
  const ld = document.getElementById('loading');
  ld.style.display = 'block';
  updateSelectionPanel();
  updateMeasurementBar();
  saveState();
  try { data = await loadEvent(idx); render(); updateUI(data); }
  catch(e) {
    document.getElementById('event-meta').textContent = t('err.loadEvents');
    console.error(e);
  }
  ld.style.display = 'none';
  for (let i = 1; i <= 4 && i < N_EVENTS; i++)
    setTimeout(() => loadEvent(i).catch(()=>{}), i*600);
}

// ════════════════════════════════════════════════
//  SESSION PERSISTENCE  (localStorage)
// ════════════════════════════════════════════════
const STORAGE_KEY = 'hypatia_session';

function saveState() {
  if (!eventsBase) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ eventsBase, idx, measurements }));
  } catch(e) { /* storage full or private-mode — silent fail */ }
}

function clearSavedState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
}

function resetSession() {
  if (!confirm(t('confirm.reset'))) return;
  clearSavedState();
  location.reload();
}

function getSavedState() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; }
  catch(e) { return null; }
}

async function init() {
  setupCanvas();
  const jetsBtn = document.getElementById('btn-jets-tgl');
  if (jetsBtn) jetsBtn.style.display = ENABLE_JETS ? '' : 'none';
  try {
    const r = await fetch('events/manifest.json');
    if (!r.ok) throw new Error('No manifest');
    const manifest = await r.json();
    setupGroupSelector(manifest);

    // Restore a previous session if one was saved
    const saved = getSavedState();
    if (saved && saved.eventsBase) {
      const parts = saved.eventsBase.split('/');   // "events/uni/group"
      const uni = parts[1], grp = parts[2];
      if (uni && grp && manifest[uni] && manifest[uni].includes(grp)) {
        // Pre-select dropdowns
        const uniSel = document.getElementById('sel-uni');
        const grpSel = document.getElementById('sel-grp');
        if (uniSel) { uniSel.value = uni; uniSel.dispatchEvent(new Event('change')); }
        if (grpSel) grpSel.value = grp;
        // Restore state
        eventsBase   = saved.eventsBase;
        idx          = saved.idx || 0;
        measurements = Array.isArray(saved.measurements) ? saved.measurements : [];
        applyDefaultLang(uni);   // set FR for unige if no explicit pref
        document.getElementById('group-overlay').style.display = 'none';
        applyLocale();
        startSession();
        return;
      }
    }
  } catch(e) {
    console.warn('Could not load manifest, falling back to default path', e);
    eventsBase = 'events';
    document.getElementById('group-overlay').style.display = 'none';
    startSession();
  }
}

// ════════════════════════════════════════════════
//  RIGHT PANEL TABS
// ════════════════════════════════════════════════
// setRTab removed — Discovery and Cuts are now a single combined panel

// ════════════════════════════════════════════════
//  LIGHT MODE
// ════════════════════════════════════════════════
function toggleLight() {
  document.body.classList.toggle('light');
  const btn = document.getElementById('btn-light');
  if (btn) btn.textContent = document.body.classList.contains('light') ? t('btn.dark') : t('btn.light');
}

// ════════════════════════════════════════════════
//  TRACK CUTS UI
// ════════════════════════════════════════════════
function updateCut(key, rangeEl, numberId) {
  trackCuts[key] = +rangeEl.value;
  const n = document.getElementById(numberId);
  if (n) n.value = rangeEl.value;
  if (data) { render(); updateTrackTable(data); updateDiscoveryPanel(data); }
}

function updateCutN(key, numberEl, rangeId) {
  const v = +numberEl.value;
  trackCuts[key] = v;
  const r = document.getElementById(rangeId);
  if (r) r.value = Math.min(+r.max, Math.max(+r.min, v));
  if (data) { render(); updateTrackTable(data); updateDiscoveryPanel(data); }
}

function toggleCut(key, cb) {
  trackCuts[key] = cb.checked;
  if (data) { render(); updateTrackTable(data); updateDiscoveryPanel(data); }
}

function resetCuts() {
  const def = {
    minPt:  2.0,
    maxD0:  0.25,
    maxZ0:  20.0,
    minPixHits:  2, usePixHits: true,
    minSCTHits:  7, useSCTHits: true,
    minTRTHits: 15, useTRTHits: true,
  };
  Object.assign(trackCuts, def);
  // Sync range+number inputs
  const setN = (nid, v) => { const n = document.getElementById(nid); if (n) n.value = v; };
  const setR = (rid, v) => { const r = document.getElementById(rid); if (r) r.value = v; };
  const setCb = (id, v) => { const c = document.getElementById(id); if (c) c.checked = v; };
  setR('cut-minpt-r', def.minPt);   setN('cut-minpt-n', def.minPt);
  setR('cut-d0-r',    def.maxD0);   setN('cut-d0-n',    def.maxD0);
  setR('cut-z0-r',    def.maxZ0);   setN('cut-z0-n',    def.maxZ0);
  setN('cut-pix-n',   def.minPixHits);
  setN('cut-sct-n',   def.minSCTHits);
  setN('cut-trt-n',   def.minTRTHits);
  setCb('cut-pix-cb', def.usePixHits);
  setCb('cut-sct-cb', def.useSCTHits);
  setCb('cut-trt-cb', def.useTRTHits);
  if (data) { render(); updateTrackTable(data); updateDiscoveryPanel(data); }
}

window.addEventListener('resize', render);
applyLocale();   // stamp initial language before first render
init();
