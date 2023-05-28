export interface UserDetails {
    id: string,
    username: string,
    calorieGoal: number,
    currentWeight: number,
    startWeight: number,
    goalWeight: number,
    height: number,
    proteinGoal: number,
    carbohydrateGoal: number,
    lipidGoal: number,
    activityLevel: ActivityLevel,
    weightGoal: WeightGoal,
    dietType: DietType
}

export interface ActivityLevel {
    key?: string;
    text?: string;
}


export interface Gender {
    key?: string;
    text?: string;
}

export interface DietType {
    key?: string;
    text?: string;
}


export interface WeightGoal {
    key?: string;
    text?: string;
}


export interface UserFitnessRequest {
    age?: number,
    gender?: string,
    height?: number,
    weight?: number,
    activityLevel?: string,
    weightGoal?: string,
    dietType?: string,
}


export interface UserRegisterRequest {
    username?: string;
    password?: string;
    startWeight?: number;
    goalWeight?: number;
    userFitnessRequest?: UserFitnessRequest;
}