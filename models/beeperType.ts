export enum BeeperStatus {
    Manufactured = 'manufactured',
    Assembled = 'assembled',
    Shipped = 'shipped',
    Deployed = 'deployed',
    Detonated = 'detonated',
}
  
export interface Beeper {
id: number;
name: string;
status: BeeperStatus;
created_at: Date;
exploded_at?: Date;
latitude?: number;
longitude?: number;
}  