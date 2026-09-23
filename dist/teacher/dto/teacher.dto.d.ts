export declare class CreateLessonTeacherDto {
    topic: string;
    videoUrl?: string;
    content?: string;
    attachedFiles?: string[];
    homeworkTask?: string;
    lessonOrder?: number;
    lessonDate?: string;
    startTime?: string;
    endTime?: string;
}
export declare class GradeSubmissionDto {
    score: number;
    feedback?: string;
    coinsEarned?: number;
    status?: 'CHECKED' | 'ACCEPTED' | 'REJECTED';
}
export declare class CreateTeacherHomeworkDto {
    title: string;
    task: string;
    lessonId?: number;
    maxScore?: number;
    maxCoins?: number;
    deadline?: string;
    fileUrls?: string[];
}
