// js/data.js

// TABLA DE NÚCLEOS MAGNÉTICOS
const NUCLEOS = [
    { size: "1.6x1.9", w_max: 9, vv: 14.000, area_cm2: 3.04 },
    { size: "2.8x1.5", w_max: 17, vv: 10.000, area_cm2: 4.20 },
    { size: "2.5x1.8", w_max: 20, vv: 9.300, area_cm2: 4.50 },
    { size: "2.2x2.8", w_max: 37, vv: 7.000, area_cm2: 6.16 },
    { size: "2.5x2.8", w_max: 49, vv: 6.000, area_cm2: 7.00 },
    { size: "2.8x2.5", w_max: 49, vv: 6.000, area_cm2: 7.00 },
    { size: "2.8x3.5", w_max: 96, vv: 4.300, area_cm2: 9.80 },
    { size: "3.2x3.5", w_max: 125, vv: 3.750, area_cm2: 11.20 },
    { size: "3.2x4", w_max: 163, vv: 3.300, area_cm2: 12.80 },
    { size: "2.8x5", w_max: 196, vv: 3.000, area_cm2: 14.00 },
    { size: "3.8x4", w_max: 231, vv: 2.760, area_cm2: 15.20 },
    { size: "3.2x5", w_max: 256, vv: 2.625, area_cm2: 16.00 },
    { size: "3.8x5", w_max: 361, vv: 2.210, area_cm2: 19.00 },
    { size: "3.2x6", w_max: 368, vv: 2.187, area_cm2: 19.20 },
    { size: "3.8x6", w_max: 519, vv: 1.850, area_cm2: 22.80 }, // 👈 Este es el que usaste
    { size: "3.8x7", w_max: 707, vv: 1.580, area_cm2: 26.60 },
    { size: "3.8x8", w_max: 924, vv: 1.380, area_cm2: 30.40 },
    { size: "3.8x9", w_max: 1170, vv: 1.220, area_cm2: 34.20 },
    { size: "3.8x10", w_max: 1444, vv: 1.100, area_cm2: 38.00 },
    { size: "4.4x9", w_max: 1568, vv: 1.060, area_cm2: 39.60 },
    { size: "3.8x11", w_max: 1747, vv: 1.004, area_cm2: 41.80 },
    { size: "4.4x10", w_max: 1940, vv: 0.950, area_cm2: 44.00 },
    { size: "3.8x12", w_max: 2079, vv: 0.921, area_cm2: 45.60 },
    { size: "4.4x11", w_max: 2342, vv: 0.867, area_cm2: 48.40 },
    { size: "4.4x12", w_max: 2787, vv: 0.795, area_cm2: 52.80 }
];

// TABLA DE CALIBRES AWG (con amperaje máximo seguro)
const CALIBRES_AWG = [
    { awg: 7,  mils_circ: 20818, diam_mm: 3.67, amp: 44.20 },
    { awg: 8,  mils_circ: 16509, diam_mm: 3.26, amp: 33.30 },
    { awg: 9,  mils_circ: 13090, diam_mm: 2.91, amp: 26.50 },
    { awg: 10, mils_circ: 10383, diam_mm: 2.59, amp: 21.20 },
    { awg: 11, mils_circ: 8234,  diam_mm: 2.30, amp: 16.60 },
    { awg: 12, mils_circ: 6530,  diam_mm: 2.05, amp: 13.50 },
    { awg: 13, mils_circ: 5178,  diam_mm: 1.83, amp: 10.50 },
    { awg: 14, mils_circ: 4107,  diam_mm: 1.63, amp: 8.30 },
    { awg: 15, mils_circ: 3257,  diam_mm: 1.45, amp: 6.60 },
    { awg: 16, mils_circ: 2583,  diam_mm: 1.29, amp: 5.20 },
    { awg: 17, mils_circ: 2048,  diam_mm: 1.15, amp: 4.10 },
    { awg: 18, mils_circ: 1624,  diam_mm: 1.02, amp: 3.20 },
    { awg: 19, mils_circ: 1288,  diam_mm: 0.91, amp: 2.60 },
    { awg: 20, mils_circ: 1022,  diam_mm: 0.81, amp: 2.00 },
    { awg: 21, mils_circ: 810.100, diam_mm: 0.72, amp: 1.60 },
    { awg: 22, mils_circ: 642.400, diam_mm: 0.65, amp: 1.20 },
    { awg: 23, mils_circ: 509,    diam_mm: 0.57, amp: 1.00 },
    { awg: 24, mils_circ: 404,    diam_mm: 0.51, amp: 0.80 },
    { awg: 25, mils_circ: 320,    diam_mm: 0.45, amp: 0.60 },
    { awg: 26, mils_circ: 254,    diam_mm: 0.40, amp: 0.50 },
    { awg: 27, mils_circ: 202,    diam_mm: 0.36, amp: 0.40 },
    { awg: 28, mils_circ: 160,    diam_mm: 0.32, amp: 0.30 },
    { awg: 29, mils_circ: 126,    diam_mm: 0.28, amp: 0.29 },
    { awg: 30, mils_circ: 100,    diam_mm: 0.25, amp: 0.22 }
];

// Función auxiliar: buscar núcleo por tamaño (ej: "3.8x6")
function findNucleoBySize(size) {
    return NUCLEOS.find(n => n.size === size) || null;
}

// Función auxiliar: encontrar calibre adecuado para una corriente dada
function findCalibreForAmp(amp) {
    // Busca el calibre más pequeño (mayor número AWG) que soporte esa corriente
    for (let i = CALIBRES_AWG.length - 1; i >= 0; i--) {
        if (CALIBRES_AWG[i].amp >= amp) {
            return CALIBRES_AWG[i];
        }
    }
    return CALIBRES_AWG[0]; // Si no hay suficiente, devuelve el más grueso (AWG 7)
}