export class Vital{
    bodyTemperature!: number;
    bodyPressure!: number; 
    heartRate!: number; // 72 - 80 beats
    glucose!: number; // less than 140 mg/dL
    respiration!: number; // 20 to 30 breathes per minute
    oxygenSaturation!: number; // between 96% & 98%
    userKey!: string; // concept of indexing
    time!: Date;

    // Pre-Diabetes = between 140 & 199mg/dL
    // Diabetes = after two hours above 200mg/dL

    // Asthma = oxy saturation between 92 to 95, pulse between 100 to 125, respirator rate btwn 20 to 30 breathes per minute.
    // CHD ??
}