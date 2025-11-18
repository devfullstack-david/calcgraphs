export type CalculatePathProps = {
    start: string;
    final: string;
    algorithm: string;
};

export type Result = {
    fromNode: string;
    toNode: string;
    weight: number;
    logInformation: string;
};