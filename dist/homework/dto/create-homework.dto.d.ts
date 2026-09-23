export declare class CreateHomeworkDto {
    title: string;
    task: string;
    fileUrls?: string[];
    maxScore?: number;
    maxCoins?: number;
    deadline?: string;
    lessonId: number;
}
export declare class SubmitHomeworkDto {
    textAnswer?: string;
    fileUrls?: string[];
}
export declare class CheckSubmissionDto {
    score: number;
    coinsEarned?: number;
    feedback?: string;
}
